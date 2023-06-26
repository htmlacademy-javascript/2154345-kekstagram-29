import { Description } from './mock.ts';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector<HTMLTemplateElement>('#picture')?.content.querySelector<HTMLAnchorElement>('.picture');
const picturesFragment = document.createDocumentFragment();
if (!pictureList || !pictureTemplate) {
	throw new Error('Critical picture elements not found.');
}


const displayPictures = (dataArray: Description[]) => {
	dataArray.forEach(({url, description, likes, comments}) => {
		const pictureElement = pictureTemplate.cloneNode(true) as HTMLAnchorElement;
		const pictureTag = pictureElement.querySelector<HTMLImageElement>('.picture__img');
		if (!pictureTag) {
			return;
		}

		pictureTag.src = url;
		pictureTag.alt = description;
		pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
		pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();

		picturesFragment.append(pictureElement);
	});

	pictureList.append(picturesFragment);
};

export { displayPictures };
