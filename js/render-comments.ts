import { PhotoComment } from './contracts/common';
import { findBEMElement, findTemplate } from './utils';


const commentsCount = document.querySelector<HTMLSpanElement>('.comments-count');
const commentsCurrentCount = document.querySelector<HTMLSpanElement>('.comments-current-count');
const commentCounter = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentLoaderButton = document.querySelector<HTMLButtonElement>('.social__comments-loader');
const commentsListFragment = document.createDocumentFragment();
const commentTemplate = findTemplate<HTMLLIElement>('comment');
const commentsList = document.querySelector<HTMLUListElement>('.social__comments');

const NUMBER_OF_UPLOADED_COMMENTS = 5;

if (!commentCounter || !commentLoaderButton || !commentsList || !commentsCount || !commentsCurrentCount || !commentsList) {
	throw new Error('Critical elements for comments were not found');
}

let shownCommentsAmount = 0;

const getShownCommentsAmount = (shownCommentsCount: number, totalCommentsAmount: number): number => {
	const differenceOfTwoNumbers = totalCommentsAmount - shownCommentsCount;
	if (differenceOfTwoNumbers > 0) {
		shownCommentsAmount += Math.min(NUMBER_OF_UPLOADED_COMMENTS, differenceOfTwoNumbers);
	}

	return shownCommentsAmount;
};

const renderComments = (comments: PhotoComment[]) => {
	const totalCommentsAmount = comments.length;
	commentsCount.textContent = totalCommentsAmount.toString();
	const currentShownCommentsAmount = getShownCommentsAmount(shownCommentsAmount, totalCommentsAmount);
	commentsCurrentCount.textContent = currentShownCommentsAmount.toString();
	commentLoaderButton.classList.remove('hidden');

	return () => {
		const currentPartToRender = comments.slice(shownCommentsAmount, shownCommentsAmount + NUMBER_OF_UPLOADED_COMMENTS);

		currentPartToRender.forEach((comment: PhotoComment) => {
			const commentElement = commentTemplate.cloneNode(true) as typeof commentTemplate;
			const commentAvatar = findBEMElement<HTMLImageElement>(commentElement, 'picture', 'social');
			const commentText = findBEMElement<HTMLElement>(commentElement, 'text', 'social');

			commentAvatar.src = comment.avatar;
			commentAvatar.alt = comment.name;
			commentText.textContent = comment.message;

			commentsListFragment.append(commentElement);
		});
		shownCommentsAmount = getShownCommentsAmount(shownCommentsAmount, totalCommentsAmount);
		commentsCurrentCount.textContent = shownCommentsAmount.toString();


		commentsList.append(commentsListFragment);

		if (shownCommentsAmount === totalCommentsAmount) {
			commentLoaderButton.classList.add('hidden');
		}
	};
};

const clearComments = () => {
	commentsList.innerHTML = '';
	shownCommentsAmount = 0;
};

export { renderComments, clearComments };
