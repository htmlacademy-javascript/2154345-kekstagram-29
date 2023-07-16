import { isEscapeKey, toggleModalClasses } from '../utils';
import { resetScale } from './scale';
import { validate, resetValidation } from './validation';
import { slider, resetEffects } from './effects';
import { form, wrapper } from './elements';

const closeForm = () => {
	form!.reset();
	resetScale();
	resetEffects();
};

form!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentKeydown);
});

form!.addEventListener('reset', () => {
	toggleModalClasses(wrapper!, false);
	document.removeEventListener('keydown', onDocumentKeydown);
	resetValidation();
});

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (validate()) {
		closeForm();
	}
});

function onDocumentKeydown(evt: KeyboardEvent) {
	const isFocusOnInputs = form!.hashtags === document.activeElement || form!.description === document.activeElement;

	if (isEscapeKey(evt) && !isFocusOnInputs) {
		closeForm();
	}
}
