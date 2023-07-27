import { PhotoComment } from '../contracts/common';
import { findBEMElement, findTemplate, renderPack } from '../utils';

const NUMBER_OF_IMAGE_PER_LOAD = 5;

const commentsStatusElement = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentsLoaderElement = document.querySelector<HTMLButtonElement>('.social__comments-loader');
const commentTemplateElement = findTemplate<HTMLLIElement>('comment');
const commentsListElement = document.querySelector<HTMLUListElement>('.social__comments');

if (!commentsLoaderElement || !commentsListElement || !commentsStatusElement || !commentsListElement) {
	throw new Error('Critical elements for comments were not found');
}

const [currentStatus, commentsCount] = commentsStatusElement.childNodes;

const createComment = ({ avatar, name, message }: PhotoComment) => {
	const comment = commentTemplateElement.cloneNode(true) as typeof commentTemplateElement;
	const commentAvatar = findBEMElement<HTMLImageElement>(comment, 'picture', 'social');
	const commentText = findBEMElement<HTMLElement>(comment, 'text', 'social');

	commentAvatar.src = avatar;
	commentAvatar.alt = name;
	commentText.textContent = message;

	return comment;
};

let shownCommentsAmount = 0;
let currentComments: PhotoComment[] = [];

commentsLoaderElement.addEventListener('click', () => {
	const totalCommentsAmount = currentComments.length;
	const nextCommentAmount = Math.min(shownCommentsAmount + NUMBER_OF_IMAGE_PER_LOAD, totalCommentsAmount);
	const nextPack = currentComments.slice(shownCommentsAmount, nextCommentAmount);

	renderPack(nextPack, commentsListElement, createComment);

	shownCommentsAmount = nextCommentAmount;
	currentStatus.textContent = `${shownCommentsAmount} из `;

	const areAllCommentsShown = shownCommentsAmount >= totalCommentsAmount;
	commentsLoaderElement.hidden = areAllCommentsShown;
});

const renderComments = (comments: PhotoComment[]) => {
	commentsCount.textContent = comments.length.toString();
	currentComments = comments;
	commentsLoaderElement.click();
};

const clearComments = () => {
	commentsListElement.innerHTML = '';
	shownCommentsAmount = 0;
};

export { renderComments, clearComments };
