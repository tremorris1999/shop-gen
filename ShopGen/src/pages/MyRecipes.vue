<template>
  <v-container class="container">
    <v-text-field
      class="search mb-3"
      v-model="query"
      prepend-icon="mdi-magnify"
      single-line
      hide-details
      placeholder="Search..."
    />
    <v-row justify="center" class="mx-auto mt-2 mb-4">
      <v-btn class="button" color="primary" variant="outlined">
        <v-icon icon="mdi-plus" /> Add
        <v-dialog v-model="isEditing" activator="parent" scrollable persistent>
          <RecipeForm @close="isEditing = false" />
        </v-dialog>
      </v-btn>
    </v-row>
    <template v-if="!isLoading">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        class="mb-12"
        @update="isEditing = false"
      />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeForm from '@/components/RecipeForm.vue'
import useRecipes from '@/composables/recipes'
import useUser from '@/composables/user'
import { useRouter } from 'vue-router'

const { recipes } = useRecipes()
const { user } = useUser()
const filteredRecipes = computed(() => {
  const regex = new RegExp(`^${query.value}`)
  const filtered = query.value
    ? recipes.value.filter(r => regex.test(r.name))
    : recipes.value
  return filtered.filter(r => r.creatorId === user.value?.id)
})

const query = ref('')

const isLoading = computed(() => !recipes.value)
const isEditing = ref(false)

const router = useRouter()
onBeforeMount(() => {
  if (!user.value?.id) router.push('/home')
})
</script>

<style scoped>
.search {
  width: 300px;
}

.button {
  width: 200px;
}

.container {
  width: 368px;
}
</style>
