import { PhotoComment } from './contracts/common';
import { findBEMElement, findTemplate } from './utils';

const commentsCount = document.querySelector<HTMLSpanElement>('.comments-count');
const commentCounter = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentLoaderButton = document.querySelector<HTMLButtonElement>('.comments-loader');
const commentsListFragment = document.createDocumentFragment();
const commentTemplate = findTemplate<HTMLLIElement>('comment');
const commentsList = document.querySelector<HTMLUListElement>('.social__comments');

if (!commentCounter || !commentLoaderButton || !commentsList || !commentsCount) {
	throw new Error('Critical elements for Comments were not found');
}

commentLoaderButton.hidden = true;
commentCounter.hidden = true;

const renderComments = (comments: PhotoComment[]) => {
	commentsCount.textContent = comments.length.toString();

	comments.forEach((comment) => {
		const commentElement = commentTemplate.cloneNode(true) as typeof commentTemplate;
		const commentAvatar = findBEMElement<HTMLImageElement>(commentElement, 'picture', 'social');
		const commentText = findBEMElement<HTMLElement>(commentElement, 'text', 'social');

		commentAvatar.src = comment.avatar;
		commentAvatar.alt = comment.name;
		commentText.textContent = comment.message;

		commentsListFragment.append(commentElement);
	});

	commentsList.append(commentsListFragment);
};

const clearComments = () => {
	commentsList.innerHTML = '';
};

export { renderComments, clearComments };
