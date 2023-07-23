import { image, imagePreviews } from './elements';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const loadPreview = (file: File) => {
	const fileName = file.name.toLowerCase();
	const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
	if (!matches) {
		return;
	}

	const fileURL = URL.createObjectURL(file);

	image!.src = fileURL;
	imagePreviews.forEach((preview) => {
		preview.style.backgroundImage = `url(${fileURL})`;
	});
};

export { loadPreview };
