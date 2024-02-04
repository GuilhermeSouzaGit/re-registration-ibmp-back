import { Request, Response } from "express";
import { Members } from "../models/Members";
import { v2 as cloudinary } from "cloudinary";

export class MembersController {
	async register(request: Request, response: Response) {
		const bodyData = { ...request.body };
		const file = request.file;

		try {
			const newMember = await Members.create(bodyData);

			console.log(newMember);

			let imageUrls = "";

			if (file) {
				const buffer = file.buffer;
				const uniqueSuffix = Math.round(Math.random() * 1e9);
				const filename = `${newMember.id}-${uniqueSuffix}`;

				const uploadPromise = new Promise<void>((resolve, reject) => {
					cloudinary.uploader
						.upload_stream(
							{
								folder: `member-${newMember.name}-${newMember.id}`,
								public_id: filename,
							},
							(error, result) => {
								if (error) {
									console.error(
										"Erro ao fazer o upload da imagem:",
										error,
									);
									response.status(500).json({
										message: "Erro no upload da imagem",
										error: error.message,
									});
									reject(error);
								} else {
									const imageUrl = result!.url;
									console.log(imageUrl);
									imageUrls = imageUrl;
									resolve();
								}
							},
						)
						.end(buffer);
				});
				await uploadPromise;
			} else {
				return response
					.status(400)
					.json({ message: "Nenhum arquivo foi enviado" });
			}
			try {
				newMember.memberPhoto = imageUrls;
				await newMember.save();
				return response.status(203).json({
					message: "Membro adicionado com sucesso!",
					newMember: newMember,
				});
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error, "Erro no controller");
		}
	}

	async getAllMembers(request: Request, response: Response) {
		try {
			const members = await Members.find().sort("-createdAt");

			response.status(200).json(members);
		} catch (error) {
			console.log(error);
		}
	}
}
