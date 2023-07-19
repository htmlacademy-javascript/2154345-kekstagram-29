import { isEscapeKey, toggleModalClasses } from '../utils';
import { resetScale } from './scale';
import { validate, resetValidation } from './validation';
import { resetEffects } from './effects';
import { form, wrapper } from './elements';
import { sendData } from '../clisrv/api';

const uploadingForm = document.querySelector<HTMLFormElement>('.img-upload__form');

const closeForm = () => form!.reset();

form!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentKeydown);
});

form!.addEventListener('reset', () => {
	toggleModalClasses(wrapper!, false);
	document.removeEventListener('keydown', onDocumentKeydown);
	resetValidation();
	resetScale();
	resetEffects();
});

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (validate()) {
		const formData = new FormData(uploadingForm!);
		sendData(formData);
		closeForm();
	}
});

function onDocumentKeydown(evt: KeyboardEvent) {
	const isFocusOnInputs = form!.hashtags === document.activeElement || form!.description === document.activeElement;

	if (isEscapeKey(evt) && !isFocusOnInputs) {
		closeForm();
	}
}
