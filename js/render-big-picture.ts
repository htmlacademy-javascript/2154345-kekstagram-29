import { isEscapeKey } from './utils';
import { Photo } from './contracts/common';
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

const toggleModalClasses = (willBeOpened = true) => {
	bigPicture.classList.toggle('hidden', !willBeOpened);
	document.body.classList.toggle('modal-open', willBeOpened);
};

const openModal = (photo: Photo) => {
	toggleModalClasses(true);
	renderBigPicture(photo);
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
	toggleModalClasses(false);
	clearComments();
	document.removeEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeModal);

function onDocumentKeydown(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeModal();
	}
}

export { openModal };
