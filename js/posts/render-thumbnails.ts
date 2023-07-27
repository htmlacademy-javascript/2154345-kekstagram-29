import { openModal } from './render-big-picture.ts';
import { Photo } from '../contracts/common.ts';
import { findBEMElement, findTemplate, renderPack } from '../utils.ts';


const thumbnailsListElement = document.querySelector('.pictures');
const pictureTmp = findTemplate<HTMLAnchorElement>('picture');
if (!thumbnailsListElement || !pictureTmp) {
	throw new Error('Critical. Picture elements not found.');
}

const createThumbnail = ({ url, description, likes, comments }: Photo) => {
	const pictureElement = pictureTmp.cloneNode(true) as typeof pictureTmp;
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

const renderThumbnails = (photos: Photo[]) => renderPack(photos, thumbnailsListElement, (photo: Photo) => {
	document.querySelectorAll('.picture').forEach((el) => el.remove());
	const thumbnail = createThumbnail(photo);
	thumbnail.addEventListener('click', () => openModal(photo));

	return thumbnail;
});

export { renderThumbnails };
