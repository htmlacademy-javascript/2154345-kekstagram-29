function checkStringLength(string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}

function isPalindrom(string) {
  // Получаем массив букв из переведенной в нижний регистр строки без пробелов
  const clearedStringArray = string.toLowerCase().replaceAll(' ', '').split('');

  return clearedStringArray.join('') === clearedStringArray.reverse().join('');
}

function getNumbersFromString(string) {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const letter = string[i];

    const isNumber = !Number.isNaN(Number.parseInt(letter, 10));
    if (isNumber) {
      result += letter;
    }
  }

  // NaN выведется в случае пустой строки на входе
  return Number(result) || NaN;
}

console.log(checkStringLength('пельмени', 5));
console.log(checkStringLength('восемь', 8));

console.log(isPalindrom('Лёша на полке клопа нашёл '));
console.log(isPalindrom('столешница228'));

console.log(getNumbersFromString('агент 007'));
console.log(getNumbersFromString(''));
