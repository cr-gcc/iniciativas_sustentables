<template>
  <div id="niciativas" class="mt-4">
    <div class="text-center">
      <h1 class="ptitle">Iniciativas Sustentables</h1>
    </div>
    <div class="text-right">
      <b-button class="mr-1 ml-1 btn-sm" variant="outline-dark" @click="openMW()">Mensaje de bienvenida</b-button>
      <b-button class="mr-1 ml-1 btn-sm" variant="outline-dark">Inscripción</b-button>
    </div>
    <div class="mt-0">
      <div id="chartdiv"></div> 
    </div>
    <!--MODAL-->
    <b-modal hide-footer :hide-header-close="true"  v-model="dialog" :no-close-on-backdrop="true" :no-close-on-esc="true" title="Iniciativas sustentables">
      <div class="row">
        <div class="col-sm-12 text-left">
          <p>Este portal interactivo nos permite comunicar las iniciativas que llevan a cabo las diferentes entidades y dependencias de nuestra comunidad, ordenadas por los ejes estratégicos y programas del Plan Integral para la Sustentabilidad desde la UNAM (PISU).
          </p>
          <p>Si tienes alguna iniciativa por favor selecciona el botón Inscripción.  Para mayor información sobre el PISU visita:
          </p>
        </div>
        <div class="col-sm-12 text-right">
          <b-button class="btn-sm" variant="info" @click="dialog=!dialog">Aceptar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    am4core.useTheme(am4themes_animated);

  export default {
    name: 'Home',
    data(){
      return {
        name: "",
        dialog: false,
        hola: "hola",
      }
    },
    methods:{
      openMW(){
        this.dialog = true;
      }
    },
    mounted() {

      this.dialog = true;

      let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
      chart.zoomable = true;

      let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.id = "id";
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.children = "children";
      networkSeries.dataFields.color = "color";
      networkSeries.dataFields.desc = "desc";
      networkSeries.dataFields.img = "img";
      networkSeries.dataFields.url_icon = "url_icon";
      networkSeries.dataFields.width = "width";
      networkSeries.dataFields.height = "height";
      networkSeries.nodes.template.label.text = "{name}"
      networkSeries.fontSize = 10;
      networkSeries.linkWithStrength = 0;
      networkSeries.maxLevels = 1;

      let nodeTemplate = networkSeries.nodes.template;
      nodeTemplate.tooltipText = "{name}";
      nodeTemplate.fillOpacity = 1;
      nodeTemplate.label.hideOversized = true;
      nodeTemplate.label.truncate = true;
      nodeTemplate.togglable = true;
      nodeTemplate.circle.disabled = true;

      let nodeTemplateIcon = networkSeries.nodes.template.createChild(am4core.Image);
      nodeTemplateIcon.propertyFields.href = "url_icon"
      nodeTemplateIcon.propertyFields.width = "width";
      nodeTemplateIcon.propertyFields.height = "height";
      nodeTemplateIcon.horizontalCenter = "middle";
      nodeTemplateIcon.verticalCenter = "middle";
      

      let linkTemplate = networkSeries.links.template;
      linkTemplate.strokeWidth = 1;
      linkTemplate.distance = 2;

      let linkHoverState = linkTemplate.states.create("hover");
      linkHoverState.properties.strokeOpacity = 1;
      linkHoverState.properties.strokeWidth = 2;

      nodeTemplate.events.on("over", function (event) {
        let dataItem = event.target.dataItem;
        dataItem.childLinks.each(function (link) {
          link.isHover = true;
        })
      })

      nodeTemplate.events.on("out", function (event) {
        let dataItem = event.target.dataItem;
        dataItem.childLinks.each(function (link) {
          link.isHover = false;
        })
      })
      /**/
      nodeTemplate.events.on("hit", function (event) {
        let dataItem = event.target.dataItem;
        chart.closeAllPopups();
          let puHTML = chart.openModal(
            '<div id="modalInit" class="row"><div class="col-sm-12 col-md-6"><div class="row"><div class="col-sm-12"><h4 class="ptitle">'+dataItem.name+'</h4><p class="text-left mt-3">'+dataItem.desc+'</p></div></div></div><div class="col-sm-12 col-md-6"><img width="100%" src="'+dataItem.img+'"></div></div>', 'Información'
          );
          puHTML.showCurtain = true;
          puHTML.defaultStyles = false;
      })
      /*
      networkSeries.dataSource.url = "../assets/json/info.json";
      networkSeries.dataSource.load();
      */
      /**/
      networkSeries.data = [
        { 
          "id": 0,
          "name":"Iniciativas institucionales",
          "value":500,
          "color": "#14383D",
          "desc":"La Universidad Nacional Autónoma de México ha desempeñado un papel protagónico en la historia y en la formación de nuestro país. Las tareas sustantivas de esta institución pública, autónoma y laica son la docencia, la investigación y la difusión de la cultura.",
          "img":"https://cous.sdi.unam.mx/media/tmp/unam.jpg",
          "url_icon": "https://unamglobal.unam.mx/wp-content/uploads/2017/05/LOGO-UNAM-269x300.png",
          "width":"90",
          "height":"90",
          "children":[
            { "id":"P1", 
              "name":"Educación para la sustentabilidad",
              "value": 200,
              "color": "#4b767b",
              "desc":"Comprende las inciativas relacionadas con el forrtalecimiento del enfoque de sustentabilidad para la educación, ya sean materiales o cursos de educación continua, los programas ,las iniciativas para asisit en la capacidad docente para su enseñanza y las licenciaturas sobre investigación e innovación en sustentabilidad.",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon": "https://w1.pngwing.com/pngs/132/53/png-transparent-education-icon-icon-design-symbol-education-line-technology-area-angle.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED3",
                  "name":"Seminario Internacional Tópicos de Frontera en la Sustentabilidad",
                  "value":100,
                  "desc":"Tiene como objetivo difundir entre la comunidad universitaria los temas de vanguardia en sustentabilidad, colaborando con expertos de reconocido prestigio internacional.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                }
              ]
            },
            { "id":"P2", 
              "name":"Investigación e innovación para la sustentabilidad",
              "value": 200,
              "color": "#348C98",
              "desc":"Son iniciativas que asisten a la generación de conocimiento científico y el análisis crítico necesario para comprender los retos y las prácticas del desarrollo sustentable, definir estrategias para monitorear y evaluar los progresos, y emitir recomendaciones de política pública basadas en el conocimiento científico.",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://image.shutterstock.com/image-vector/microscope-research-icon-260nw-764617948.jpg",
              "width":"50",
              "height":"50",
              "children":[  
                { 
                  "id":"ED3",
                  "name":"Escuela Nacional de Estudios Superiores-Unidad Morelia",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED5",
                  "name":"Facultad de Ciencias",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED7",
                  "name":"Instituto de Ciencias del Mar y Limnología",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED11",
                  "name":"Instituto de Investigaciones en Ecosistemas y Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED15",
                  "name":"Unidad Multidisciplinaria de Docencia e Investigación",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED16",
                  "name":"Facultad de Estudios Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED19",
                  "name":"Facultad de Estudios Superiores Cuautitlán",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED21",
                  "name":"Centro Regional de Investigaciones Multidisciplinarias UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED22",
                  "name":"Programa Universitario de Manejo, Uso y Reuso del Agua en la UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED23",
                  "name":"Dirección General de Servicios Generales y Movilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED24",
                  "name":"Tu Tienda UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED26",
                  "name":"Instituto de Química",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED33",
                  "name":"Facultad de Artes y Diseño ",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED40",
                  "name":"Programa de Investigación en Cambio Climático",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED65",
                  "name":"AUN NO ESTA",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                }
              ]
            },
            { "id":"P3", 
              "name":"Ordenamiento, áreas verdes y reservas naturales",
              "value": 200,
              "color": "#529FA3",
              "desc":"Estas iniciativas contribuyen a optimizar el uso de los recursos y espacios de la Universidad promoviendo el adecuado manejo y la preservación de las áreas verdes y el espacio público de nuestros campi, teniendo en cuenta la importancia en términos ambientales, sociales y económicos, especialmente su contribución en la conservación de la biodiversidad, los suelos, la recarga de los acuíferos, la captura de carbono y la regulación climática. ",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://energiatoday.com/wp-content/uploads/2019/11/ETALFA_Areas-Verdes-300x300.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED3",
                  "name":"Escuela Nacional de Estudios Superiores-Unidad Morelia",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED5",
                  "name":"Facultad de Ciencias",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED6",
                  "name":"Instituto de Biología",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED7",
                  "name":"Instituto de Ciencias del Mar y Limnología",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED16",
                  "name":"Facultad de Estudios Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED17",
                  "name":"Escuela Nacional Preparatoria 2 Erasmo Castellanos Quinto Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED18",
                  "name":"Centro de Enseñanza para Extranjeros Campus Taxco",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED19",
                  "name":"Facultad de Estudios Superiores Cuautitlán",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED25", 
                  "name":"Dirección General de Obras y Conservación",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED33",
                  "name":"Facultad de Artes y Diseño ",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED65",
                  "name":"AUN NO ESTA",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P5", 
              "name":"Compromiso institucional para la sustentabilidad",
              "value": 200,
              "color": "#349C30",
              "desc":"Por definir",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://w7.pngwing.com/pngs/908/820/png-transparent-contract-computer-icons-documents-angle-text-business.png",
              "width":"50",
              "height":"50",
              "children":[  
                { 
                  "id":"ED1", 
                  "name":"Coordinación Universitaria para la Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED18",
                  "name":"Centro de Enseñanza para Extranjeros Campus Taxco",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED21", 
                  "name":"Centro Regional de Investigaciones Multidisciplinarias UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED28", 
                  "name":"Rectoría",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED35", 
                  "name":"Centro de Geociencias",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED16",
                  "name":"Facultad de Estudios Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED25", 
                  "name":"Dirección General de Obras y Conservación",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P6", 
              "name":"Manejo integral de residuos",
              "value": 200,
              "color": "#589A32",
              "desc":"Articulan acciones  para el manejo de residuos, desde su generación hasta la disposición final, estas iniciativas aportan a reducir la generación de residuos sólidos urbanos, implementar un sistema eficiente y eficaz de separación de residuos en las entidades y dependencias.",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://e7.pngegg.com/pngimages/690/1024/png-clipart-waste-management-municipal-solid-waste-residuo-domiciliario-decontamination-residuos-service-logo.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED16",
                  "name":"Facultad de Estudios Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED25", 
                  "name":"Dirección General de Obras y Conservación",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED26", 
                  "name":"Instituto de Química",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED27", 
                  "name":"Dirección General de Atención a la Comunidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED28", 
                  "name":"Rectoría",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                }
              ]
            },
            { "id":"P7", 
              "name":"Manejo integral del agua",
              "value": 200,
              "color": "#019477",
              "desc":"Aquellas que buscan maximizar la eficiencia del uso y calidad del agua en la universidad, así como el manejo integrado, en aras de incentivar estrategias de captación, retención e infiltración de agua .",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://image.flaticon.com/icons/png/512/234/234794.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED21",
                  "name":"Centro Regional de Investigaciones Multidisciplinarias UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED22",
                  "name":"Programa Universitario de Manejo, Uso y Reuso del Agua en la UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P8", 
              "name":"Movilidad sustentable",
              "value": 200,
              "color": "#63BB99",
              "desc":"Estas son iniciativas que buscan impulsar las medidas necesarias para que la movilidad sea lo más eficiente posible en términos de tiempo, inclusión, seguridad y accesibilidad y que ayuden a disminuir los impactos negativos y fomentar que la universidad transite a un modelo de movilidad sustentable",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://e7.pngegg.com/pngimages/741/4/png-clipart-pedestrian-crossing-computer-icons-others-miscellaneous-text.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED11",
                  "name":"Instituto de Investigaciones en Ecosistemas y Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED23",
                  "name":"Dirección General de Servicios Generales y Movilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P9", 
              "name":"Consumo sustentable",
              "value": 200,
              "color": "#40762D",
              "desc":"Estas iniciativas buscan que la comunidad universitaria reflexione sobre el origen y los modos de producción de lo que consume y promover una gestión eficiente de los recursos naturales compartidos a través de las prácticas institucionales de consumo sustentable.",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://image.flaticon.com/icons/png/512/3141/3141553.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED1", 
                  "name":"Coordinación Universitaria para la Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED24",
                  "name":"Tu Tienda UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED36",
                  "name":"Centro de Investigaciones en Geografía Ambiental",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P10", 
              "name":"Participacion para la sustentabilidad",
              "value": 200,
              "color": "#B9E2A2",
              "desc":"Iniciativas que integran la colaboración y la construcción de alianzas entre la comunidad universitaria y con actores gubernamentales, de la sociedad civil y del sector privado, a nivel nacional e internacional, para hacer de la sustentabilidad un marco de referencia en el diseño y desarrollo de políticas públicas y educativas. ",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://w7.pngwing.com/pngs/179/946/png-transparent-computer-icons-organization-participation-human-rights-miscellaneous-text-hand-thumbnail.png",
              "width":"50",
              "height":"50",
              "children":[  
                { 
                  "id":"ED1", 
                  "name":"Coordinación Universitaria para la Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED4", 
                  "name":"Facultad de Arquitectura",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED11", 
                  "name":"Instituto de Investigaciones en Ecosistemas y Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED16", 
                  "name":"Facultad de Estudios Superiores Iztacala",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED18", 
                  "name":"Centro de Enseñanza para Extranjeros Campus Taxco",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED19",
                  "name":"Facultad de Estudios Superiores Cuautitlán",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED21",
                  "name":"Centro Regional de Investigaciones Multidisciplinarias UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED31",
                  "name":"Dirección General del Deporte Universitario",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED33",
                  "name":"Facultad de Artes y Diseño",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED34",
                  "name":"Centro de Ciencias de la Atmósfera",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED38",
                  "name":"Escuela Nacional de Trabajo Social UNAM",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P11", 
              "name":"Difusión, divulgación y arte para la sustentabilidad",
              "value": 200,
              "color": "#65B751",
              "desc":"Las iniciativas de comunicación son actividades fundamentales para la construcción de transiciones hacia la sustentabilidad. Asisten en la sensibilización de la comunidad sobre las características y dimensiones del cambio global, promovuen la reflexión, la acción colectiva y la exigencia de derechos para conseguir las metas de la sustentabilidad. Aquí encontrarás todas las iniciativas que aportan a la difusión, divulgación y el arte para la sustentabilidad.",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://image.flaticon.com/icons/png/512/102/102632.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED5",
                  "name":"Facultad de Ciencias",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED6",
                  "name":"Instituto de Biología",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED7",
                  "name":"Instituto de Ciencias del Mar y Limnología",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED9",
                  "name":"Instituto de Energías Renovables",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED11",
                  "name":"Instituto de Investigaciones en Ecosistemas y Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED17",
                  "name":"Escuela Nacional Preparatoria 2 Erasmo Castellanos Quinto",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED18",
                  "name":"Centro de Enseñanza para Extranjeros Campus Taxco",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED19",
                  "name":"Facultad de Estudios Superiores Cuautitlán",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED30",
                  "name":"Museo Universitario de Ciencias y Arte",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            },
            { "id":"P12", 
              "name":"Alianzas Internacionales",
              "value": 200,
              "color": "#65B751",
              "desc":"Por definir",
              "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
              "url_icon":"https://image.flaticon.com/icons/png/512/1967/1967107.png",
              "width":"60",
              "height":"60",
              "children":[  
                { 
                  "id":"ED1",
                  "name":"Coordinación Universitaria para la Sustentabilidad",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED28",
                  "name":"Rectoría",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
                { 
                  "id":"ED35",
                  "name":"Centro de Geociencias",
                  "value":100,
                  "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg",
                  "url_icon":"https://e7.pngegg.com/pngimages/589/798/png-clipart-circle-spain-point-oval-font-dimensional-characters-26-english-letters-blue-electric-blue.png",
                  "width":"40",
                  "height":"40",
                },
              ]
            }
          ]
        },
        /*
        {
          "id": 1,
          "name":"Iniciativas estudiantiles",
          "value":500,
          "color": "#2E86C1",
          "desc":"DESCRIPCIÓN",
          "img":"https://cous.sdi.unam.mx/media/tmp/demo1.jpg"
        }
        */
      ]
    }
  }
</script>
<style>
  .modal-title {
    font-weight: bold;
  }
  #chartdiv{
    width: 100%;
    height: 720px;
  }
  #chartdiv div .ampopup-content{
    background-color: #eee;
    width: 90%;
    height: auto;
  }
  #chartdiv div .ampopup-content .ampopup-header{
    background-color: #69bfc9;
    color: #fff;
  }

  #chartdiv div .ampopup-content .ampopup-header .ampopup-close{
    color: #fff;
  }
</style>