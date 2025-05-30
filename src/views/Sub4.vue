<template>
  <div>          
    <svg id="gameboard"></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import $ from 'jquery'
export default {
  data() {
    return {
      gdp: [
        {country: "USA", value: 20.5 },
        {country: "China", value: 13.4 },
        {country: "Germany", value: 4.0 },
        {country: "Japan", value: 4.9 },
        {country: "France", value: 2.8 }
      ]
    };
  },
  mounted() {
    this.generateArc();
  },
  methods: {
    generateArc() {
      var gWidth = $('#gameboard').width(),   // Width of the svg palette
    gHeight = $('#gameboard').height(),   // Height of the svg palette
    radius = (Math.min(gWidth, gHeight) / 2) - 10,
    quote = ["John 3:16-17", "For[g1063] God[g2316] so[g3779] loved[g25] the world[g2889], that[g5620] he gave[g1325] his[g846] only begotten[g3439] Son[g5207], that[g2443] whosoever[g3956] believeth[g4100] in[g1519] him[g846] should[g622] not[g3361] perish[g622], but[g235] have[g2192] everlasting[g166] life[g2222]. For[g1063] God[g2316] sent[g649] not[g3756] his[g846] Son[g5207] into[g1519] the world[g2889] to[g2443] condemn[g2919] the world[g2889]; but[g235] that[g2443] the world[g2889] through[g1223] him[g846] might be saved[g4982]."],
    mode = $('.mode:checked').val(), // Linear or grouped, based on radio buttons
    svg = d3.select("svg").append("g").attr("transform", "translate(" + gWidth / 2 + "," + (gHeight / 2) + ")"),
    color_palettes = [['#4abdac', '#fc4a1a', '#f7b733'], ['#f03b20', '#feb24c', '#ffeda0'], ['#007849', '#0375b4', '#ffce00'], ['#373737', '#dcd0c0', '#c0b283'], ['#e37222', '#07889b', '#eeaa7b'], ['#062f4f', '#813772', '#b82601'], ['#565656', '#76323f', '#c09f80']];

  // D3 Global Variables
  var root = textToHierarchy(quote[0], quote[1]), 
    node = root, // Save root for tweening
    x = d3.scaleLinear().range([0, 2 * Math.PI]),
    y = d3.scaleSqrt().range([0, radius]),
    color = d3.scaleLinear().domain([0, 0.5, 1]).range(color_palettes[~~(Math.random() * 6)]), 
    partition = d3.partition();

  // Calculate the d path for each slice.
  var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

  // Build the sunburst.
  var first_build = true;
  function update() {
    // Determine how to size the slices.
    if (mode == "linear") { 
      root.sum(function (d) { return d.size; });
    } else {
      root.sum(function (d) { return d.grpSize; });
    }

    if (first_build) {
      // Add a <path d="[shape]" style="fill: [color];"><title>[popup text]</title></path>
      //   to each <g> element; add click handler; save slice widths for tweening
      svg.selectAll("path").data(partition(root).descendants()).enter().append("path")
        .style("fill", function (d) { return d.parent ? color(d.x0) : "white"; })  // Return white for root.
        .on("click", click);

      svg.selectAll("path").append("title").text(function (d) { return d.data.word; })

      first_build = false;
    } else {
      svg.selectAll("path").data(partition(root).descendants());
    }

    svg.selectAll("path").transition().duration(1000).attrTween("d", arcTweenData);
  }

  update(); // GO!

    
  // Respond to radio click.
  $('.mode').on("change", function change() {
    mode = $('.mode:checked').val();
    update();
  });
  

  // Respond to slice click.
  function click(d) {
    node = d;
    svg.selectAll("path").transition().duration(1000).attrTween("d", arcTweenZoom(d));
  }


  // When switching data: interpolate the arcs in data space.
  function arcTweenData(a, i) {
    // (a.x0s ? a.x0s : 0) -- grab the prev saved x0 or set to 0 (for 1st time through)
    // avoids the stash() and allows the sunburst to grow into being
    var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0) }, a);  
    function tween(t) {
      var b = oi(t);
      a.x0s = b.x0;  
      a.x1s = b.x1;  
      return arc(b);
    }
    if (i == 0) { 
      // If we are on the first arc, adjust the x domain to match the root node
      // at the current zoom level. (We only need to do this once.)
      var xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
      return function (t) {
        x.domain(xd(t));
        return tween(t);
      };
    } else {
      return tween;
    }
  }


  // When zooming: interpolate the scales.
  function arcTweenZoom(d) {
    var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
        yd = d3.interpolate(y.domain(), [d.y0, 1]), // [d.y0, 1]
        yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
    return function (d, i) {
      return i
          ? function (t) { return arc(d); }
          : function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }


  // Take text from Strong's and format as hierarchy with root.
  function textToHierarchy(rootNode, quote) {
    var vsWords = quote.replace(/[^A-Za-z0-9 /[]/g, "").replace(/[/[]/g, "|").split(" ");
    var sbWords = [{ "name": rootNode, "parent": "" }];

    for (i = 0; i < vsWords.length ; i++) {

      //sbWords.filter(function (value) { return value == vsWords[i]; }).length;
      word = vsWords[i].split("|");

      if (word.length == 1) {

        sbWords.push({ "name": i, "word": word[0], "parent": rootNode, "size": 1, "grpSize": 0 });
      } else {

        // If this combo of English:Greek word exists, then add a 
        filtered = sbWords.filter(function (value) { return value.word == word[1] && value.eWord == word[0]; });

        var newGrpSize = 1;
        if (filtered.length > 0) {
          filtered[0].grpSize += 1;
          newGrpSize = 0;
        }

        sbWords.push({ "name": word[1], "parent": i, "word": word[1], "size": 1, "grpSize": newGrpSize, "eWord": word[0] });
        sbWords.push({ "name": i, "word": word[0], "parent": rootNode, "size": 0, "grpSize": 0 });
      }
    }

    var root = d3.stratify().id(function (d) { return d.name; })
      .parentId(function (d) { return d.parent; })(sbWords);
    return root;
  }
    }
  }
}
  // ...
</script>