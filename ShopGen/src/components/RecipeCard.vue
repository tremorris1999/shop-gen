<template>
  <v-card width="336px">
    <v-carousel v-if="hasImages" cycle :interval="4000" hide-delimiter-background :show-arrows="false" height="225px">
      <v-carousel-item v-for="id in recipe.imageIds" :src="getSource(id)" cover />
    </v-carousel>
    <v-card-title>
      <span>{{ recipe.name }}</span>
      <v-btn v-if="!readonly" icon rounded size="x-small" style="float: right;" variant="tonal">
        <v-icon icon="mdi-pencil" />
        <v-dialog v-model="isEditing" activator="parent" scrollable persistent>
          <RecipeForm :recipe="recipe" @close="(isEditing = false)" />
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      {{ recipe.description }}
    </v-card-text>
    <v-card-actions>
      <IngredientsTable :id="recipe.id" :name="recipe.name" :readonly="readonly" />
      <v-btn v-if="!readonly" color="secondary" variant="elevated" elevation="6" @click="plan.addToPlan(recipe.id)">
        Add To Plan
      </v-btn>
      <v-btn v-if="readonly" color="error" variant="elevated" elevation="6" @click="plan.removeFromPlan(recipe.id)">
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import api from '@/api';
import Recipe from '@/types/recipe';
import { ref, computed } from 'vue';
import IngredientsTable from './IngredientsTable.vue';
import RecipeForm from './RecipeForm.vue';
import usePlan from '@/composables/plan';

const props = defineProps<{
  recipe: Recipe,
  readonly?: boolean
}>()

const hasImages = computed(() => !!props.recipe.imageIds?.length ?? 0)
const isEditing = ref(false)

const getSource = (id: string) => `${api.imageURL}/${id}`

const plan = usePlan()
</script>