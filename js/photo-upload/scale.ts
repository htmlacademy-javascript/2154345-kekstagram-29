import { findBEMElement } from '../utils';
import { image } from './elements';

const scale = document.querySelector('.scale')!;
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
	image!.style.transform = `scale(${value})`;
	scaleField.value = `${value * 100}%`;
};

const resetScale = () => {
	image!.style.removeProperty('transform');
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

export { resetScale };