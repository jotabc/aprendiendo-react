import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { UserWithId, rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		// importante el next para poder hacer la accion en este caso después de actualizar dicho estado.
		next(action);
		const state = store.getState();
		localStorage.setItem("__redux__state__", JSON.stringify(state));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();

	next(action);
	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === userIdToRemove,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
				}
				// throw new Error("Error al eliminar el usuario"); para que pete
			})
			.catch((_) => {
				toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabase],
});

// tipamos el store
export type RootState = ReturnType<typeof store.getState>;
// tipamos las acciones
export type AppDispatch = typeof store.dispatch;
