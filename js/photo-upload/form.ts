import { isEscapeKey, toggleModalClasses } from '../utils';
import { resetScale } from './scale';
import { validate, resetValidation } from './validation';
import { resetEffects } from './effects';
import { form, wrapper, submitButton } from './elements';
import { sendData } from '../fetch/api';
import { showStatus } from '../fetch/status';
import { loadPreview } from './load-preview';

const uploadingForm = document.querySelector<HTMLFormElement>('.img-upload__form');

if (!form) {
	throw new Error('Critical form element were not found');
}

const closeForm = () => form!.reset();

form!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentKeydown);
	const file = form!.filename.files![0];
	loadPreview(file);
});

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
			.then(() => {
				showStatus('success');
				closeForm();
				unblockSubmitButton();
			})
			.catch(() => {
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
