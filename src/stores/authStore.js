import { writable } from 'svelte/store'

export const userStore = writable({
	user: null,

	loading: false,
})

export const toggleUserLoading = () => {
	userStore.update((curr) => ({ ...curr, loading: !curr.loading }))
}

export const updateUser = (user) => {
	userStore.update((curr) => ({ ...curr, user: { ...user } }))
}

export default userStore
