import { Photo, PhotoComment } from '../contracts/common';
import { renderThumbnails } from '../posts/render-thumbnails';
import { getRandomInteger } from '../utils';

const filters = document.querySelector('.img-filters')!;
const defaultButton = filters.querySelector('#filter-default')!;
const randomButton = filters.querySelector('#filter-random')!;
const discussedButton = filters.querySelector('#filter-discussed')!;

const getRandomIdPack = () => {
	const idPack: number[] = [];
	let randomNumber = getRandomInteger(1, 25);
	while (idPack.length <= 10) {
		if (!idPack.includes(randomNumber)) {
			idPack.push(randomNumber);
		}
		randomNumber = getRandomInteger(1, 25);
	}

	return idPack;
};

function compareComments({ comments: commentsA }: Photo, { comments: commentsB }: Photo) {
	return commentsB.length - commentsA.length;
}

const randomFilter = (photos: Photo[]) => {
	const idPack = getRandomIdPack();
	const filteredPhotos = photos.filter((_, index) => idPack.includes(index));

	return filteredPhotos;
};

const discussedFilter = (photos: Photo[]) => {
	const filteredPhotos = photos.slice().sort(compareComments);

	return filteredPhotos;
};

const filterOptions = {
	default: {
		button: defaultButton,
		filter: 'none'
	},
	random: {
		button: randomButton,
		filter: randomFilter
	},
	discussed: {
		button: discussedButton,
		filter: discussedFilter
	}
};

const toggleActiveState = (event: Event) => {
	const targetButton = event.target as HTMLElement;

	// Remove "active" class from all buttons
	[defaultButton, randomButton, discussedButton].forEach((button) => {
		button.classList.remove('img-filters__button--active');
	});

	// Add "active" class to the clicked button
	targetButton.classList.add('img-filters__button--active');
};


const initFilters = (photos: Photo[]) => {
	filters.classList.remove('img-filters--inactive');

	defaultButton.addEventListener('click', (evt) => {
		document.querySelectorAll('.picture').forEach((el) => el.remove());
		toggleActiveState(evt);
		renderThumbnails(photos);
	});

	randomButton.addEventListener('click', (evt) => {
		const currentPhotos = randomFilter(photos);
		document.querySelectorAll('.picture').forEach((el) => el.remove());
		toggleActiveState(evt);
		renderThumbnails(currentPhotos);
	});

	discussedButton.addEventListener('click', (evt) => {
		const currentPhotos = discussedFilter(photos);
		document.querySelectorAll('.picture').forEach((el) => el.remove());
		toggleActiveState(evt);
		renderThumbnails(currentPhotos);
	});
};

export { initFilters };
