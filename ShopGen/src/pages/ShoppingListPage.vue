<template>
  <v-container>
    <v-card v-if="!hasItems" width="336px">
      <v-card-text class="text-center">
        You haven't generated a list from your plan.
        <span v-if="!hasPlanItems">
          Add a recipe to your plan to generate your list.</span
        >
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="navigate('/plan')"
          >See Plan</v-btn
        >
        <v-btn
          color="secondary"
          :disabled="!hasPlanItems"
          variant="tonal"
          @click="generateList"
          >Generate List</v-btn
        >
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-row justify="center">
      <v-btn
        v-if="hasItems"
        color="error"
        class="mt-3 mb-4 mx-2"
        variant="outlined"
        @click="clearList"
      >
        Clear List
      </v-btn>
    </v-row>
    <ShoppingListItem
      v-for="(item, index) in shoppingListItems"
      :key="index"
      :list-item="item"
    />
  </v-container>
</template>

<script setup lang="ts">
import ShoppingListItem from '@/components/ShoppingListItem.vue'
import usePlan from '@/composables/plan'
import useShoppingList from '@/composables/shoppingList'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { shoppingListItems, clearList, generateList } = useShoppingList()
const hasItems = computed(() => !!shoppingListItems.value.length)

const { plan } = usePlan()
const hasPlanItems = computed(() => !!plan.value.length)

const router = useRouter()
const navigate = (path: string) => router.push(path)
</script>
