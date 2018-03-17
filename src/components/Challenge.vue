<template>
  <article>
    <h2>{{ challenge.title }}</h2>
    <section>
      <p>{{ challenge.questiontext }}</p>
    </section>
  </article>
</template>
<script>
import {HTTP} from './Header'

export default {
  data () {
    return {
      challenge: {
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
    HTTP.get(`challenges/` + this.$route.params.challenge_id,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.challenge = response.data.results.challenge
      })
  }
}
</script>
