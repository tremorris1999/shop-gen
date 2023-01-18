<template>
  <v-btn
    color="primary"
    variant="elevated"
    elevation="6"
    @click="getIngredients"
  >
    Show Details
    <v-dialog
      v-if="hasLoadedIngredients"
      v-model="isShowingIngredients"
      activator="parent"
      scrollable
    >
      <v-card width="336px" class="ma-auto">
        <v-card-title>
          {{ name }}
        </v-card-title>
        <v-card-text style="max-height: 336px">
          <v-table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quanitity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingredient in ingredients" :key="ingredient.id">
                <td>{{ ingredient.name }}</td>
                <td>{{ ingredient.quantity }} {{ ingredient.unit }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            variant="tonal"
            @click="isShowingIngredients = false"
            >Close</v-btn
          >
          <v-btn
            v-if="!readonly"
            color="secondary"
            variant="tonal"
            @click="addPlanItem"
            >Add To Plan</v-btn
          >
          <v-btn v-if="readonly" color="error" variant="tonal"
            >Remove From Plan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import api from '@/api'
import usePlan from '@/composables/plan'
import Ingredient from '@/types/ingredient'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  id: string
  name: string
  readonly?: boolean
}>()

const ingredients = ref([] as Ingredient[])
const hasLoadedIngredients = computed(() => ingredients.value)
const getIngredients = async () => {
  try {
    ingredients.value = await api.getIngredients(props.id)
  } catch {
    toast.error('Unable to fetch ingredients')
  }
}

const isShowingIngredients = ref(false)

const { addToPlan } = usePlan()
const addPlanItem = () => {
  addToPlan(props.id)
  toast.success(`Added ${props.name} to plan!`)
}
</script>
