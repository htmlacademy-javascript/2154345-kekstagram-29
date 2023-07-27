import { Photo } from '../contracts/common';
import { filterOptions, toggleActiveState, filtersElement, FilterOption } from './filters-utils';

const MAX_CLASS_NUMBER_ON_MATCHING_BUTTON = 2;

const setFilters = (cb: (currentPhotos: Photo[]) => void, photos: Photo[]) => {
	filtersElement.classList.remove('img-filters--inactive');

	const onFilterButtonClick = (evt: Event) => {
		const currentTarget = evt.target! as HTMLElement;

		// Если на кнопке два класса, то эта кнопка активна в данный момент и ререндер не нужен
		const isClickCorrect = (currentTarget.classList[0] === 'img-filters__button') && (currentTarget.classList.length < MAX_CLASS_NUMBER_ON_MATCHING_BUTTON);
		if (!isClickCorrect) {
			return;
		}

		toggleActiveState(evt);
		const currentFilterName = currentTarget.getAttribute('id')!.split('-')[1];
		const currentFilter = filterOptions[currentFilterName as FilterOption];
		const currentPhotos = currentFilter(photos);
		cb(currentPhotos);
	};

	filtersElement.addEventListener('click', onFilterButtonClick);
};

export { setFilters };
