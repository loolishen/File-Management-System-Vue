<template>
  <div id="app">
    <header>
      <h1>File Management System</h1>
    </header>

    <main>
      <UploadFile @fileUploaded="refreshFileList"></UploadFile>
      <FileList ref="fileListComponent"></FileList>
    </main>
  </div>
</template>

<script>
import UploadFile from './components/UploadFile.vue';
import FileList from './components/FileList.vue';

export default {
  name: 'App',
  components: {
    UploadFile,
    FileList
  },
  methods: {
    refreshFileList() {
      this.$refs.fileListComponent.fetchFiles(); // Refresh file list after upload
    }
  }
};
</script>

<style>
/* Add global styles here */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f2f5;
  color: #333;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-weight: 600;
  color: #4CAF50;
}
</style>
