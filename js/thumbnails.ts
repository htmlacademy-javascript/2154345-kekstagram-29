import { createMocks } from './mocks/mock.ts';
import { renderPictures } from './render-pictures.ts';

const thumbnails = createMocks();

renderPictures(thumbnails);
