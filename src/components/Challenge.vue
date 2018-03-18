<template>
  <article>
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
      uploadFile: null
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
            'content-type': 'multipart/form-data'
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
