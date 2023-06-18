const isShorterThan = ({length}: string, maxLength: number): boolean => (length <= maxLength);

const isPalindrom = (str: string): boolean => {
	const clearedString = str.toLowerCase().replaceAll(' ', '');

	return clearedString === clearedString.split('').reverse().join('');
};

const getNumbersFromString = (str: string | number): number => {
	str = str.toString();

	let result = '';

	for (const char of str) {
		const isNumber = !Number.isNaN(Number.parseInt(char, 10));
		if (isNumber) {
			result += char;
		}
	}

	// NaN выведется в случае пустой строки на входе
	return Number(result) || NaN;
};
