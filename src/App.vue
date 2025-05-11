<template>
  <div id="app">
    <div id="header">
      <b-navbar id="navbar-style" toggleable="lg" type="dark">
        <b-navbar-brand id="nb-ft" to="/"><span class="ptitle">Prácticas Sustentables</span></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/iniciativas">Iniciativas</b-nav-item>
            <b-nav-item to="/servicios">Servicios</b-nav-item>
            <!--
            <b-nav-item to="/sub3">Sub 3</b-nav-item>
            <b-nav-item to="/sub4">Sub 4</b-nav-item>
          -->
            <b-nav-item-dropdown text="Idioma" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <main>
      <b-container>
        <router-view/>
      </b-container>
    </main>
        
  </div>
</template>
<style lang="css">
  @import url(./assets/styles/core.css);
</style>
