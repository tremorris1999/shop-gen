<template>
  <v-container>
    <v-card v-if="!hasFavorites" width="336px">
      <v-card-text class="text-center">
        You haven't added any recipes to your favorites.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="navigateToRecipes"
          >Browse Recipes
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <RecipeCard
      v-for="recipe in favoriteRecipes"
      :key="recipe.id"
      :recipe="recipe"
      class="mb-12"
    />
  </v-container>
</template>

<script setup lang="ts">
import useRecipes from '@/composables/recipes'
import useFavorites from '@/composables/favorites'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import RecipeCard from '@/components/RecipeCard.vue'

const { recipes } = useRecipes()
const favorites = useFavorites()
const favoriteRecipes = computed(() =>
  recipes.value.filter(recipe => favorites.getFavorites().includes(recipe.id))
)
const hasFavorites = computed(() => !!favoriteRecipes.value.length)

const router = useRouter()
const navigateToRecipes = () => router.push('/recipes')
</script>
