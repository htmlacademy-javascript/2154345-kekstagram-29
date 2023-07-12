import { isEscapeKey } from './utils';
import { OverlayInput } from './contracts/common';
import { clearScale } from './scale';

const form = document.querySelector('.img-upload__form')!;
const uploadInput = form.querySelector<HTMLInputElement>('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const overlayInputs: OverlayInput[] = form.querySelectorAll('.text__field');

const REGEX = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const	MAX_HASHTAG_AMOUNT = 5;

const enum ErrorMessages {
	INVALID_SYMBOLS = 'Введён невалидный хэш-тег.',
	INVALID_REPEATNESS = 'Хэш-теги повторяются.',
	INVALID_AMOUNT = `Максимум ${MAX_HASHTAG_AMOUNT} хэш-тегов.`
}

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

// Test
onUploadInputChange();

uploadInput.addEventListener('change', onUploadInputChange);

const closeModal = () => {
	toggleModalClasses(false);
	uploadInput.value = '';
	pristine.reset();
	clearScale();
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

const isHashtagValid = (hashtagString: string) => REGEX.test(hashtagString);

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

	return hashtags.length <= MAX_HASHTAG_AMOUNT;
};

pristine.addValidator(
	hashtagsInput,
	areHashtagsValid,
	ErrorMessages.INVALID_SYMBOLS,
	1,
	true
);

pristine.addValidator(
	hashtagsInput,
	areHashtagsUnique,
	ErrorMessages.INVALID_REPEATNESS,
	2,
	true
);

pristine.addValidator(
	hashtagsInput,
	isHashtagsAmountValid,
	ErrorMessages.INVALID_AMOUNT,
	3,
	true
);

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
