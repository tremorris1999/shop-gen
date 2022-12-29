<template>
  <v-card width="336px" class="ma-8">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form class="mt-6">
        <v-text-field v-model="email" label="Email" prepend-icon="mdi-mail" :rules="emailRules" />
        <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock" type="password" :rules="passwordRules" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="mx-4" color="primary" variant="tonal" @click="router.push('/register')" :disabled="isLoggingIn">
        Register
      </v-btn>
      <v-spacer />
      <v-btn class="mx-4" color="secondary" variant="tonal" @click="login" :loading="isLoggingIn">
        Log In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';
import { emailRules, passwordRules } from '@/validation'
import { useUser } from '@/composables/user'
import User from '@/types/user';
import api from '@/api';
import { toast } from 'vue3-toastify';

const router = useRouter()

const email = ref('')
const password = ref('')

const user = useUser()
const isLoggingIn = ref(false)
const login = async () => {
  isLoggingIn.value = true
  try {
    const currentUser = await api.login({
      email: email.value,
      password: password.value
    } as User)

    user.setCurrentUser(currentUser)
    router.push('/home')
  } catch (err: any) {
    toast.error(err)
  }
  isLoggingIn.value = false
}

onBeforeMount(() => {
  if (user.getCurrentUser().id)
    router.push('/home')
})
</script>