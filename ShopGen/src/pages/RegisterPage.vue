<template>
  <v-card width="336px" class="ma-8">
    <v-card-title>
      Register
    </v-card-title>
    <v-card-text>
      Register for ShopGen to unlock features like creating and editing recipes.
      <v-form class="mt-6" ref="form">
        <v-text-field v-model="email" label="Email" prepend-icon="mdi-mail" :rules="emailRules" />
        <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock" :type="type" :rules="passwordRules" />
        <v-text-field v-model="verifyPassword" label="Verify Password" prepend-icon="mdi-format-letter-matches" :type="type" :rules="verifyRules" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="mx-4" color="primary" variant="tonal" @click="isPasswordVisible = !isPasswordVisible">
        {{ buttonText }}
      </v-btn>
      <v-spacer />
      <v-btn class="mx-4" color="secondary" variant="tonal" :disabled="!isFilled" :loading="isLoading" @click="submit">
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import useUser from '@/composables/user'
import { useRouter } from 'vue-router'
import { emailRules, passwordRules } from '@/validation'
import { VForm } from 'vuetify/lib/components/index'
import api from '@/api'
import User from '@/types/user'
import { toast } from 'vue3-toastify'

const isPasswordVisible = ref(false)
const type = computed(() => isPasswordVisible.value ? 'text' : 'password')
const buttonText = computed(() => isPasswordVisible.value ? 'Hide Password' : 'Show Password')

const email = ref('')
const password = ref('')
const verifyPassword = ref('')
const verifyRules = [() => verifyPassword.value === password.value || "Must match password", ...passwordRules]
const isFilled = computed(() => !!email.value && !!password.value && !!verifyPassword.value)

const form = ref<VForm>()
const isLoading = ref(false)
const router = useRouter()
const user = useUser()
const submit = async () => {
  const { valid } = await form.value?.validate() ?? { valid: false }
  if (valid) {
    isLoading.value = true;
    try {
    let newUser = User()
    newUser.email = email.value
    newUser.password = password.value
    newUser = await api.register(newUser)
    user.setCurrentUser(newUser)
    router.push('/home')
    } catch (err: any) {
      toast.error(err)
    }

    isLoading.value = false
  }
}

onBeforeMount(() => {
  if (user.getCurrentUser().id)
    router.push('/home')
})
</script>