import { imageElement, imagePreviewElements } from './elements';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const loadPreview = (file: File) => {
	const fileName = file.name.toLowerCase();
	const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
	if (!matches) {
		return;
	}

	const fileURL = URL.createObjectURL(file);

	imageElement!.src = fileURL;
	imagePreviewElements.forEach((preview) => {
		preview.style.backgroundImage = `url(${fileURL})`;
	});
};

export { loadPreview };
