<template>
  <div class="upload-section">
    <h2>Upload a New File</h2>
    <input type="file" @change="onFileSelected" class="custom-file-input"/>
    <button @click="uploadFiles" class="upload-button">Upload</button>

    <div v-if="uploadResponse" class="upload-response">
      <h3>Upload Response</h3>
      <pre>{{ uploadResponse }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFiles: null,
      uploadResponse: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFiles = event.target.files;
    },
    uploadFiles() {
      if (this.selectedFiles) {
        const formData = new FormData();
        Array.from(this.selectedFiles).forEach(file => {
          formData.append('files', file);
        });

        axios.post('http://localhost:8081/api/upload-file', formData)
          .then(response => {
            this.uploadResponse = response.data;
            this.$emit('fileUploaded'); // Emit an event when upload is complete
          })
          .catch(error => {
            console.error('Error uploading file(s):', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.upload-section {
  padding: 20px;
}

.custom-file-input {
  display: inline-block;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.upload-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #388E3C;
}

.upload-response {
  margin-top: 20px;
  background-color: #f0f2f5;
  padding: 15px;
  border-radius: 5px;
}
</style>
