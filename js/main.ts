interface Comment {
	id: number,
	avatar: `img/avatar-${number}.svg`,
	message: string,
	name: string
}

interface Description {
	id: number,
	url: `photos/${number}.jpg`,
	description: string,
	likes: number,
	comments: Comment[],
}

const MESSAGES: string[] = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES: string[] = [
	'Серега Серый',
	'Саня Белый',
	'Никитос Черный',
	'Гошан Фиолетовый',
	'Леха Бордовый',
	'Максон Зеленый',
	'Дэнчик Желтый',
	'Ромчик Пурпурный'
];

const enum Default {
	SIMILAR_PHOTO_DESCRIPTIONS_COUNT = 25,
}

const getRandomInteger = (a: number, b: number) : number => {
	const lower: number = Math.ceil(Math.min(a, b));
	const upper: number = Math.floor(Math.max(a, b));
	const result: number = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomArrayElement = (elements: Array<any>): any => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min: number, max: number): any => {
	const previousValues: number[] = [];

	if (previousValues.length >= (max - min + 1)) {
		return null;
	}

	return function(): number {
		let currentValue: number = getRandomInteger(min, max);
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(min, max);
		}
		previousValues.push(currentValue);
		return currentValue;
	};
};

const generateRandomDescriptionId = createRandomIdFromRangeGenerator(1, 25);
const generateRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateRandomCommentId = createRandomIdFromRangeGenerator(1, 800);

const createComment = (): Comment => ({
	id: generateRandomCommentId(),
	avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
	message: getRandomArrayElement(MESSAGES),
	name: getRandomArrayElement(NAMES)
});

const createDescription = (): Description => ({
	id: generateRandomDescriptionId(),
	url: `photos/${generateRandomPhotoId()}.jpg`,
	description: 'Скоро тут появится полноценное описание!',
	likes: getRandomInteger(15, 200),
	comments: Array.from({length: getRandomInteger(1, 30)}, createComment),
});

const similarPhotoDescriptions = Array.from({length: Default.SIMILAR_PHOTO_DESCRIPTIONS_COUNT}, createDescription);

export {createRandomIdFromRangeGenerator};
