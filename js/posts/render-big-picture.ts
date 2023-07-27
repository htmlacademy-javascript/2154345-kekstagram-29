import { isEscapeKey, toggleModalClasses } from '../utils';
import { Photo } from '../contracts/common';
import { clearComments, renderComments } from './render-comments';
clearComments();

const bigPictureElement = document.querySelector<HTMLElement>('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
if (!bigPictureElement || !closeButtonElement) {
	throw new Error('Critical. Big picture or close button were not found.');
}

const bigPictureImageElement = bigPictureElement.querySelector<HTMLImageElement>('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector<HTMLElement>('.likes-count');
const bigPictureCommentsCountElement = bigPictureElement.querySelector<HTMLElement>('.comments-count');
const bigPictureCaptionElement = bigPictureElement.querySelector<HTMLElement>('.social__caption');
const commentLoaderButtonElement = document.querySelector<HTMLButtonElement>('.social__comments-loader');

if (!bigPictureImageElement || !bigPictureLikesElement || !bigPictureCommentsCountElement || !bigPictureCaptionElement || !commentLoaderButtonElement) {
	throw new Error('Critical big picture elements were not found.');
}

const renderBigPicture = ({ url, description, likes, comments }: Photo) => {
	bigPictureImageElement.src = url;
	bigPictureLikesElement.textContent = likes.toString();
	bigPictureCommentsCountElement.textContent = comments.length.toString();
	bigPictureCaptionElement.textContent = description;

	renderComments(comments);
};

const openModal = (photo: Photo) => {
	toggleModalClasses(bigPictureElement);
	renderBigPicture(photo);
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
	toggleModalClasses(bigPictureElement, false);
	clearComments();
	document.removeEventListener('keydown', onDocumentKeydown);
};

const onModalCloseButtonClick = closeModal;

closeButtonElement.addEventListener('click', onModalCloseButtonClick);

function onDocumentKeydown(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeModal();
	}
}

export { openModal };
