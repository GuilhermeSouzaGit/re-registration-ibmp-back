import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/createUserToken";
import { User } from "../models/User";
import { UserService } from "../services/user.service";
import { Readable } from "stream";
import readline from "readline";

const userService = new UserService();

interface Excel {
	item: string;
	description: string;
	unity: number;
	quantity: number;
	condition: string;
	notes: string;
}

export class UserControllers {
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
		const userExist = await User.findOne({ email: email });

		if (userExist)
			return response
				.status(422)
				.json({ message: "Por favor, utilize outro e-mail!" });

		//create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		//create a user
		try {
			const newUser = await User.create({
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
		const user = await User.findOne({ email: email });

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

	async getAllUsers(request: Request, response: Response) {
		try {
			const users = await userService.getAll();

			response.status(200).json(users);
		} catch (error) {
			console.log(error);
		}
	}

	async changeRole(request: Request, response: Response) {
		const { id } = request.params;
		const { role } = request.body;

		if (!role)
			return response.status(400).json({
				message: "O campo 'role' não foi preenchido corretamente",
			});

		try {
			const updatedUser = await userService.findByIdAndUpdate(id, {
				role: role,
			});

			response.status(200).json(updatedUser);
		} catch (error) {
			console.log(error);
		}
	}

	async uploadSpreadsheetData(request: Request, response: Response) {
		const file = request.file;
		const buffer = file?.buffer;

		const readableFile = new Readable();
		readableFile.push(buffer);
		readableFile.push(null);

		const productsLine = readline.createInterface({
			input: readableFile,
		});

		const items: Excel[] = [];

		let isFirstLine = true;
		for await (const line of productsLine) {
			if (isFirstLine) {
				isFirstLine = false;
				continue; // Ignora a primeira linha
			}
			const productsLineSplit = line.split(";");
			// Verifica se a linha contém dados
			if (productsLineSplit.some((data) => data.trim() !== "")) {
				items.push({
					item: productsLineSplit[0],
					description: productsLineSplit[1],
					unity: Number(productsLineSplit[2]),
					quantity: Number(productsLineSplit[3]),
					condition: productsLineSplit[4],
					notes: productsLineSplit[5],
				});
			}
		}

		console.log(items);
		return response.json(items);
	}
}
