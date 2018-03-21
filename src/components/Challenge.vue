<template>
  <article v-if="isSignedIn">
    <h2>{{ challenge.title }}</h2>
    <section>
      <p>{{ challenge.questiontext }}</p>
    </section>
      <section class="submit">
        <label for="csv_file">
          Select csv file
          <input @change="selectedFile" type="file" name="file" id="csv_file" style="display:none;">
        </label>
        <p>{{ filename }}</p>
        <br>
        <button @click="upload" type="submit">Submit</button>
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
      challenge: {
        id: 0,
        title: '',
        created_at: '',
        updated_at: '',
        questiontext: '',
        Weight: ''
      },
      uploadFile: null,
      filename: '',
      isSignedIn: false
    }
  },
  mounted () {
    HTTP.get(`challenges/` + this.$route.params.challenge_id,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$data.isSignedIn = true
        this.$data.challenge = response.data.results.challenge
      })
      .catch(e => {
        this.$data.isSignedIn = false
      })
  },
  methods: {
    selectedFile: function (e) {
      e.preventDefault()
      let files = e.target.files
      this.$data.uploadFile = files[0]
      this.$data.filename = files[0].name
    },
    upload: function () {
      let formData = new FormData()
      formData.append('file', this.$data.uploadFile)
      formData.append('id', this.$route.params.challenge_id)
      HTTP.post('submit', formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          }
        })
        .then((response) => {
          this.$data.result = response.data
          document.getElementById('result').innerHTML = '<p>Accuracy: ' + this.$data.result.message.slice(0, 6) + '%</p>'
        })
        .catch((error) => {
          this.$data.result = error.response.data
          document.getElementById('error').innerHTML = '<p>' + this.$data.result.message + '</p>'
        })
    }
  }
}
</script>
<style scoped>
article {
  background: #fff;
  border-radius: 15px;
  border: 3px solid #6699cc;
  width: 70vw;
  height: 60vh;
  margin: 10vh auto 0 auto;
}
h2 {
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-size: 42px;
}
p {
  font-size: 36px;
  font-family: "a-otf-ud-shin-maru-go-pr6n";
}
label {
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  font-size: 24px;
  padding: 0.6em 1.5em 0.6em 1.5em;
  border: 2px solid #6699cc;
  border-radius: 15px;
}
label:hover {
  cursor: pointer;
  background: #fafafa;
}
button {
  position: relative;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #FFF;
  background: #6699cc;
  border: solid 2px #6699cc;
  font-size: 20px;
  font-family: "a-otf-ud-shin-maru-go-pr6n";
  width: 10vw;
}
button:hover {
  cursor: pointer;
  background: #76a9dc;
}
button:active {
  background: #4679ac;
}
</style>
