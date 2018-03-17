<template>
  <article>
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
      errors: []
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
        this.$data.ranking = response.data.results.ranking
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
