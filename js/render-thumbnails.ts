import { createMocks } from './mocks/mock.ts';
import { openModal } from './render-big-picture.ts';
import { Photo } from './contracts/common.ts';
import { findBEMElement, findTemplate, renderPack } from './utils.ts';

const photos = createMocks();

const thumbnailsList = document.querySelector('.pictures');
const pictureTemplate = findTemplate<HTMLAnchorElement>('picture');
if (!thumbnailsList || !pictureTemplate) {
	throw new Error('Critical. Picture elements not found.');
}

const createThumbnail = ({ url, description, likes, comments }: Photo) => {
	const pictureElement = pictureTemplate.cloneNode(true) as typeof pictureTemplate;
	const pictureTag = findBEMElement<HTMLImageElement>(pictureElement, 'img');
	if (!pictureTag) {
		throw new Error('Critical. Picture elements not found.');
	}

	pictureTag.src = url;
	pictureTag.alt = description;
	findBEMElement(pictureElement, 'likes').textContent = likes.toString();
	findBEMElement(pictureElement, 'comments').textContent = comments.length.toString();

	return pictureElement;
};

renderPack(photos, thumbnailsList, (photo) => {
	const thumbnail = createThumbnail(photo);
	thumbnail.addEventListener('click', () => openModal(photo));

	return thumbnail;
});
