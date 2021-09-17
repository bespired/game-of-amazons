import { createStore, createLogger } from 'vuex'

import main  from './modules/main'

export default createStore({
	modules: {
		main,
	},
})