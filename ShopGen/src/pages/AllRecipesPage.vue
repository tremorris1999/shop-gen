<template>
  <v-container class="container">
    <v-text-field class="search mb-3" v-model="query" prepend-icon="mdi-magnify" single-line hide-details
      placeholder="Search..." />
    <v-row justify="center" class="mx-auto mt-2 mb-4">
      <v-btn class="button" color="primary" variant="outlined">
        <v-icon icon="mdi-plus" /> Add
        <v-dialog v-model="isEditing" activator="parent">
          <RecipeForm @close="(isEditing = false)" />
        </v-dialog>
      </v-btn>
    </v-row>
    <RecipeCard v-if="!isLoading" v-for="recipe in filteredRecipes" :recipe="recipe" class="mb-12"
      @update="(isEditing = false)" />
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import RecipeCard from '@/components/RecipeCard.vue';
import RecipeForm from '@/components/RecipeForm.vue';
import useRecipes from '@/composables/recipes'

const { recipes } = useRecipes()
const filteredRecipes = computed(() => {
  const regex = new RegExp(`^${query.value}`)
  return query.value
  ? recipes.value.filter(r => regex.test(r.name))
  : recipes.value
})

const query = ref('')

const isLoading = computed(() => !recipes.value)
const isEditing = ref(false)

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
