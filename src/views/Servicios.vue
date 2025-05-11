<template>
  <div id="mapa_mundial" class="mt-4">
    <div class="text-center">
      <h1 class="ptitle">Servicios</h1>
    </div>
    <b-collapse class="mt-3" v-model="visible">
      <b-row>
        <b-col sm="3">
          <b-form-select v-model="selected1" :options="options1" size="sm"></b-form-select>
        </b-col>
        <b-col sm="3">
          <b-form-select v-model="selected2" :options="options2" size="sm"></b-form-select>
        </b-col>
        <b-col sm="3">
          <b-form-select v-model="selected3" :options="options3" size="sm"></b-form-select>
        </b-col>
        <b-col sm="3">
          <b-form-select v-model="selected4" :options="options4" size="sm"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" class="text-right">
          <b-button variant="outline-info" size="sm" pill @click="searchLoc()">Buscar</b-button>
        </b-col>
      </b-row>
      <div v-if="pbSearch">
        <b-progress class="mt-2" variant="warning" :value="100"  :animated="true"></b-progress>
      </div>
    </b-collapse>
    <div class="menu pm">
      <b-button-group vertical>
        <b-button variant="outline-secondary" @click="allLocations()">
          Entidades/Instituciones
        </b-button>
        <b-button variant="outline-secondary" @click="mapReset()">
          Reset
        </b-button>
        <b-button variant="outline-secondary" @click="visible = !visible">
          Filtros
        </b-button>
      </b-button-group>
    </div>
    <div style="height: 500px; width: 100%">
      <l-map
        :zoom.sync="zoom" 
        :center.sync="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker
          v-for="(loc, ind) in locations"
          :key="'loc-'+loc.id" 
          :lat-lng="loc"
          :icon="icon"
          @click="openLS(loc.id, ind)"
        >
          <l-tooltip 
            :options="{ 
              direction: 'bottom',
              permanent: true, 
              interactive: true
            }"
          >
            <strong>{{ loc.name }}</strong> 
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
    <!---->
    <b-modal v-model="m_infLoc" 
      size="lg"
      content-class="styleGM"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :hide-header="true"
      :hide-footer="true"
    >
      <div>
        <h5>{{ nameTitle }}</h5>
      </div>
      <div class="general-information mt-2">
        <span><strong>Institución:</strong> Coordinación Universitaria para la Sustentabilidad</span>
        <br>
        <span><strong>Pais: </strong>México | <strong>Estado:</strong> Ciudad de México</span> 
        <br>
        <span><strong>Dirección: </strong>Antiguo Edificio de Posgrados, 2do Piso, Ciudad Universitaria, C.P.04510, Ciudad de México, México.</span>
        <br>
        <span><strong>Página:</strong> <a href="https://cous.sdi.unam.mx/cous/" target="_blank">https://cous.sdi.unam.mx/cous/</a></span>
      </div>
      <div class="all-information mt-2">
        <h5>Servicios</h5>
        <p>"La Coordinación de Vinculación contribuye, mediante los nexos que establece, en la realización de proyectos de investigación tanto académicos como de desarrollo arquitectónico, paisajístico, urbanístico y de diseño industrial, requeridos por la sociedad para mejorar su calidad de vida."</p>
        <!--
        <b-tabs fill>
          <b-tab title-item-class="title-information" title="Institucional" active>
            <b-card-text>
              <div class="mt-2">
                <div class="item-information mt-1">
                  <span><strong>Iniciativa: </strong></span>
                  <br>
                  <span><strong>Descripción: </strong></span>
                  <br>
                  <span><strong>Responsable: </strong></span>
                  <br>
                  <span><strong>Página Web: </strong></span>  
                </div>
                <div class="item-information mt-1">
                  <span><strong>Iniciativa: </strong></span>
                  <br>
                  <span><strong>Descripción: </strong></span>
                  <br>
                  <span><strong>Responsable: </strong></span>
                  <br>
                  <span><strong>Página Web: </strong></span>  
                </div>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title-item-class="title-information" title="Dependencia/Entidad">
            <b-card-text>
              <div class="mt-2">Tab contents 2</div>
            </b-card-text>
          </b-tab>
          <b-tab title-item-class="title-information" title="Estudiantil">
            <b-card-text>
              <div class="mt-2">Tab contents 3</div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      -->
      </div>
      <div class="mt-3 text-right">
        <b-button class="sb" variant="outline-primary" size="sm" @click="closeLS()">
          Aceptar
        </b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import { latLng, icon} from "leaflet";
  import { LMap, LTileLayer, LMarker, LTooltip, LIcon} from "vue2-leaflet";
  export default {
    name: "Mundo",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
      LIcon
    },
    data() {
      return {
        zoom: 2,
        center: latLng(19.432778, -99.133056),
        //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        //url:'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        mapOptions: {
          zoomSnap: 0.5
        },
        icon: icon({
          iconUrl: "https://cous.sdi.unam.mx/media/geo_iniciativas/geoloc.png",
          iconAnchor: [16, 37],
          iconSize: [32, 37],
        }),
        locations: [
          {
            id: 0,
            name: "Punto central",
            lng: -99.133056,
            lat: 19.432778
          },
        ],
        nameTitle: '',
        m_infLoc: false,
        visible: false,
        pbSearch: false,
        selected1: null,
        selected2: null,
        selected3: null,
        selected4: null,
        options1: [
          { value: null, text: 'Pais', disabled: true },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'c', text: 'This one is disabled'}
        ],
        options2: [
          { value: null, text: 'Estado', disabled: true},
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'c', text: 'This one is disabled'}
        ],
        options3: [
          { value: null, text: 'Practica sustentable', disabled: true },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'c', text: 'This one is disabled'}
        ],
        options4: [
          { value: null, text: 'Entidad/Institución', disabled: true},
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'c', text: 'This one is disabled'}
        ]
      };
    },
    methods: {
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      allLocations(){
        this.locations = [
          {id:'I1',name:'COUS',lat:19.3318236593342,lng:-99.1805172009197},
          {id:'I2',name:'ENES-León',lat:21.0428477854153,lng:-101.673744390023},
          {id:'I3',name:'ENES-Morelia',lat:19.6496288816915,lng:-101.222377924113},
          {id:'I4',name:'FA',lat:19.331435533508,lng:-99.1865678892527},
          {id:'I5',name:'FC',lat:19.324417255342,lng:-99.1791632862861},
          {id:'I6',name:'IB',lat:19.3208733511866,lng:-99.1943228162376},
          {id:'I7',name:'ICMyL',lat:19.3288905932328,lng:-99.1786379993479},
          {id:'I8',name:'IE',lat:19.3217483299713,lng:-99.1924096820408},
          {id:'I9',name:'IER',lat:18.8400257827428,lng:-99.2357716463251},
          {id:'I10',name:'IINGEN',lat:19.330492108679,lng:-99.1820331807818},
          {id:'I11',name:'IIES',lat:19.6481194353448,lng:-101.228547301621},
          {id:'I12',name:'IIEC',lat:19.3159947396468,lng:-99.1797069852433},
          {id:'I13',name:'IIS',lat:19.3151316932832,lng:-99.1793661956702},
          {id:'I14',name:'ENP 9',lat:19.4839416759702,lng:-99.1281001021369},
          {id:'I15',name:'ENP 2',lat:19.3844731412907,lng:-99.1000662886471},
          {id:'I16',name:'FES-Iztacala',lat:19.5258522954491,lng:-99.1866453220834},
          {id:'I17',name:'FES-Cuautitlán',lat:19.693119451521543, lng:-99.19043296931291},
          {id:'I18',name:'CG',lat:20.7022997212985, lng:-100.4471584248150},
          {id:'I19',name:'CIGA',lat:19.6487483069334, lng:-101.2277525986560},
          {id:'I20',name:'CIMSUR',lat:16.7383996277277, lng:-92.6335411357035},
          {id:'I21',name:'UMDI-FC',lat:20.7031817564768, lng:-100.4473974798330},
          {id:'I22',name:'CEPE-Taxco',lat:18.5676030419373, lng:-99.6054473026653},
          {id:'I23',name:'CRIM',lat:18.9820143775236, lng:-99.2372894886509},
        ]
      },
      mapReset(){
        this.zoom = 2
        this.center = L.latLng(19.432778, -99.133056)
        this.locations = [  
          {
            id: 0,
            name: "Punto central",
            lng: -99.133056,
            lat: 19.432778
          }
        ]
      },
      searchLoc(){
        this.pbSearch = true;
        setTimeout(() => {
          this.pbSearch = false;
          this.visible = false; 
        }, 2000);
      },
      openLS(id, ind){
        if(id==0){
          alert("Por favor selecciona una opción una opción para iniciar la busqueda.")
        }
        else{
          this.nameTitle = this.locations[ind].name;
          this.m_infLoc = true;
        }
      },
      closeLS(){
        this.m_infLoc = false;
      }

    }
  };
</script>
<style lang="css">
  .leaflet-control-container{
    display: none;
  }
</style>