import type { Effect } from './effects-map';

type EffectRadioNodeList = Omit<RadioNodeList, 'value'> & {
	value: Effect;
}

type UploadForm = HTMLFormElement & {
	filename: HTMLInputElement;
	scale: HTMLInputElement;
	'effect-level': HTMLInputElement;
	effect: EffectRadioNodeList;
	hashtags: HTMLInputElement;
	description: HTMLInputElement;
};

const form = document.querySelector<UploadForm>('.img-upload__form');
const wrapper = form!.querySelector<HTMLDivElement>('.img-upload__overlay');
const image = document.querySelector<HTMLImageElement>('.img-upload__preview img');
const effectsWrapper = document.querySelector<HTMLUListElement>('.effects__list');
const imagePreviews: NodeListOf<HTMLSpanElement> = effectsWrapper!.querySelectorAll('.effects__preview');
const sliderContainer = document.querySelector<HTMLDivElement>('.img-upload__effect-level');
const sliderWrapper = document.querySelector<HTMLDivElement>('.effect-level__slider');
const submitButton = form?.querySelector<HTMLButtonElement>('.img-upload__submit');

if (!form || !wrapper || !image || !sliderWrapper || !submitButton) {
	throw new Error('Form or her critical elements were not found.');
}

export { form, wrapper, image, imagePreviews, sliderContainer, sliderWrapper, effectsWrapper, submitButton };
