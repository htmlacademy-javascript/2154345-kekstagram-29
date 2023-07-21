import { Photo } from '../contracts/common';
import { renderThumbnails } from '../posts/render-thumbnails';
import { getRandomIdPack, debounce } from '../utils';

const filters = document.querySelector('.img-filters')!;
const defaultButton = filters.querySelector('#filter-default')!;
const randomButton = filters.querySelector('#filter-random')!;
const discussedButton = filters.querySelector('#filter-discussed')!;

const RERENDER_DELAY = 500;

function compareComments({ comments: commentsA }: Photo, { comments: commentsB }: Photo) {
	return commentsB.length - commentsA.length;
}

const defaultFilter = (photos: Photo[]) => photos;

const randomFilter = (photos: Photo[]) => {
	const idPack = getRandomIdPack();
	const filteredPhotos = photos.filter(({ id }) => idPack.includes(id!));

	return filteredPhotos;
};

const discussedFilter = (photos: Photo[]) => {
	const filteredPhotos = photos.slice().sort(compareComments);

	return filteredPhotos;
};

const filterOptions = {
	default: defaultFilter,
	random: randomFilter,
	discussed: discussedFilter
};

const toggleActiveState = (event: Event) => {
	const targetButton = event.target as HTMLElement;

	[defaultButton, randomButton, discussedButton].forEach((button) => {
		button.classList.remove('img-filters__button--active');
	});

	targetButton.classList.add('img-filters__button--active');
};

const initFilters = (photos: Photo[]) => {
	filters.classList.remove('img-filters--inactive');

	const onFilterButtonClick = (evt: Event) => {
		toggleActiveState(evt);
		const currentElement = evt.target as HTMLButtonElement;
		const currentFilterName = currentElement.getAttribute('id')!.split('-')[1];
		const currentFilter = filterOptions[currentFilterName as keyof typeof filterOptions];
		const currentPhotos = currentFilter(photos);
		document.querySelectorAll('.picture').forEach((el) => el.remove());
		renderThumbnails(currentPhotos);
	};

	[defaultButton, randomButton, discussedButton].forEach((button) => button.addEventListener('click', onFilterButtonClick));
};

export { initFilters };