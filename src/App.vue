<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>
<script>
import Header from './components/Header'

export default {
  name: 'App',
  data () {
    return {
      isSignedin: false
    }
  },
  components: {
    Header
  },
  watch: {
    '$route' () {
      this.check()
    }
  },
  method: {
    check: function () {
      Header.HTTP.get('role')
        .then(response => {
          console.log(response.data)
          this.$data.isSignedin = false
        })
    }
  }
}
</script>

<style>
html {
  background: url('./assets/background.png');
  background-size: cover;
}
#app {
  font-family: 'gooddog-new', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
