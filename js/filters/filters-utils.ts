import { Photo } from '../contracts/common';
import { getRandomIdPack } from '../utils';

const filters = document.querySelector('.img-filters')!;
const defaultButton = filters.querySelector('#filter-default')!;
const randomButton = filters.querySelector('#filter-random')!;
const discussedButton = filters.querySelector('#filter-discussed')!;

const compareComments = ({ comments: commentsA }: Photo, { comments: commentsB }: Photo) => commentsB.length - commentsA.length;

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

export { filterOptions, toggleActiveState, filters };
