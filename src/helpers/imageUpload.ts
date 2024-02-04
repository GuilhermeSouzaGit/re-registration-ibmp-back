import multer from "multer";

const imageUpload = () => {
	const storage = multer.memoryStorage();

	return multer({ storage: storage });
};

export { imageUpload };
