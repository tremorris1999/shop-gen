<template>
      <v-img class="mb-8" :src="source" :max-height="maxHeight">
        <v-dialog v-model="isShowingConfirm" activator="parent">
          <v-card class="ma-auto" :width="192" :height="108">
            <v-card-title class="text-center">
              Delete Image?
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" @click="remove">Yes</v-btn>
              <v-btn @click="isShowingConfirm = false">No</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-img>
</template>

<script setup lang="ts">
import api from '@/api';
import { computed, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  maxHeight: {
    type: Number,
    requred: false
  }
})

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()

const source = computed(() => `${api.imageURL}/${props.src}`)
const isShowingConfirm = ref(false);
const remove = () => {
  isShowingConfirm.value = false;
  emit('remove', props.src)
}
</script>
