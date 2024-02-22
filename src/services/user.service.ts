import { User } from "../models/User";
// import { IUser } from "../types/User";

export class UserService {
	async getAll() {
		const users = await User.find().sort("-createdAt");
		return users;
	}

	async findById(id: string) {
		return await User.findById(id);
	}

	async findByIdAndUpdate(id: string, query: object) {
		return await User.findByIdAndUpdate(id, query, {
			new: true,
		});
	}
}
