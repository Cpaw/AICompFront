<template>
  <article v-if="isSignedIn">
    <section>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>score</th>
            <th>ranking</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in ranking" :key="user.rank">
            <th>{{user.username}}</th>
            <th>{{user.score}}</th>
            <th>{{user.rank}}</th>
          </tr>
        </tbody>
      </table>
    </section>
  </article>
  <article v-else>
    <h2>ログインしてください</h2>
  </article>
</template>
<script>
import {HTTP} from './Header'
export default {
  data () {
    return {
      ranking: {
        username: '',
        score: '',
        rank: ''
      },
      isSignedIn: false
    }
  },
  created () {
    HTTP.get(`ranking`,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.isSignedIn = true
        this.$data.ranking = response.data.results.ranking
      })
      .catch(e => {
        this.$data.isSignedIn = false
      })
  }
}
</script>
<style scoped>
h2 {
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-size: 42px;
}
</style>
