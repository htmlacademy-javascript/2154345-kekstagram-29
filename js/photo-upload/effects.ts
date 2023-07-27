import { formElement, imageElement, sliderContainerElement, sliderWrapperElement, effectsWrapperElement } from './elements';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import { EFFECTS_OPTIONS_MAP } from './effects-map';

const CHANGE_EVENT = new Event('change');

const slider = noUiSlider.create(
	sliderWrapperElement!,
	{
		...EFFECTS_OPTIONS_MAP.none.slider,
		connect: 'lower',
	}
);

sliderContainerElement!.hidden = true;

effectsWrapperElement!.addEventListener('change', () => {
	const effect = formElement!.effect.value;

	sliderContainerElement!.hidden = effect === 'none';
	slider.updateOptions(EFFECTS_OPTIONS_MAP[effect].slider, true);
});

slider.on('update', () => {
	const value = slider.get() as number;
	formElement!['effect-level'].value = String(value);
	const currentEffect = formElement!.effect.value;

	if (currentEffect === 'none') {
		return imageElement!.style.removeProperty('filter');
	}

	const filter = EFFECTS_OPTIONS_MAP[currentEffect].filter!;
	imageElement!.style.filter = filter(value);
});

const resetEffects = () => {
	formElement!.effect.value = 'none';
	effectsWrapperElement!.dispatchEvent(CHANGE_EVENT);
};

export { resetEffects };
