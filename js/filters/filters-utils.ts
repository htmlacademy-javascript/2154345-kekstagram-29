import { Photo } from '../contracts/common';
import { getRandomIdPack } from '../utils';

const filters = document.querySelector('.img-filters')!;
const defaultButton = filters.querySelector('#filter-default')!;

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

type FilterOption = keyof typeof filterOptions;

let previousButton = defaultButton;

const toggleActiveState = (event: Event) => {
	previousButton.classList.remove('img-filters__button--active');
	const targetButton = event.target as HTMLElement;
	targetButton.classList.add('img-filters__button--active');
	previousButton = targetButton;
};

export type { FilterOption };
export { filterOptions, toggleActiveState, filters };
