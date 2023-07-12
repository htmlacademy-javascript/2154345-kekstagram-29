import { isEscapeKey } from './utils';
import { OverlayInput } from './contracts/common';

const form = document.querySelector('.img-upload__form')!;
const uploadInput = form.querySelector<HTMLInputElement>('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const overlayInputs: OverlayInput[] = form.querySelectorAll('.text__field');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const pristine = new Pristine(form, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextTag: 'span',
	errorTextClass: 'text__error'
});

if (!uploadInput || !overlay || !closeButton) {
	throw new Error('Critical form elements were not found.');
}

overlayInputs.forEach((field) => field.addEventListener('keydown', onTextFieldKeydown));


const toggleModalClasses = (willBeOpened = true) => {
	overlay.classList.toggle('hidden', !willBeOpened);
	document.body.classList.toggle('modal-open', willBeOpened);
};

const onUploadInputChange = () => {
	toggleModalClasses(true);
	document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', onUploadInputChange);

const closeModal = () => {
	toggleModalClasses(false);
	uploadInput.value = '';
	pristine.reset();
};

closeButton.addEventListener('click', closeModal);

function onDocumentKeydown(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeModal();
	}
}

function onTextFieldKeydown(evt: KeyboardEvent) {
	evt.stopPropagation();
}

const normalizeTags = (hashtags: string) => hashtags
	.trim()
	.toLowerCase()
	.split(' ')
	.filter((tag) => Boolean(tag.length));

const isHashtagValid = (hashtagString: string) => {
	const firststep = hashtagString[0] === '#';
	const secondstep = /^[A-Za-zА-Яа-я0-9]*$/.test(hashtagString.slice(1, -1));
	const thirdstep = hashtagString.length <= 20;

	return firststep && secondstep && thirdstep;
};

const areHashtagsValid = (hashtagString: string) => {
	const hashtags = normalizeTags(hashtagString);

	return hashtags.every(isHashtagValid);
};

const areHashtagsUnique = (hashtagString: string) => {
	const hashtags = normalizeTags(hashtagString);
	const hashtagsSet = new Set(hashtags);

	return hashtagsSet.size === hashtags.length;
};

const isHashtagsAmountValid = (hashtagString: string) => {
	const hashtags = normalizeTags(hashtagString);

	return hashtags.length <= 5;
};

pristine.addValidator(
	hashtagsInput,
	areHashtagsValid,
	'Введён невалидный хэш-тег',
	1
);

pristine.addValidator(
	hashtagsInput,
	areHashtagsUnique,
	'Хэш-теги повторяются.',
	2
);

pristine.addValidator(
	hashtagsInput,
	isHashtagsAmountValid,
	'Превышено количество хэш-тегов',
	3
);

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
