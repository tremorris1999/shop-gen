<template>
  <v-card
    class="mt-4 pa-0"
    width="336px"
    :variant="isChecked ? 'elevated' : 'outlined'"
    elevation="3"
  >
    <v-row id="item-row" class="mx-1 pt-2">
      <v-col cols="1" class="pb-n2">
        <v-checkbox v-model="isChecked" />
      </v-col>
      <v-col cols="8" class="px-4 pt-4">
        <div id="name" :class="isChecked ? 'text-decoration-line-through' : ''">
          {{ listItem.ingredient.name }}
        </div>
      </v-col>
      <v-col cols="3" class="pt-4 pr-2 text-right">
        {{ listItem.ingredient.quantity }}
        <span class="text-caption text-medium-emphasis mx-1"> x </span>
        {{ listItem.ingredient.unit }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import ShoppingListItem from '@/types/shoppingListItem'
import { PropType, ref, watch } from 'vue'
import useShoppingList from '@/composables/shoppingList'

const props = defineProps({
  listItem: {
    type: Object as PropType<ShoppingListItem>,
    required: true,
  },
})

const isChecked = ref(false)

const { setActive, setInactive } = useShoppingList()

watch(isChecked, newValue => {
  if (newValue) {
    setInactive(props.listItem.ingredient.id)
  } else {
    setActive(props.listItem.ingredient.id)
  }
})
</script>

<style scoped>
#item-row :deep() .v-input {
  max-width: 25px;
}

#item-row :deep() .v-col {
  padding-left: 0px;
  max-height: 64px;
}

#item-row :deep() .v-checkbox .v-selection-control {
  max-height: 34px;
}

#name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
