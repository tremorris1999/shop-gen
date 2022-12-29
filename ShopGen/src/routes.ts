import {
  DefineComponent,
  ComponentOptionsMixin,
  ExtractPropTypes,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  MethodOptions,
  EmitsOptions,
} from 'vue'
declare type PublicProps = VNodeProps &
  AllowedComponentProps &
  ComponentCustomProps

import HomePage from '@/pages/HomePage.vue'
import AllRecipesPage from '@/pages/AllRecipesPage.vue'
import PlanPage from '@/pages/PlanPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import MyRecipesPage from '@/pages/MyRecipes.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

export interface IRoute {
  name: string | undefined
  path: string
  redirect: string | undefined
  component:
    | DefineComponent<
        object,
        object,
        object,
        ComponentOptionsMixin,
        MethodOptions,
        ComponentOptionsMixin,
        ComponentOptionsMixin,
        EmitsOptions,
        string,
        PublicProps,
        Readonly<ExtractPropTypes<object>>,
        object
      >
    | undefined
  icon: string | undefined
  loggedIn: boolean | undefined
}

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
] as IRoute[]
