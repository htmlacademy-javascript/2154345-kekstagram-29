import { isEscapeKey } from './utils';
import { Photo } from './contracts/common';
import { clearComments, renderComments } from './render-comments';

const bigPicture = document.querySelector<HTMLElement>('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
if (!bigPicture || !closeButton) {
	throw new Error('Critical. Big picture elements not found.');
}

const onDocumentKeydown = (evt: KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeBigPicture();
	}
};

const renderBigPicture = (pictureData: Photo) => {
	if (!pictureData) {
		throw new Error('Critical. User data not found.');
	}
	bigPicture.classList.remove('hidden');
	document.body.classList.add('modal-open');

	bigPicture.querySelector<HTMLImageElement>('.big-picture__img img')!.src = pictureData.url;
	bigPicture.querySelector<HTMLElement>('.likes-count')!.textContent = pictureData.likes.toString();
	bigPicture.querySelector<HTMLElement>('.comments-count')!.textContent = pictureData.comments.length.toString();
	bigPicture.querySelector<HTMLElement>('.social__caption')!.textContent = pictureData.description;

	clearComments();
	renderComments(pictureData.comments);

	document.addEventListener('keydown', (evt) => onDocumentKeydown(evt));
	closeButton.addEventListener('click', closeBigPicture);
};

document.addEventListener('keydown', onDocumentKeydown);

function closeBigPicture() {
	bigPicture!.classList.add('hidden');
	document.body.classList.remove('modal-open');
	document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt));
	closeButton!.removeEventListener('click', closeBigPicture);
}

export { renderBigPicture };
