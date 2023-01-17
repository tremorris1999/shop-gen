import HomePage from '@/pages/HomePage.vue'
import AllRecipesPage from '@/pages/AllRecipesPage.vue'
import PlanPage from '@/pages/PlanPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import MyRecipesPage from '@/pages/MyRecipes.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import ShoppingListPage from '@/pages/ShoppingListPage.vue'

export const Route = () => ({
  icon: '',
  loggedIn: false,
})

export type Route = ReturnType<typeof Route>

export default [
  { path: '/', redirect: '/home' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { name: 'Home', path: '/home', component: HomePage, icon: 'mdi-home' },
  {
    name: 'All Recipes',
    path: '/recipes',
    component: AllRecipesPage,
    icon: 'mdi-bowl-mix',
  },
  {
    name: 'My Recipes',
    path: '/myrecipes',
    component: MyRecipesPage,
    icon: 'mdi-chef-hat',
    loggedIn: true,
  },
  {
    name: 'My Favorites',
    path: '/myfavorites',
    component: FavoritesPage,
    icon: 'mdi-heart',
    loggedIn: true,
  },
  { name: 'My Plan', path: '/plan', component: PlanPage, icon: 'mdi-list-box' },
  {
    name: 'Settings',
    path: '/settings',
    component: SettingsPage,
    icon: 'mdi-cog',
  },
  {
    name: 'My Shopping List',
    path: '/mylist',
    component: ShoppingListPage,
    icon: 'mdi-home',
  },
]
