<template>
  <article>
    <section class="signin" v-if="!isSignedIn">
      <h2>Signin</h2>
      <form v-on:submit.prevent="Signin">
        <div class="field">
          <label for="username">Name: </label>
          <input class="name" type="text" name="username" placeholder="name" v-model="signin.username">
        </div>
        <div class="field">
          <label for="password">Pass: </label>
          <input class="pass" type="password" name="password" placeholder="password" v-model="signin.password">
        </div>
        <div class="field">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div id="error_code"></div>
    </section>
    <section class="signup" v-if="!isSignedIn">
      <h2>Signup</h2>
      <form v-on:submit.prevent="!Signup">
        <div class="field">
          <label for="username">Name: </label>
          <input class="name" type="text" name="username" placeholder="name" v-model="signup.username">
        </div>
        <div class="field">
          <label for="password">Pass: </label>
          <input class="pass" type="password" name="password" placeholder="password" v-model="signup.password">
        </div>
        <div class="field">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div id="error_code"></div>
    </section>
    <section v-if="isSignedIn">
      <a><h2 @click="Signout">Signout</h2></a>
    </section>
  </article>
</template>
<script>
import {HTTP} from './Header'

export default {
  data () {
    return {
      signin: {
        username: '',
        password: ''
      },
      signup: {
        username: '',
        password: ''
      },
      isSignedIn: false
    }
  },
  mounted () {
    HTTP.get('role',
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.isSignedIn = true
      })
      .catch(e => {
        HTTP.get('signin')
          .then(response => {
            localStorage.setItem('token', response.headers.authorization)
          })
      })
  },
  methods: {
    Signin: function () {
      HTTP.post('signin',
        this.$data.signin,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          localStorage.setItem('token', response.headers.authorization)
          this.$router.push('/challenges')
        })
        .catch(e => {
          localStorage.setItem('token', '')
          document.getElementById('error_code').innerHTML = '<p>Invalid input data.</p>'
        })
    },
    Signup: function () {
      HTTP.post('signup',
        this.$data.signup,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          withCredentials: true
        })
        .then(response => {
          localStorage.setItem('token', response.headers.authorization)
          this.$router.push('/')
        })
        .catch(e => {
          localStorage.setItem('token', '')
          document.getElementById('error_code').innerHTML = '<p>Invalid input data.</p>'
        })
    },
    Signout: function () {
      HTTP.delete('signin',
        {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        .then(response => {
          localStorage.setItem('token', '')
          this.$router.push('/')
        })
    }
  }
}
</script>
<style scoped>
article {
  display: -webkit-flex;
  display: flex;
}
section {
  -webkit-justify-content: space-around;
  justify-content: space-around;
}
h2 {
  font-size: 42px;
}
h3 {
  font-size: 36px;
}
.signin {
  background: white;
  width: 36vw;
  height: 60vh;
  margin: 10vh auto 0 10vw;
  border: solid 3.15px #6699cc;
  border-radius: 10px 10px;
}
.signup {
  background: white;
  width: 36vw;
  height: 60vh;
  margin: 10vh 10vw 0 auto;
  border: solid 3.15px #6699cc;
  border-radius: 10px 10px;
}
.field {
  margin-bottom: 2em;
  padding: 5px;
  font-size: 24px;
}
</style>
