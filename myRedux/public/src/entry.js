import { createStore } from 'redux'

//reducer
function counter(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

//store
let store = createStore(counter)
store.subscribe(() => console.log(store.getState()))

store.dispatch({type: 'INCREMENT'});;
