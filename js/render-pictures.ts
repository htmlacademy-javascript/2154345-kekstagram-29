import { renderBigPicture } from './render-big-picture.ts';
import { Photo } from './contracts/common.ts';
import { findBEMElement, findTemplate } from './utils.ts';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = findTemplate<HTMLAnchorElement>('picture');
const picturesFragment = document.createDocumentFragment();
if (!pictureList || !pictureTemplate) {
	throw new Error('Critical. Picture elements not found.');
}

const renderPicture = (photo: Photo): HTMLAnchorElement => {
	const { url, description, likes, comments } = photo;
	const pictureElement = pictureTemplate.cloneNode(true) as HTMLAnchorElement;
	const pictureTag = findBEMElement<HTMLImageElement>(pictureElement, 'img');
	if (!pictureTag) {
		throw new Error('Critical. Picture elements not found.');
	}

	pictureTag.src = url;
	pictureTag.alt = description;
	pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
	pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();
	pictureElement.addEventListener('click', (evt) => {
		evt.preventDefault();
		renderBigPicture(photo);
	});

	return pictureElement;
};

const renderPictures = (dataArray: Photo[]) => {
	dataArray.forEach((picture) => {
		picturesFragment.append(renderPicture(picture));
	});

	pictureList.append(picturesFragment);
};

export { renderPictures };
