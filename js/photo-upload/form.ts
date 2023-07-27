import { isEscapeKey, toggleModalClasses } from '../utils';
import { resetScale } from './scale';
import { validate, resetValidation } from './validation';
import { resetEffects } from './effects';
import { formElement, wrapperElement, submitButtonElement } from './elements';
import { sendData } from '../fetch/api';
import { showStatus } from '../fetch/status';
import { loadPreview } from './load-preview';

if (!formElement) {
	throw new Error('Critical form element were not found');
}

const closeForm = () => formElement!.reset();

formElement!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapperElement!);
	document.addEventListener('keydown', onDocumentKeydown);
	const file = formElement!.filename.files![0];
	loadPreview(file);
});

formElement!.addEventListener('reset', () => {
	toggleModalClasses(wrapperElement!, false);
	document.removeEventListener('keydown', onDocumentKeydown);
	resetValidation();
	resetScale();
	resetEffects();
});

const blockSubmitButton = () => {
	submitButtonElement!.disabled = true;
	submitButtonElement!.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
	submitButtonElement!.disabled = false;
	submitButtonElement!.textContent = 'Опубликовать';
};

formElement!.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (validate()) {
		const formData = new FormData(formElement!);
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
	const isFocusOnInputs = formElement!.hashtags === document.activeElement || formElement!.description === document.activeElement;
	const isErrorOpened = Boolean(document.querySelector('.error'));

	if (isEscapeKey(evt) && !isFocusOnInputs && !isErrorOpened) {
		closeForm();
	}
}
