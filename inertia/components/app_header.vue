<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <Link href="/" class="text-2xl font-bold uppercase">
            <span class="text-gray-500">bate</span>
            <span class="text-pink-300"> papo</span>
          </Link>
        </div>

        <div class="flex items-center">
          <div v-if="user" class="flex items-center space-x-8">
            <span v-if="user.profile" class="text-gray-500 text-base font-semibold">Hi, <span class="text-pink-300">{{ user.profile.displayName }}</span>!</span>
            <Link
              href="/logout"
              method="post"
              as="button"
              type="button"
              class="text-gray-500 text-base font-semibold hover:text-pink-300 active:text-pink-200"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

interface User {
  profile: {
    displayName: string
  }
}

const page = usePage()
const user = computed(() => page.props.user as User)
</script>
