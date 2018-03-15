<template>
  <article>
    <section>
      <ul>
        <li v-for="(challenge, index) in challenges" :key="index">{{ challenge.name }}</li>
      </ul>
    </section>
  </article>
</template>
<script>
import {HTTP} from './Header'

export default {
  data () {
    return {
      challenges: [{
        title: ''
      }]
    }
  },
  created () {
    HTTP.get(`challenges`,
      {
        headers: {
          'Authorization': HTTP.defaults.headers.common['Authorization']
        }
      })
      .then(response => {
        HTTP.defaults.headers.common['Authorization'] = response.$parent.token
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
