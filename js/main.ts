import { createMocks } from './mock.ts';
import { isShorterThan, isPalindrome, getNumbersFromString, isTimeSpanOutOfBounds } from './functions.ts';
import './photo-edit.ts';
import './photo-upload.ts';
import './submit-data.ts';

createMocks();
isShorterThan('123', 123);
isPalindrome('топот');
getNumbersFromString('2033 год');
isTimeSpanOutOfBounds('08:00', '17:30', '14:00', 90);
