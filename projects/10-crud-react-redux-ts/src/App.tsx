import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers";

export function App() {
	return (
		<>
			<h1 className="text-3xl font-bold underline mb-4">
				React + Redux Toolkit Crud
			</h1>
			<ListOfUsers />
			<CreateNewUser />
		</>
	);
}
