import { isEscapeKey, toggleModalClasses } from '../utils';
import { resetScale } from './scale';
import { validate, resetValidation } from './validation';
import { resetEffects } from './effects';
import { form, wrapper, image, submitButton } from './elements';
import { sendData } from '../fetch/api';
import { showStatus } from '../fetch/status';

const uploadingForm = document.querySelector<HTMLFormElement>('.img-upload__form');

const closeForm = () => form!.reset();

form!.filename.addEventListener('change', (evt) => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentKeydown);
	const tgt = evt.target as HTMLInputElement;
	const files = tgt!.files;

	if (FileReader && files && files.length) {
		const fr = new FileReader();
		fr.onload = () => showImage(fr);
		fr.readAsDataURL(files[0]);
	}
});

function showImage(fileReader: FileReader) {
	image!.src = fileReader.result as string;
}

form!.addEventListener('reset', () => {
	toggleModalClasses(wrapper!, false);
	document.removeEventListener('keydown', onDocumentKeydown);
	resetValidation();
	resetScale();
	resetEffects();
});

const blockSubmitButton = () => {
	submitButton!.disabled = true;
	submitButton!.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
	submitButton!.disabled = false;
	submitButton!.textContent = 'Опубликовать';
};

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (validate()) {
		const formData = new FormData(uploadingForm!);
		blockSubmitButton();
		sendData(formData)
			.then((data) => {
				showStatus('success');
				closeForm();
				unblockSubmitButton();
			})
			.catch((err) => {
				showStatus('error');
				unblockSubmitButton();
			});
	}
});

function onDocumentKeydown(evt: KeyboardEvent) {
	const isFocusOnInputs = form!.hashtags === document.activeElement || form!.description === document.activeElement;
	const isErrorOpened = Boolean(document.querySelector('.error'));

	if (isEscapeKey(evt) && !isFocusOnInputs && !isErrorOpened) {
		closeForm();
	}
}
