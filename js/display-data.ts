import { createMocks } from './mock';
import { displayPictures } from './display-pictures.ts';
import { displayBigPicture } from './display-big-picture.ts';
import { isPicturePressedByClick, isPicturePressedByKeydown } from './utils';

// В дальнейшем в usersData можно будет вызвать функцию получающую данные с сервера
const usersData = createMocks();

displayPictures(usersData);

document.addEventListener('click', (evt) => {
	if(isPicturePressedByClick(evt)) {
		evt.preventDefault();
		const pictureElement = <HTMLImageElement>evt.target;
		displayBigPicture(Number(pictureElement.id), usersData);
	}
});

document.addEventListener('keydown', (evt) => {
	if(isPicturePressedByKeydown(evt)) {
		evt.preventDefault();
		const eventElement = evt.target as HTMLElement;
		const pictureElement = eventElement!.querySelector('.picture__img');
		displayBigPicture(Number(pictureElement!.id), usersData);
	}
});
