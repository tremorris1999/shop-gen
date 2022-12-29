<template>
  <v-container>
    <v-card v-if="!hasRecipes" width="336px">
      <v-card-text class="text-center">
        You haven't added any recipes to your plan.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="navigateToRecipes"
          >Browse Recipes
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-row justify="center">
      <v-btn
        v-if="hasRecipes"
        color="secondary"
        class="mt-3 mb-9 mx-2"
        variant="tonal"
      >
        Generate List
      </v-btn>
      <v-btn
        v-if="hasRecipes"
        color="error"
        class="mt-3 mb-9 mx-2"
        variant="tonal"
        @click="plan.clearPlan"
      >
        Clear Plan
      </v-btn>
    </v-row>
    <RecipeCard
      v-for="(recipe, index) in plannedRecipes"
      :key="index"
      :recipe="recipe"
      readonly
      class="mb-12"
    />
  </v-container>
</template>

<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import usePlan from '@/composables/plan'
import useRecipes from '@/composables/recipes'
import Recipe from '@/types/recipe'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const plan = usePlan()
const { recipes } = useRecipes()
const plannedRecipes = computed(() => {
  const planned = [] as Recipe[]
  plan.getPlanItems().forEach(id => {
    const selected = recipes.value.find(recipe => recipe.id == id)
    if (selected) planned.push(selected)
  })

  return planned
})
const hasRecipes = computed(() => !!plannedRecipes.value.length)

const router = useRouter()
const navigateToRecipes = () => router.push('/recipes')
</script>
