<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
  passwordConfirmation: '',
})

function submit() {
  form.post('/register', {
    onSuccess: () => {
      // navegacao será tratada pelo servidor (redirect)
    },
    onError: () => {
      // form.errors estará preenchido automaticamente
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Criar Conta</h2>
        <p class="mt-2 text-sm text-gray-600">
          Preencha os dados abaixo para se registrar
        </p>
      </div>
      
      <div class="bg-white shadow-xl rounded-lg px-8 py-8">
        <form @submit.prevent="submit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input 
              id="email"
              v-model="form.email" 
              type="email" 
              required
              class="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="seu@email.com"
            />
            <p v-if="form.errors.email" class="mt-2 text-sm text-red-600">
              {{ form.errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input 
              id="password"
              v-model="form.password" 
              type="password" 
              required
              class="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="••••••••"
            />
            <p v-if="form.errors.password" class="mt-2 text-sm text-red-600">
              {{ form.errors.password }}
            </p>
          </div>

          <div>
            <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha
            </label>
            <input 
              id="passwordConfirmation"
              v-model="form.passwordConfirmation" 
              type="password" 
              required
              class="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="••••••••"
            />
            <p v-if="form.errors.passwordConfirmation" class="mt-2 text-sm text-red-600">
              {{ form.errors.passwordConfirmation }}
            </p>
          </div>

          <div class="pt-4">
            <button 
              type="submit"
              :disabled="form.processing" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              <span v-if="form.processing" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
              <span v-else>Registrar</span>
            </button>
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Já tem uma conta? 
            <a href="/login" class="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
