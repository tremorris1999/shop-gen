<template>
  <v-card width="336px">
    <v-carousel
      v-if="hasImages"
      cycle
      :interval="4000"
      hide-delimiter-background
      :show-arrows="false"
      height="225px"
    >
      <v-carousel-item
        v-for="(id, index) in recipe.imageIds"
        :key="index"
        :src="getSource(id)"
        cover
      />
    </v-carousel>
    <v-card-title>
      <span>{{ recipe.name }}</span>
      <v-btn
        v-if="canEdit"
        icon
        rounded
        size="x-small"
        style="float: right"
        variant="tonal"
      >
        <v-icon icon="mdi-pencil" />
        <v-dialog v-model="isEditing" activator="parent" scrollable persistent>
          <RecipeForm :recipe="recipe" @close="isEditing = false" />
        </v-dialog>
      </v-btn>
    </v-card-title>
    <v-card-text>
      {{ recipe.description }}
    </v-card-text>
    <v-card-actions>
      <IngredientsTable
        :id="recipe.id"
        :name="recipe.name"
        :readonly="readonly"
      />
      <v-btn
        v-if="!readonly"
        color="secondary"
        variant="elevated"
        elevation="6"
        @click="addPlanItem(recipe)"
      >
        Add To Plan
      </v-btn>
      <v-btn
        v-if="readonly"
        color="error"
        variant="elevated"
        elevation="6"
        @click="removeFromPlan(recipe.id)"
      >
        Remove
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        :icon="favoriteIcon"
        :color="favoriteColor"
        @click="toggleFavorite"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import api from '@/api'
import Recipe from '@/types/recipe'
import { ref, computed } from 'vue'
import IngredientsTable from './IngredientsTable.vue'
import RecipeForm from './RecipeForm.vue'
import usePlan from '@/composables/plan'
import useUser from '@/composables/user'
import useFavorites from '@/composables/favorites'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  recipe: Recipe
  readonly?: boolean
}>()

const { user } = useUser()
const canEdit = computed(
  () => !props.readonly && props.recipe.creatorId === user.value?.id
)
const isLoggedIn = computed(() => !!user.value?.id)

const hasImages = computed(() => !!props.recipe.imageIds?.length ?? 0)
const isEditing = ref(false)

const getSource = (id: string) => `${api.imageURL}/${id}`

const { addToPlan, removeFromPlan } = usePlan()
const addPlanItem = (recipe: Recipe) => {
  addToPlan(recipe.id)
  toast.success(`Added ${recipe.name} to plan!`)
}

const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
const isFavorite = computed(() => favorites.value.includes(props.recipe.id))
const favoriteIcon = computed<string>(() =>
  isFavorite.value ? 'mdi-heart' : 'mdi-heart-outline'
)
const favoriteColor = computed<string>(() =>
  isFavorite.value ? 'error' : 'default'
)
const toggleFavorite = () => {
  console.log(isFavorite.value)
  if (isFavorite.value) removeFromFavorites(props.recipe.id)
  else addToFavorites(props.recipe.id)
}
</script>
