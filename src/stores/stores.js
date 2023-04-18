import { writable } from 'svelte/store';

function createTitle() {
	const {subscribe, set, update} = writable('');
	
	return {
		subscribe,
		set: (value) => {
			set(`XIV Market+ - ${value}`)
		},
		clear: () => {
			set('XIV Market');
		}
	}
}

export const title = createTitle();