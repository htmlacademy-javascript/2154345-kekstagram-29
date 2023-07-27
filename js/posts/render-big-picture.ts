import { isEscapeKey, toggleModalClasses } from '../utils';
import { Photo } from '../contracts/common';
import { clearComments, renderComments } from './render-comments';
clearComments();

const bigPicture = document.querySelector<HTMLElement>('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
if (!bigPicture || !closeButton) {
	throw new Error('Critical. Big picture or close button were not found.');
}

const bigPictureImage = bigPicture.querySelector<HTMLImageElement>('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector<HTMLElement>('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector<HTMLElement>('.comments-count');
const bigPictureCaption = bigPicture.querySelector<HTMLElement>('.social__caption');
const commentLoaderButton = document.querySelector<HTMLButtonElement>('.social__comments-loader');

if (!bigPictureImage || !bigPictureLikes || !bigPictureCommentsCount || !bigPictureCaption || !commentLoaderButton) {
	throw new Error('Critical big picture elements were not found.');
}

const renderBigPicture = ({ url, description, likes, comments }: Photo) => {
	bigPictureImage.src = url;
	bigPictureLikes.textContent = likes.toString();
	bigPictureCommentsCount.textContent = comments.length.toString();
	bigPictureCaption.textContent = description;

	renderComments(comments);
};

const openModal = (photo: Photo) => {
	toggleModalClasses(bigPicture);
	renderBigPicture(photo);
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
	toggleModalClasses(bigPicture, false);
	clearComments();
	document.removeEventListener('keydown', onDocumentKeydown);
};

const onModalCloseButtonClick = closeModal;

closeButton.addEventListener('click', onModalCloseButtonClick);

function onDocumentKeydown(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeModal();
	}
}

export { openModal };
