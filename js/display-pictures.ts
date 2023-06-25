/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Description } from './mock.ts';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')?.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const displayPictures = (dataArray: Description[]) => {
	dataArray.forEach(({url, description, likes, comments}) => {
		const pictureElement = pictureTemplate?.cloneNode(true) as HTMLAnchorElement;
		const pictureTag = pictureElement.querySelector('.picture__img') as HTMLImageElement;

		pictureTag.src = url;
		pictureTag.alt = description;
		pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
		pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();

		picturesFragment.append(pictureElement);
	});

	pictureList?.append(picturesFragment);
};

export { displayPictures };
