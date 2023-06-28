const getRandomInteger = (a: number, b: number) : number => {
	const lower: number = Math.ceil(Math.min(a, b));
	const upper: number = Math.floor(Math.max(a, b));
	const result: number = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomArrayElement = <El>(elements: El[] | readonly El[]): El => elements[getRandomInteger(0, elements.length - 1)];

const isPicturePressedByClick = (evt: MouseEvent) => {
	const eventElement = <HTMLElement>evt.target;
	return eventElement!.classList.contains('picture__img');
};

const isPicturePressedByKeydown = (evt: KeyboardEvent) => {
	const eventElement = <HTMLElement>evt.target;
	return eventElement!.classList.contains('picture') && evt!.key === 'Enter';
};

const isEscapeKey = (evt: KeyboardEvent) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, isPicturePressedByClick, isPicturePressedByKeydown, isEscapeKey};
