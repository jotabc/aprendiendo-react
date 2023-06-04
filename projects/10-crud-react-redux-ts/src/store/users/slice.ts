import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		email: "peter@gmail.com",
		github: "haakon",
		name: "Peter Doe",
	},
	{
		id: "2",
		email: "jonhdow@gmail.com",
		github: "leo",
		name: "John Doe",
	},
	{
		id: "3",
		name: "Juan Lopez",
		email: "juan@gmail.com",
		github: "mdo",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

// closure
const initialState: UserWithId[] = (() => {
	const persistedState = window.localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			// lo que se hace normalmente en redux, es crear un nuevo estado a partir del anterior.
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById } = usersSlice.actions;
