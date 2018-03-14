<template>
  <article>
    <section class="signin">
      <h2>Signin</h2>
      <form v-on:submit.prevent="Signin">
        <div class="field">
          <p>Name</p>
          <input class="name" type="text" name="name" placeholder="name" v-model="signin.name">
        </div>
        <div class="field">
          <p>Pass</p>
          <input class="pass" type="password" name="password" placeholder="password" v-model="signin.password">
        </div>
        <div class="field">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div id="error_code"></div>
    </section>
    <section class="signup">
      <h2>Signup</h2>
      <form v-on:submit.prevent="Signup">
        <div class="field">
          <p>Name</p>
          <input class="name" type="text" name="name" placeholder="name" v-model="signup.name">
        </div>
        <div class="field">
          <p>Pass</p>
          <input class="pass" type="password" name="password" placeholder="password" v-model="signup.password">
        </div>
        <div class="field">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div id="error_code"></div>
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
      },
      signup: {
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
        .catch(e => {
          document.getElementById('error_code').innerHTML = '<p>Invalid input data.</p>'
        })
    },
    Signup: function () {
      HTTP.post('signup',
        this.$data.signup,
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        })
        .then(response => {
          this.$router.push('/')
        })
        .catch(e => {
          document.getElementById('error_code').innerHTML = '<p>Invalid input data.</p>'
        })
    }
  }
}
</script>
<style scoped>
.signin {
  background: white;
  width: 30vw;
  margin: 10vh auto 0 auto;
  border: solid 3.15px #6699cc;
  border-radius: 10px 10px;
}
.signup {
  background: white;
  width: 30vw;
  margin: 10vh auto 0 auto;
  border: solid 3.15px #6699cc;
  border-radius: 10px 10px;
}
</style>
