<template>
  <v-card width="378px" class="mx-auto">
    <v-card-title v-text="currentRecipe.name" />
    <v-card-text style="max-height: 464px;">
      <v-form>
        <v-text-field v-model="currentRecipe.name" label="Name" />
        <v-text-field v-model="currentRecipe.description" label="Description" />
        <template v-for="i in currentRecipe.ingredients">
          <v-row no-gutters>
            <v-col cols="4">
              <v-text-field class="field" v-model="i.name" label="Name" readonly :title="i.name" />
            </v-col>
            <v-col cols="3">
              <v-text-field class="field" v-model="i.quantity" label="#" readonly :title="i.quantity" />
            </v-col>
            <v-col cols="3">
              <v-text-field class="field" v-model="i.unit" label="Unit" readonly :title="i.unit" />
            </v-col>
            <v-col cols="2">
              <v-btn icon="mdi-delete" @click="removeIngredient(i)" />
            </v-col>
          </v-row>
        </template>
        <v-row no-gutters>
          <v-col cols="4">
            <v-combobox class="combobox" :items="allIngredientNames" v-model="currentIngredient.name" label="Name" />
          </v-col>
          <v-col cols="3">
            <v-text-field class="field" v-model="currentIngredient.quantity" label="#" />
          </v-col>
          <v-col cols="3">
            <v-text-field class="field" v-model="currentIngredient.unit" label="Unit" />
          </v-col>
          <v-col cols="2">
            <v-btn icon="mdi-content-save" @click="addIngredient()" />
          </v-col>
        </v-row>
        <v-row v-for="imageId in currentImageIds" justify="start">
          <Thumbnail :maxHeight="118" :src="imageId" @remove="queueImageDelete" />
        </v-row>
        <v-file-input v-model="images" label="Add Images..." variant="filled" prepend-icon="mdi-camera" accept="image/*"
          multiple />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="tonal" @click="save" :loading="isSaving">Save</v-btn>
      <v-btn color="secondary" variant="tonal" @click="cancel" :disabled="isSaving">Cancel</v-btn>
      <v-btn v-if="!newItem" color="error" variant="tonal" @click="remove" :disabled="isSaving">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import api from '@/api';
import useRecipes from '@/composables/recipes';
import Ingredient from '@/types/ingredient';
import Recipe from '@/types/recipe';
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import Thumbnail from './Thumbnail.vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  recipe?: Recipe
}>()

const emit = defineEmits<{
  (event: 'close'): void,
}>()

onBeforeMount(async () => {
  if (props.recipe)
  try {
    currentRecipe.value.ingredients = await api.getIngredients(props.recipe?.id)
  } catch (err: any) {
    toast.error('Unable to fetch ingredients.')
  }
})

onMounted(() => {
  currentImageIds.value = [...props.recipe?.imageIds ?? []]
})

const { recipes } = useRecipes()
const allIngredients = ref([] as Ingredient[])
const allIngredientNames = computed(() => allIngredients.value.map(i => i.name))
api.getAllIngredients().then(res => allIngredients.value = res)

const newItem = computed(() => !props.recipe)
const currentRecipe = ref({ ...props.recipe ?? Recipe() })
const currentIngredient = ref(Ingredient())
const currentImageIds = ref([] as string[])

const addIngredient = () => {
  currentRecipe.value.ingredients.splice(currentRecipe.value.ingredients.length, 0, currentIngredient.value)
  currentIngredient.value = Ingredient()
}

const removeIngredient = (ingredient: Ingredient) => {
  let index = currentRecipe.value.ingredients.indexOf(ingredient)
  if (index > -1)
    currentRecipe.value.ingredients.splice(index, 1)
}


const imageDeleteQueue = ref([] as string[])
const queueImageDelete = (id: string) => {
  imageDeleteQueue.value.push(id)
  const index = currentImageIds.value.findIndex(i => i === id)
  if (index > -1)
    currentImageIds.value.splice(index, 1)
}


const images = ref<File[]>([])
const isSaving = ref(false)

const cancel = () => {
  emit('close')
}

const save = async () => {
  isSaving.value = true
  const index = recipes.value.findIndex(r => r.id === currentRecipe.value.id ?? '')
  if (index > -1) {
    try {
      await api.putRecipe(currentRecipe.value)
      for (let i = 0; i < images.value.length; i++) {
        await api.postImage(currentRecipe.value.id, images.value[i])
      }

      for (let i = 0; i < imageDeleteQueue.value.length; i++) {
        await api.deleteImage(imageDeleteQueue.value[i])
      }

      currentRecipe.value.imageIds = await api.getImages(currentRecipe.value.id)
      recipes.value.splice(index, 1, currentRecipe.value)
      toast.success('Successfully updated recipe.')
    } catch {
      toast.error('Unable to update recipe.')
    }
  }
  else {
    try {
      currentRecipe.value.id = await api.postRecipe(currentRecipe.value)
      for (let i = 0; i < images.value.length; i++) {
        await api.postImage(currentRecipe.value.id, images.value[i])
      }

      currentRecipe.value.imageIds = await api.getImages(currentRecipe.value.id)
      recipes.value.splice(0, 0, currentRecipe.value)
      toast.success('Successfully added new recipe.')
    } catch {
      toast.error('Unable to save new recipe.')
    }
  }

  isSaving.value = false
  emit('close')
}

const remove = async () => {
  let index = recipes.value.findIndex(r => r.id === props.recipe?.id)
  if (index > -1) {
    try {
      await api.deleteRecipe(props.recipe?.id ?? '')
      recipes.value.splice(index, 1)
      toast.success('Successfully removed recipe.')
    } catch {
      toast.error('Unable to remove recipe.')
    }
  }

  emit('close')
}

</script>

<style scoped>
.combobox :deep() .v-combobox__selection {
  display: block;
  max-width: 70px;
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.field :deep() .v-field__input {
  display: block;
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
