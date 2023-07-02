import { getRandomInteger, getRandomArrayElement } from '../utils';
import { Photo, PhotoComment } from '../contracts/common';
import { names, messages } from './mock-values.json';

const enum Default {
	SIMILAR_PHOTO_DESCRIPTIONS_COUNT = 25,
	MIN_VALUE = 1,
	MAX_ID = 25,
	MAX_COMMENT_ID = 800,
	MAX_AVATAR_NUMBER = 6,
	MIN_LIKES_COUNT = 15,
	MAX_LIKES_COUNT = 200,
	MAX_COMMENTS_COUNT = 30
}

const createRandomIdFromRangeGenerator = (min: number, max: number) => {
	const previousValues: number[] = [];

	return function(): number | null {
		let currentValue: number = getRandomInteger(min, max);

		if (previousValues.length >= (max - min + 1)) {
			return null;
		}

		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(min, max);
		}

		previousValues.push(currentValue);
		return currentValue;
	};
};

const generateRandomDescriptionId = createRandomIdFromRangeGenerator(Default.MIN_VALUE, Default.MAX_ID);
const generateRandomPhotoId = createRandomIdFromRangeGenerator(Default.MIN_VALUE, Default.MAX_ID);
const generateRandomCommentId = createRandomIdFromRangeGenerator(Default.MIN_VALUE, Default.MAX_COMMENT_ID);


const createComment = (): PhotoComment => ({
	id: generateRandomCommentId(),
	avatar: `img/avatar-${getRandomInteger(Default.MIN_VALUE, Default.MAX_AVATAR_NUMBER)}.svg`,
	message: getRandomArrayElement(messages),
	name: getRandomArrayElement(names)
});

const createDescription = (): Photo => ({
	id: generateRandomDescriptionId(),
	url: `photos/${generateRandomPhotoId()}.jpg`,
	description: 'Скоро тут появится полноценное описание!',
	likes: getRandomInteger(Default.MIN_LIKES_COUNT, Default.MAX_LIKES_COUNT),
	comments: Array.from({length: getRandomInteger(Default.MIN_VALUE, Default.MAX_COMMENTS_COUNT)}, createComment),
});

const createMocks = () => Array.from({length: Default.SIMILAR_PHOTO_DESCRIPTIONS_COUNT}, createDescription);

export { createMocks };
export type { Photo, PhotoComment };
