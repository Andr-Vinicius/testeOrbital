<template>
  <div class="d-flex justify-content-end gap-2 mb-6">
    <button class="btn btn-primary" type="button" @click="$router.push('/products/create')">
      Adicionar
    </button>
    <button class="btn btn-primary" type="button" @click="logout">
      Logout
    </button>
  </div>

  <div class="products">
    <h1>Lista de Produtos</h1>

    <p v-if="loading">Carregando produtos...</p>
    <table v-else>
      <thead>
        <tr class="header">
          <th>ID</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Descrição</th>
          <th>Imagem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img 
              v-if="product.image_url" 
              :src="product.image_url" 
              alt="Imagem do produto" 
              width="100"
            />
            <span v-else>Sem imagem</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductsList',

  data() {
    return {
      products: [],
      loading: true,
      error:null,
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    async logout() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:8000/api/logout', {
          email: this.email,
          password: this.password
        });

        this.$emit('logout sucess', response.data.token);
        this.$router.push('/')
  
        } catch (err) {
          console.error(err);
          if (err.response) this.error = err.response.data.message || 'Erro ao logar';
          this.error = 'Erro de conexão com o servidor';   
        }
      },

    async getProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products')
        this.products = response.data
      } catch (error) {
        console.error(error)
        alert('Erro ao carregar produtos')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

h1{
  margin-top: 10pt;
  text-align: center;
}

table th, table td {
  text-align: center;      
  vertical-align: middle;  
}

.product-img {
  display: block;
  margin: 0 auto;
}
</style>
