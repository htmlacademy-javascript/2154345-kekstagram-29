/* eslint-disable no-unused-vars */
function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrom(string) {
  const clearedString = string.toLowerCase().replaceAll(' ', '');

  return clearedString === clearedString.split('').reverse().join('');
}

function getNumbersFromString(string) {
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
}

console.log(isPalindrom('Лёша на полке клопа нашёл '));
