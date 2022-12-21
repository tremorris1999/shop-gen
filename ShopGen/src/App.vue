<template>
  <v-app theme="dark">
    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-menu" @click.stop="toggleDrawer" />
      <v-app-bar-title>{{ currentRoute }}</v-app-bar-title>
      <v-spacer />
      <v-app-bar-nav-icon v-if="currentRoute === 'All Recipes'" @click="navigate('/plan')" >
        <v-badge v-if="planLength" :content="planLength" color="error">
          <v-icon icon="mdi-list-box" />
        </v-badge>
        <v-icon v-if="!planLength" icon="mdi-list-box" />
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="shouldShowDrawer" temporary>
      <v-list>
        <v-list-item v-for="route in availableRoutes" @click="navigate(route.path)" :active="route.name == currentRoute" color="primary">
          <template v-slot:prepend>
            <v-icon :icon="route.icon" />
          </template>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="mx-auto">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import routes from './routes';
import { useRouter } from 'vue-router';
import usePlan from './composables/plan';

const shouldShowDrawer = ref(false)
const toggleDrawer = () => shouldShowDrawer.value = !shouldShowDrawer.value

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.name)
const availableRoutes = routes.filter(route => route.name && route.icon)
const navigate = (path: string) => router.push(path)

const plan = usePlan()
const planLength = computed(() => {
  const length = plan.getPlanItems().length
  return length > 8 ? '9+' : length
})
</script>