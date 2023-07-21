import { renderThumbnails } from './posts/render-thumbnails';
import { getData } from './fetch/api';
import { showStatus } from './fetch/status';
import './photo-upload/form';

getData()
	.then((photos) => {
		renderThumbnails(photos);
	})
	.catch(() => {
		showStatus('dataError');
	});
