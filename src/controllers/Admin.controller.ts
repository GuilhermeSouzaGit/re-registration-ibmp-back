import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/createUserToken";
import { Admin } from "../models/Admin";

export class AdminControllers {
	async register(request: Request, response: Response) {
		const { name, email, password, confirmPassword } = request.body;

		//validations
		if (!name)
			return response
				.status(422)
				.json({ message: "O nome é obrigatório!" });
		if (!email)
			return response
				.status(422)
				.json({ message: "O e-mail é obrigatório!" });
		if (!password)
			return response
				.status(422)
				.json({ message: "A senha é obrigatória!" });
		if (password !== confirmPassword)
			return response
				.status(422)
				.json({ message: "As senhas não conferem!" });

		//check if user already exist
		const userExist = await Admin.findOne({ email: email });

		if (userExist)
			return response
				.status(422)
				.json({ message: "Por favor, utilize outro e-mail!" });

		//create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		//create a user
		try {
			const newUser = await Admin.create({
				name,
				email,
				password: passwordHash,
			});
			await createUserToken(newUser, request, response);

			console.log(newUser);
		} catch (error) {
			response.status(500).json({ message: error });
		}
	}

	async login(request: Request, response: Response) {
		const { email, password } = request.body;

		if (!email)
			return response
				.status(422)
				.json({ message: "O e-mail é obrigatório" });
		if (!password)
			return response
				.status(422)
				.json({ message: "A senha é obrigatória" });

		//check if user exists
		const user = await Admin.findOne({ email: email });

		if (!user)
			return response
				.status(422)
				.json({ message: "Não há usuário cadastrado com este e-mail" });

		//check if password match with db password
		const checkPassword = await bcrypt.compare(password, user.password);

		if (!checkPassword)
			return response.status(422).json({ message: "Senha incorreta" });

		await createUserToken(user, request, response);
	}
}
