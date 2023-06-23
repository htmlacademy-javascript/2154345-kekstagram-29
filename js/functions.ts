const enum Default {
	MAX_STRING_LENGTH = 140
}

const isShorterThan = ({length}: string, maxLength: number = Default.MAX_STRING_LENGTH): boolean => (length <= maxLength);

const isPalindrome = (str: string): boolean => {
	const clearedString = str.toLowerCase().replaceAll(' ', '');

	return clearedString === clearedString.split('').reverse().join('');
};

const getNumbersFromString = (input: number | string) => {
	const stringWithOnlyDigits = String(input).replace(/\D/g, '');
	return parseInt(stringWithOnlyDigits, 10);
};

export { isShorterThan, isPalindrome, getNumbersFromString };
