import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	// importante el next para poder hacer la accion en este caso después de actualizar dicho estado.
	next(action);
	const state = store.getState();
	localStorage.setItem("__redux__state__", JSON.stringify(state));
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware],
});

// tipamos el store
export type RootState = ReturnType<typeof store.getState>;
// tipamos las acciones
export type AppDispatch = typeof store.dispatch;
