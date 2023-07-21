import { renderThumbnails } from './posts/render-thumbnails';
import { getData } from './fetch/api';
import { showStatus } from './fetch/status';
import './photo-upload/form';
import { initFilters } from './filters/filters';

getData()
	.then((photos) => {
		renderThumbnails(photos);
		initFilters(photos);
	})
	.catch(() => {
		showStatus('dataError');
	});
