import { findBEMElement } from './utils';

const scale = document.querySelector('.scale')!;
const image = document.querySelector<HTMLImageElement>('.img-upload__preview img')!;
const controlSmaller = findBEMElement(scale, 'control', 'scale', 'smaller');
const controlBigger = findBEMElement(scale, 'control', 'scale', 'bigger');
const scaleField = findBEMElement<HTMLInputElement>(scale, 'control', 'scale', 'value');

const getScaleValue = (value: number, isDecrease = true) => {
	if (isDecrease) {
		return Math.max(0.25, value - 0.25);
	}

	return Math.min(1, value + 0.25);
};

const setScale = (value: number) => {
	image.style.transform = `scale(${value})`;
	scaleField.value = `${value * 100}%`;
};

const onScaleChange = (isDecrease = true) => {
	const scaleFieldCurrent = parseInt(scaleField.value, 10) / 100;
	const scaleValue = getScaleValue(scaleFieldCurrent, isDecrease);
	setScale(scaleValue);
};

controlSmaller.addEventListener('click', () => {
	onScaleChange(true);
});

controlBigger.addEventListener('click', () => {
	onScaleChange(false);
});

const clearScale = () => {
	setScale(1);
};

export { clearScale };
