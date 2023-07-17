import { form, image, sliderContainer, sliderWrapper, effectsWrapper } from './elements';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import { EFFECTS_OPTIONS_MAP } from './effects-map';

const CHANGE_EVENT = new Event('change');

const slider = noUiSlider.create(
	sliderWrapper!,
	{
		...EFFECTS_OPTIONS_MAP.none.slider,
		connect: 'lower',
	}
);

sliderContainer!.hidden = true;

effectsWrapper!.addEventListener('change', () => {
	const effect = form!.effect.value;

	sliderContainer!.hidden = effect === 'none';
	slider.updateOptions(EFFECTS_OPTIONS_MAP[effect].slider, false);
});

slider.on('update', () => {
	const value = slider.get() as number;
	form!['effect-level'].value = String(value);
	const currentEffect = form!.effect.value;

	if (currentEffect === 'none') {
		return image!.style.removeProperty('filter');
	}

	const filter = EFFECTS_OPTIONS_MAP[currentEffect].filter!;
	image!.style.filter = filter(value);
});

const resetEffects = () => {
	form!.effect.value = 'none';
	document.dispatchEvent(CHANGE_EVENT);
};

export { slider, resetEffects };
