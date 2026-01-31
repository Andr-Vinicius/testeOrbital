<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg product-card">
      <div class="card-header-orange"></div>   
      <div class="card-body p-4">
        <h2 class="text-center mb-4 text-dark fw-bold">Login</h2>
  
        <form @submit.prevent="login">
          <div class="mb-3">
            <input type="email"
              class="form-control"
              v-model="email"
              placeholder="E-mail"
              required/>
          </div>
          <div class="mb-4">
            <input type="password"
              class="form-control"
              v-model="password"
              placeholder="Senha"
              required/>
          </div>
          <button type="submit" class="btn btn-primary w-100 m-0">Entrar</button>
          <p v-if="error" class="error text-center mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Login',
  
    data() {
      return {
        email: null,
        password: null,
        error: null
      }
    },
  
    methods: {
      async login() {
        this.error = null;
  
        try {
          const response = await axios.post('http://localhost:8000/api/login', {
            email: this.email,
            password: this.password
          });


        localStorage.setItem('token', response.data.access_token)
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.access_token}`

        this.$emit('login-success', response.data.token);
        this.$router.push('/products')
  
        } catch (err) {
          console.error(err);
          if (err.response) this.error = err.response.data.message || 'Erro ao logar';
            this.error = 'Erro de conexão com o servidor';
        }
      }
    }
  }
  </script>
  
  <style scoped>

    input {
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