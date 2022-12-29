<template>
  <v-container>
    <v-card width="336px">
      <v-table>
        <thead>
          <tr>
            <th> Setting </th>
            <th> Value </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Theme </td>
            <td>
              <v-switch v-model="isDarkTheme" prepend-icon="mdi-weather-sunny">
                <template v-slot:label>
                  <v-icon icon="mdi-weather-night" />
                </template>
              </v-switch>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useTheme from '@/composables/theme'

const currentTheme = useTheme()
const isDarkTheme = ref(currentTheme.getTheme() === 'dark')

watch(isDarkTheme, async newValue => {
  if (newValue)
    currentTheme.setTheme('dark')
  else
    currentTheme.setTheme('light')
})
</script>