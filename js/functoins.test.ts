import {describe, it, expect} from 'vitest';
import { isTimeSpanOutOfBounds } from './functions.ts';

describe('Функция, проверяющая принадлежность одного временного отрезка другому.', () => {
	it('Проверка на полный формат времени и истинный исход',
	 () => expect(isTimeSpanOutOfBounds('08:00', '17:30', '14:00', 90)).toEqual(true));
	it('Проверка на неполный формат времени и истинный исход',
	 () => expect(isTimeSpanOutOfBounds('8:0', '10:0', '8:0', 120)).toEqual(true));
	it('Проверка на полный формат времени и ложный исход',
	 () => expect(isTimeSpanOutOfBounds('08:00', '14:30', '14:00', 90)).toEqual(false));
	it('Проверка на неполный формат времени и ложный исход',
	 () => expect(isTimeSpanOutOfBounds('14:0', '17:30', '08:0', 90)).toEqual(false));
});
