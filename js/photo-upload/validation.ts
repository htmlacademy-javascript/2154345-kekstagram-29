import { formElement } from './elements';
import Pristine from 'pristinejs';

const hashtagsInput = formElement!.hashtags;

const REGEX = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const enum Hashtags {
	MaxCount = 5,
	MaxCountError = 'Нельзя указать больше пяти хэш-тегов',
	UniqueError = 'Хэш-теги не должны повторяться',
	HashtagSharpError = 'Хэш-тег должен начинаться с #',
	LengthError = 'Хэш-тег должен быть не больше 20 символов',
	CharactersError = 'Хэш-тег может содержать только буквы и цифры',
	OnlySharpError = 'Хэш-тег не может состоять только из одной решетки'
}

const pristine = new Pristine(formElement, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextTag: 'span',
	errorTextClass: 'text__error'
});

let hashtagsError = '';

const normalizeTags = (hashtags: string) => hashtags
	.trim()
	.toLowerCase()
	.split(' ')
	.filter((tag) => Boolean(tag.length));

const areHashtagsUnique = (hashtags: string[]) => {
	const hashtagsSet = new Set(hashtags);
	return hashtagsSet.size === hashtags.length;
};

const validateHashtags = (value: string) => {
	if (value.length === 0) {
		return true;
	}

	const hashtags = normalizeTags(value);

	if (hashtags.length > Hashtags.MaxCount) {
		hashtagsError = Hashtags.MaxCountError;
		return false;
	}

	if (!areHashtagsUnique(hashtags)) {
		hashtagsError = Hashtags.UniqueError;
		return false;
	}

	return hashtags.every((hashtag) => {
		if (hashtag[0] !== '#') {
			hashtagsError = Hashtags.HashtagSharpError;
			return false;
		}

		if (hashtag.length > 20) {
			hashtagsError = Hashtags.LengthError;
			return false;
		}

		if (hashtag === '#') {
			hashtagsError = Hashtags.OnlySharpError;
			return false;
		}

		if (!REGEX.test(hashtag)) {
			hashtagsError = Hashtags.CharactersError;
			return false;
		}

		return true;
	});
};

pristine.addValidator(
	hashtagsInput,
	validateHashtags,
	() => hashtagsError
);

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();

formElement!.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});

export { validate, resetValidation };
