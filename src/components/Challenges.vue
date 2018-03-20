<template>
  <article>
    <section>
      <ul>
        <router-link v-for="challenge in challenges" :key="challenge.id" :to="{ path: 'challenge/' + challenge.id}"><li>{{ challenge.title }}</li></router-link>
      </ul>
    </section>
  </article>
</template>
<script>
import {HTTP} from './Header'

export default {
  data () {
    return {
      challenges: {
        id: 0,
        title: '',
        created_at: '',
        updated_at: '',
        questiontext: '',
        Weight: ''
      }
    }
  },
  created () {
    HTTP.get(`challenges`,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.challenges = response.data.results.challenges
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
<style scoped>
section {
  margin: 10vh auto 0 auto;
  width: 70vw;
}
a {
  text-decoration: none;
  font-size: 36px;
}
ul {
  padding: 0;
  margin: 0 auto;
  width: 36vw;
}
ul li {
  position: relative;
  list-style-type: none!important;
  padding: 10px 0 10px 0;
  margin-bottom: 3vh;
  line-height: 1.5;
  background: #fff;
  vertical-align: middle;
  color: #000;
  border-radius: 10px 10px 10px 10px;
  border: solid 3px #6699cc;
}

ul li:before{
  display:inline-block;
  vertical-align: middle;
}
ul li:hover{
  background: #fafaff;
}
</style>
