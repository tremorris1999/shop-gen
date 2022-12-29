import { ref } from 'vue'

const plan = ref(localStorage.getItem('shopgen-my-plan')?.split(',') || [])

const getPlanItems = () => [...plan.value]
const clearPlan = () => {
  plan.value = []
  localStorage.setItem('shopgen-my-plan', plan.value.join(','))
}

const addToPlan = (id: string) => {
  plan.value.splice(plan.value.length, 0, id)
  localStorage.setItem('shopgen-my-plan', plan.value.join(','))
}

const removeFromPlan = (id: string) => {
  const index = plan.value.findIndex(recipeId => recipeId === id)
  if (index > -1) plan.value.splice(index, 1)

  localStorage.setItem('shopgen-my-plan', plan.value.join(','))
}

export const usePlan = () => {
  return {
    getPlanItems,
    addToPlan,
    removeFromPlan,
    clearPlan,
  }
}

export default usePlan
