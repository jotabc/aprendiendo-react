import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
});

// tipamos el store
export type RootState = ReturnType<typeof store.getState>;
// tipamos las acciones
export type AppDispatch = typeof store.dispatch;
