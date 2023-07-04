import { isEscapeKey } from './utils';
import { Photo, Comments } from './contracts/common';
import { clearComments, renderComments } from './render-comments';

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

const onDocumentKeydown = (evt: KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeBigPicture();
	}
};

let comments: Comments;

const renderBigPicture = (pictureData: Photo) => {
	if (!pictureData) {
		throw new Error('Critical user data not found.');
	}
	bigPicture.classList.remove('hidden');
	document.body.classList.add('modal-open');

	bigPictureImage.src = pictureData.url;
	bigPictureLikes.textContent = pictureData.likes.toString();
	bigPictureCommentsCount.textContent = pictureData.comments.length.toString();
	bigPictureCaption.textContent = pictureData.description;

	comments = renderComments(pictureData.comments);

	clearComments();
	comments();
	commentLoaderButton.addEventListener('click', comments);

	document.addEventListener('keydown', onDocumentKeydown);
	closeButton.addEventListener('click', closeBigPicture);
};

function closeBigPicture() {
	bigPicture!.classList.add('hidden');
	document.body.classList.remove('modal-open');
	commentLoaderButton?.removeEventListener('click', comments);
}

export { renderBigPicture };
