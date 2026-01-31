<template>
  <div class="d-flex justify-content-end gap-2 mt-4">
    <button type="button" class="btn btn-primary" @click="$router.back()">
      Voltar
    </button>
    <button class="btn btn-primary" type="button" @click="logout">
      Logout
    </button>
  </div>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg product-card">
      <div class="card-header-orange"></div>
        <div class="card-body p-4">
          <h2 class="text-center mb-4 text-dark fw-bold">Novo Produto</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <input type="text" class="form-control" v-model="name" placeholder="Nome" required />
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" v-model="category" placeholder="Categoria" required />
            </div>
            <div class="mb-3">
             <textarea class="form-control" v-model="description" placeholder="Descrição" rows="3" required></textarea>
            </div>
            <div class="mb-4">
              <label class="form-label text-dark small fw-bold">Imagem</label>
              <input class="form-control" type="file" @change="handleFileUpload" />
            </div>
            <button type="submit" class="btn btn-primary w-100 m-0">Adicionar</button>
          <p v-if="error" class="error text-center mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsForm',

  data() {
    return {
      name: null,
      category: null,
      description: null,
      image: null, 
      error: null
    };
  },

  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },

    async submitForm() {
      this.error = null;

      try {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('category', this.category);
        formData.append('description', this.description);
        if (this.image) formData.append('image', this.image);
        
        const response = await axios.post(
          'http://localhost:8000/api/products',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        this.$router.push('/products');
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || 'Erro ao cadastrar produto';
      }
    },

    async logout() {
      this.error = null;

      try {
        await axios.post(
          'http://localhost:8000/api/logout',
          {},
          { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );

        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || 'Erro ao sair';
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 100px auto;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
