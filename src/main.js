import { createApp } from 'vue'
import App from '@/App.vue'

import router  from '@/router.js'
import global  from '@/global.js'

import store   from '@/shared/stores' // load index.js from /stores
import keydown from '@/shared/directives/windowKeyDown.js'


const app = createApp(App)
	.use(router)
	.use(store)
	.directive('keydown', keydown)

app.mount('#app')


