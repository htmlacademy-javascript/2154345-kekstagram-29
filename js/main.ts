import { renderThumbnails } from './posts/render-thumbnails';
import { getData } from './fetch/api';
import { showStatus } from './fetch/status';
import './photo-upload/form';
import { setFilters } from './filters/set-filters';
import { debounce } from './utils';

const RERENDERER_DELAY = 500;

getData()
	.then((photos) => {
		renderThumbnails(photos);
		setFilters(
			debounce(renderThumbnails, RERENDERER_DELAY),
			photos
		);
	})
	.catch(() => {
		showStatus('dataError');
	});
