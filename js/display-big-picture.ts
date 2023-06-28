import { isEscapeKey } from './utils';
import { Description, Comment } from './mock';

const bigPicture = document.querySelector<HTMLElement>('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const body = document.querySelector('body');
if (!bigPicture || !closeButton || !body || !commentCounter || !commentLoaderButton) {
	throw new Error('Critical. Big picture elements not found.');
}


const displayComments = (comments: Comment[]) => {
	const commentsListFragment = document.createDocumentFragment();
	const commentTemplate = document.querySelector<HTMLTemplateElement>('#comment')?.content.querySelector<HTMLElement>('.social__comment');
	const commentsListElement = bigPicture!.querySelector<HTMLElement>('.social__comments');
	if (!commentTemplate || !commentsListElement) {
		throw new Error('Critical comment elements not found.');
	}
	commentsListElement.innerHTML = '';

	comments.forEach((comment) => {
		const commentElement = commentTemplate.cloneNode(true) as HTMLElement;
		const commentAvatar = commentElement.querySelector<HTMLImageElement>('.social__picture');
		const commentText = commentElement.querySelector<HTMLElement>('.social__text');
		if (!commentAvatar || !commentText) {
			throw new Error('Critical. Comment elements not found.');
		}

		commentAvatar.src = comment.avatar;
		commentAvatar.alt = comment.name;
		commentText.textContent = comment.message;

		commentsListFragment.append(commentElement);
	});

	commentsListElement.append(commentsListFragment);
};

const onDocumentKeydown = (evt: KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeBigPicture();
	}
};

const displayBigPicture = (id: number, dataArray: Description[]) => {
	if (!id || !dataArray) {
		throw new Error('Critical. User data not found.');
	}
	bigPicture.classList.remove('hidden');
	body.classList.add('modal-open');
	commentCounter.classList.add('hidden');
	commentLoaderButton.classList.add('hidden');

	const activePictureData = dataArray.find((picture) => picture.id === Number(id));
	if (!activePictureData) {
		throw new Error('Critical. Current user data not found.');
	}

	bigPicture.querySelector<HTMLImageElement>('.big-picture__img img')!.src = activePictureData.url;
	bigPicture.querySelector<HTMLElement>('.likes-count')!.textContent = activePictureData.likes.toString();
	bigPicture.querySelector<HTMLElement>('.comments-count')!.textContent = activePictureData.comments.length.toString();
	bigPicture.querySelector<HTMLElement>('.social__caption')!.textContent = activePictureData.description;

	displayComments(activePictureData.comments);

	document.addEventListener('keydown', (evt) => onDocumentKeydown(evt));
	closeButton.addEventListener('click', closeBigPicture);
};

document.addEventListener('keydown', onDocumentKeydown);

function closeBigPicture() {
	bigPicture!.classList.add('hidden');
	body!.classList.remove('modal-open');
	document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt));
	closeButton!.removeEventListener('click', closeBigPicture);
}

export { displayBigPicture };
