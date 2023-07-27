import { PhotoComment } from '../contracts/common';
import { findBEMElement, findTemplate, renderPack } from '../utils';

const NUMBER_OF_IMAGE_PER_LOAD = 5;

const commentsStatus = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentsLoader = document.querySelector<HTMLButtonElement>('.social__comments-loader');
const commentTemplate = findTemplate<HTMLLIElement>('comment');
const commentsList = document.querySelector<HTMLUListElement>('.social__comments');

if (!commentsLoader || !commentsList || !commentsStatus || !commentsList) {
	throw new Error('Critical elements for comments were not found');
}

const [currentStatus, commentsCount] = commentsStatus.childNodes;

const createComment = ({ avatar, name, message }: PhotoComment) => {
	const comment = commentTemplate.cloneNode(true) as typeof commentTemplate;
	const commentAvatar = findBEMElement<HTMLImageElement>(comment, 'picture', 'social');
	const commentText = findBEMElement<HTMLElement>(comment, 'text', 'social');

	commentAvatar.src = avatar;
	commentAvatar.alt = name;
	commentText.textContent = message;

	return comment;
};

let shownCommentsAmount = 0;
let currentComments: PhotoComment[] = [];

commentsLoader.addEventListener('click', () => {
	const totalCommentsAmount = currentComments.length;
	const nextCommentAmount = Math.min(shownCommentsAmount + NUMBER_OF_IMAGE_PER_LOAD, totalCommentsAmount);
	const nextPack = currentComments.slice(shownCommentsAmount, nextCommentAmount);

	renderPack(nextPack, commentsList, createComment);

	shownCommentsAmount = nextCommentAmount;
	currentStatus.textContent = `${shownCommentsAmount} из `;

	const areAllCommentsShown = shownCommentsAmount >= totalCommentsAmount;
	commentsLoader.hidden = areAllCommentsShown;
});

const renderComments = (comments: PhotoComment[]) => {
	commentsCount.textContent = comments.length.toString();
	currentComments = comments;
	commentsLoader.click();
};

const clearComments = () => {
	commentsList.innerHTML = '';
	shownCommentsAmount = 0;
};

export { renderComments, clearComments };
