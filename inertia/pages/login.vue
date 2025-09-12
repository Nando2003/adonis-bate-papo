<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

const form = useForm({ email: '', password: '' })

function submit() {
  form.post('/login')
}
</script>

<template>
  <n-button>Teste exemplo</n-button>
</template>