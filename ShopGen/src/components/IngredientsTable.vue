<template>
  <v-btn color="primary" variant="elevated" elevation="6" @click="getIngredients">
        Show Ingredients
        <v-dialog v-if="hasLoadedIngredients" v-model="isShowingIngredients" activator="parent" scrollable>
          <v-card width="336px" class="ma-auto">
            <v-card-title v-text="name" />
            <v-card-text style="max-height: 336px;">
              <v-table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quanitity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ingredient in ingredients">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.quantity }} {{ ingredient.unit }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="tonal" @click="isShowingIngredients = false">Close</v-btn>
              <v-btn v-if="!readonly" color="secondary" variant="tonal">Add To Plan</v-btn>
              <v-btn v-if="readonly" color="error" variant="tonal">Remove From Plan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
</template>

<script setup lang="ts">
import api from '@/api';
import Ingredient from '@/types/ingredient';
import { ref, computed } from 'vue';

const props = defineProps<{
  id: string,
  name: string,
  readonly?: boolean
}>()

const ingredients = ref([] as Ingredient[])
const hasLoadedIngredients = computed(() => ingredients.value)
const getIngredients = async () => ingredients.value = await api.getIngredients(props.id)

const isShowingIngredients = ref(false)
</script>
