import {describe, it, expect} from 'vitest';
import {createRandomIdFromRangeGenerator} from './main.ts';
describe('Функция для генерации уникальных ID.', () => {
	const NUMBER_OF_REQUIRED_ID = 35;
	const generateRandomIdForTest = createRandomIdFromRangeGenerator(1, NUMBER_OF_REQUIRED_ID);
	const generatedIdsForTest = Array.from({length: 35}, generateRandomIdForTest);

	it('Проверка на соответствие количества сгенерированных id заданному количеству', () => expect(generatedIdsForTest.length).toBeCloseTo(NUMBER_OF_REQUIRED_ID));
});
