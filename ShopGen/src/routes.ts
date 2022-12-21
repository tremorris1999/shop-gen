import { DefineComponent, ComponentOptionsMixin, ExtractPropTypes, VNodeProps, AllowedComponentProps, ComponentCustomProps} from 'vue'
declare type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps

import HomePage from '@/pages/HomePage.vue'
import AllRecipesPage from '@/pages/AllRecipesPage.vue'
import PlanPage from '@/pages/PlanPage.vue'



export interface IRoute {
  name: string | undefined,
  path: string,
  redirect: string | undefined,
  component: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}> | undefined,
  icon: string | undefined
}

export default [
  { path: '/', redirect: '/home' },
  { name: 'Home', path: '/home', component: HomePage, icon: 'mdi-home' },
  { name: 'All Recipes', path: '/recipes', component: AllRecipesPage, icon: 'mdi-bowl-mix' },
  { name: 'My Plan', path: '/plan', component: PlanPage, icon: 'mdi-list-box' },
  { name: 'Settings', path: '/settings', icon: 'mdi-cog'}
] as IRoute[]
