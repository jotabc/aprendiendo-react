import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;
export const { deleteUserById } = usersSlice.actions;