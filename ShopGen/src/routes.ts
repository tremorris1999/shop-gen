import { DefineComponent, ComponentOptionsMixin, ExtractPropTypes, VNodeProps, AllowedComponentProps, ComponentCustomProps} from 'vue'
declare type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps

import HomePage from '@/pages/HomePage.vue'
import AllRecipesPage from '@/pages/AllRecipesPage.vue'
import PlanPage from '@/pages/PlanPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import MyRecipesPage from '@/pages/MyRecipes.vue'



export interface IRoute {
  name: string | undefined,
  path: string,
  redirect: string | undefined,
  component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}> | undefined,
  icon: string | undefined
  loggedIn: boolean | undefined
}

export default [
  { path: '/', redirect: '/home' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { name: 'Home', path: '/home', component: HomePage, icon: 'mdi-home' },
  { name: 'All Recipes', path: '/recipes', component: AllRecipesPage, icon: 'mdi-bowl-mix' },
  { name: 'My Recipes', path: '/myrecipes', component: MyRecipesPage, icon: 'mdi-chef-hat', loggedIn: true },
  { name: 'My Plan', path: '/plan', component: PlanPage, icon: 'mdi-list-box' },
  { name: 'Settings', path: '/settings', icon: 'mdi-cog' },
] as IRoute[]
