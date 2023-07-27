import { findBEMElement } from '../utils';
import { imageElement } from './elements';

const scaleElement = document.querySelector('.scale')!;
const controlSmallerElement = findBEMElement(scaleElement, 'control', 'scale', 'smaller');
const controlBiggerElement = findBEMElement(scaleElement, 'control', 'scale', 'bigger');
const scaleFieldElement = findBEMElement<HTMLInputElement>(scaleElement, 'control', 'scale', 'value');

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
	imageElement!.style.transform = `scale(${value / Scale.ParsingScaleValue})`;
	scaleFieldElement.value = `${value}%`;
};

const resetScale = () => {
	imageElement!.style.removeProperty('transform');
};

const onScaleChange = (isDecrease = true) => {
	const currentScaleFieldValue = parseInt(scaleFieldElement.value, 10);
	const scaleValue = getScaleValue(currentScaleFieldValue, isDecrease);
	setScale(scaleValue);
};

controlSmallerElement.addEventListener('click', () => {
	onScaleChange(true);
});

controlBiggerElement.addEventListener('click', () => {
	onScaleChange(false);
});

export { resetScale };
