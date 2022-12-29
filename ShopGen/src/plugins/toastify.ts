import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const toastify = Vue3Toastify
const options: ToastContainerOptions = {
  autoClose: 2500,
  closeOnClick: true,
  closeButton: false,
}

export default {
  toastify,
  options,
}
