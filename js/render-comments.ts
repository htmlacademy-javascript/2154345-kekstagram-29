import { PhotoComment } from './contracts/common';
import { findBEMElement, findTemplate } from './utils';

const commentsCount = document.querySelector<HTMLSpanElement>('.comments-count');
const commentCounter = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentLoaderButton = document.querySelector<HTMLButtonElement>('.social__comments-loader');
const commentsListFragment = document.createDocumentFragment();
const commentTemplate = findTemplate<HTMLLIElement>('comment');
const commentsList = document.querySelector<HTMLUListElement>('.social__comments');

if (!commentCounter || !commentLoaderButton || !commentsList || !commentsCount || !commentsList) {
	throw new Error('Critical elements for Comments were not found');
}

let shownCommentsAmount = 0;

const renderComments = (comments: PhotoComment[]) => {
	commentsCount.textContent = comments.length.toString();

	return () => {
		const currentPartToRender = comments.slice(shownCommentsAmount, shownCommentsAmount + 5);

		currentPartToRender.forEach((comment: PhotoComment) => {
			const commentElement = commentTemplate.cloneNode(true) as typeof commentTemplate;
			const commentAvatar = findBEMElement<HTMLImageElement>(commentElement, 'picture', 'social');
			const commentText = findBEMElement<HTMLElement>(commentElement, 'text', 'social');

			commentAvatar.src = comment.avatar;
			commentAvatar.alt = comment.name;
			commentText.textContent = comment.message;

			commentsListFragment.append(commentElement);
		});
		shownCommentsAmount += 5;

		commentsList.append(commentsListFragment);
	};
};

const clearComments = () => {
	commentsList.innerHTML = '';
	shownCommentsAmount = 0;
};

export { renderComments, clearComments };
