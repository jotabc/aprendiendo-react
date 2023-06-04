import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";

export function CreateNewUser() {
	const { addUser } = useUsersActions();
	const [result, setResult] = useState<"ko" | "ok" | null>(null);

	// event: React.FormEvent<HTMLFormEvent>
	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setResult(null);

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mt-4">
			<Title>Create New User</Title>

			<form className="" onSubmit={handleSubmit}>
				<TextInput
					className="mt-4 mb-4"
					name="name"
					placeholder="Aquí el nombre"
				/>
				<TextInput className="mb-4" name="email" placeholder="Aquí el email" />
				<TextInput
					className="mb-4"
					name="github"
					placeholder="Aquí el usuario de Github"
				/>
				<div>
					<Button className="mt-4" type="submit">
						Crear usuario
					</Button>
					<span className="ml-4">
						{result === "ok" && (
							<Badge color="green">Guradado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
