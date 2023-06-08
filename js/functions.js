/* eslint-disable no-unused-vars */
const checkStringLength = (string, length) => (string.length <= length);

const isPalindrom = (string) => {
  const clearedString = string.toLowerCase().replaceAll(' ', '');

  return clearedString === clearedString.split('').reverse().join('');
};

const getNumbersFromString = (string) => {
  string = string.toString();
  let result = '';

  for (const char of string) {
    const isNumber = !Number.isNaN(Number.parseInt(char, 10));
    if (isNumber) {
      result += char;
    }
  }

  // NaN выведется в случае пустой строки на входе
  return Number(result) || NaN;
};
