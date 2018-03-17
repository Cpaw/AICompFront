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
