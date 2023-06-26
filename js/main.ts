import { createMocks } from './mock.ts';
import { isShorterThan, isPalindrome, getNumbersFromString } from './functions.ts';
import { displayPictures } from './display-pictures.ts';
import './photo-edit.ts';
import './photo-upload.ts';
import './submit-data.ts';

displayPictures(createMocks());
isShorterThan('123', 123);
isPalindrome('топот');
getNumbersFromString('2033 год');

