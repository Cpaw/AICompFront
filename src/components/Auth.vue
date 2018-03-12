<template>
  <article>
    <section class="signin">
      <h2>Signin</h2>
      <form>
        <div class="field">
          <p>Name</p>
          <input class="name" type="text" name="name" placeholder="name" v-model="signin.name">
        </div>
        <div class="field">
          <p>Pass</p>
          <input class="pass" type="password" name="password" placeholder="password" v-model="signin.password">
        </div>
      </form>
    </section>
  </article>
</template>
<script>
import {HTTP} from './Header'

export default {
  data () {
    return {
      signin: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    Signin: function () {
      HTTP.post('signin',
        this.$data.signin,
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        })
        .then(response => {
          this.$router.push('/problems')
        })
    }
  }
}
</script>
<style scoped>
</style>
