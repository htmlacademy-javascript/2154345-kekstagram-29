import { findBEMElement } from '../utils';
import { image } from './elements';

const scale = document.querySelector('.scale')!;
const controlSmaller = findBEMElement(scale, 'control', 'scale', 'smaller');
const controlBigger = findBEMElement(scale, 'control', 'scale', 'bigger');
const scaleField = findBEMElement<HTMLInputElement>(scale, 'control', 'scale', 'value');

const enum Scale {
	MinScaleValue = 25,
	MaxScaleValue = 100,
	ScaleStep = 25,
	ParsingScaleValue = 100
}

const getScaleValue = (value: number, isDecrease = true) => {
	if (isDecrease) {
		return Math.max(Scale.MinScaleValue, value - Scale.ScaleStep);
	}

	return Math.min(Scale.MaxScaleValue, value + Scale.ScaleStep);
};

const setScale = (value: number) => {
	image!.style.transform = `scale(${value / Scale.ParsingScaleValue})`;
	scaleField.value = `${value}%`;
};

const resetScale = () => {
	image!.style.removeProperty('transform');
};

const onScaleChange = (isDecrease = true) => {
	const currentScaleFieldValue = parseInt(scaleField.value, 10);
	const scaleValue = getScaleValue(currentScaleFieldValue, isDecrease);
	setScale(scaleValue);
};

controlSmaller.addEventListener('click', () => {
	onScaleChange(true);
});

controlBigger.addEventListener('click', () => {
	onScaleChange(false);
});

export { resetScale };
