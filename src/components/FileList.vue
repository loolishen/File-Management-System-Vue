<template>
  <div class="list-section">
    <h2>Uploaded Files</h2>

    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search files..." />
    </div>

    <!-- Sorting Controls -->
    <div class="sorting-controls">
      <label for="sortCriterion">Sort by: ㅤㅤㅤㅤ</label>
      <select id="sortCriterion" v-model="sortedBy" @change="sortFiles">
        <option value="filename">Filename (Alphabetical)</option>
        <option value="uploadDate">Upload Date</option>
        <option value="size">Size</option>
      </select>

      <button @click="toggleSortDirection">
        {{ sortDirection === 'asc' ? 'Ascending' : 'Descending' }}
      </button>
    </div>

    <!-- File List Table -->
    <table class="file-table">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Size</th>
          <th>Upload Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in filteredFiles" :key="file._id">
          <td>{{ file.filename }}</td>
          <td>{{ file.size }} bytes</td>
          <td>{{ new Date(file.uploadDate).toLocaleString() }}</td>
          <td>
            <button @click="deleteFile(file._id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      files: [],
      sortedBy: 'filename',
      sortDirection: 'asc',
      searchQuery: '',
    };
  },
  computed: {
    filteredFiles() {
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      return this.sortedFiles.filter(file => file.filename.toLowerCase().includes(lowerSearchQuery));
    },
    sortedFiles() {
      return [...this.files].sort((a, b) => {
        let comparison = 0;
        if (a[this.sortedBy] < b[this.sortedBy]) comparison = -1;
        else if (a[this.sortedBy] > b[this.sortedBy]) comparison = 1;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
  },
  methods: {
    fetchFiles() {
      axios.get('http://localhost:8081/api/files')
        .then(response => {
          this.files = response.data;
        })
        .catch(error => {
          console.error('Error loading files:', error);
        });
    },
    deleteFile(fileId) {
      axios.delete(`http://localhost:8081/api/files/${fileId}`)
        .then(() => {
          this.fetchFiles(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting file:', error);
        });
    },
    sortFiles() {
      // This triggers the computed property to re-evaluate
    },
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.sortFiles();
    }
  },
  created() {
    this.fetchFiles(); // Load files on component creation
  }
};
</script>

<style scoped>
.list-section {
  padding: 20px;
}

.search-bar {
  margin-bottom: 10px;
}

.sorting-controls {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
}

.file-table th, .file-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.file-table th {
  background-color: #f7f7f7;
}
</style>
