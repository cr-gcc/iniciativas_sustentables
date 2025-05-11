<template>
  <div id="home" class="mt-4">

    <div class="mt-2">
      <h1 class="text-center ptitle">Prácticas sustentables</h1>
    </div>
    <div class="mt-4">
      <h4>
        <p class="pp">Apreciable visitante, te damos la bienvenida al sitio de Prácticas Sustentables de la Coordinación Universitaria para la Sustentabilidad.</p>
        <p class="pp">Aquí podrás encontrar las iniciativas, proyectos y demás servicios que realiza la UNAM alrededor de los componentes estratégicos del Plan Integral para la Sustentabilidad (PISU).</p>
      </h4>
    </div>
    <div class="row mt-5">
      <div class="col-sm-12 col-md-6">
        <router-link to="/iniciativas" rol="button" class="btn btn-block btn-outline-dark">
          Iniciativas
        </router-link>
      </div>
      <div class="col-sm-12 col-md-6">
        <router-link to="/servicios" rol="button" class="btn btn-block btn-outline-dark">
          Servicios
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
