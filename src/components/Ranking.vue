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
          <tr v-for="(user, index) in users" :key="index">
            <th>{{user.name}}</th>
            <th>{{user.score}}</th>
            <th>{{user.ranking}}</th>
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
      users: [{
        name: '',
        score: '',
        ranking: ''
      }],
      errors: []
    }
  },
  created () {
    HTTP.get(`ranking`)
      .then(response => {
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
