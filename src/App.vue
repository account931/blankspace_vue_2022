<template>
  <div id="app">
    <img src="./assets/logo.png" class="vue-logo">
	
	<div class="loader-x">
	    <img src="./assets/loader-black.gif" alt="a">
	</div>
	
    <router-view/> <!-- see current used component in /src/router/index.js -->
  </div>
</template>




<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.vue-logo{width: 2%;}

 /* Mobile */
 @media screen and (max-width: 480px) {
     .vue-logo{width: 11%;}
 }
 
 
/* -- Loader */
.loader-x  {position:absolute; top:16em; left:40em;width:99%; z-index:888; display:none;}
.loader-x img {width:13%;}

/* ---------------------------------------- Mobile */
@media screen and (max-width: 480px) { 
  .loader-x  {position:fixed; top:16em; left:1em; width:99%;}
  .loader-x img {width:43%;}  
}
 
</style>
