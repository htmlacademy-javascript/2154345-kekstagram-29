import { Photo } from '../contracts/common';
import { filterOptions, toggleActiveState, filters, FilterOption } from './filters-utils';

const setFilters = (cb: (currentPhotos: Photo[]) => void, photos: Photo[]) => {
	filters.classList.remove('img-filters--inactive');

	const onFilterButtonClick = (evt: Event) => {
		const currentTarget = evt.target! as HTMLElement;

		// Если на кнопке два класса, то эта кнопка активна в данный момент и ререндер не нужен
		const isClickCorrect = (currentTarget.classList[0] === 'img-filters__button') && (currentTarget.classList.length < 2);
		if (!isClickCorrect) {
			return;
		}

		toggleActiveState(evt);
		const currentFilterName = currentTarget.getAttribute('id')!.split('-')[1];
		const currentFilter = filterOptions[currentFilterName as FilterOption];
		const currentPhotos = currentFilter(photos);
		cb(currentPhotos);
	};

	filters.addEventListener('click', onFilterButtonClick);
};

export { setFilters };
