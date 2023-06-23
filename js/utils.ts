const getRandomInteger = (a: number, b: number) : number => {
	const lower: number = Math.ceil(Math.min(a, b));
	const upper: number = Math.floor(Math.max(a, b));
	const result: number = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomArrayElement = <El>(elements: El[] | readonly El[]): El => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, getRandomArrayElement};
