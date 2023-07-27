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

const formElement = document.querySelector<UploadForm>('.img-upload__form');
const wrapperElement = formElement!.querySelector<HTMLDivElement>('.img-upload__overlay');
const imageElement = document.querySelector<HTMLImageElement>('.img-upload__preview img');
const effectsWrapperElement = document.querySelector<HTMLUListElement>('.effects__list');
const imagePreviewElements = effectsWrapperElement!.querySelectorAll<HTMLSpanElement>('.effects__preview');
const sliderContainerElement = document.querySelector<HTMLDivElement>('.img-upload__effect-level');
const sliderWrapperElement = document.querySelector<HTMLDivElement>('.effect-level__slider');
const submitButtonElement = formElement?.querySelector<HTMLButtonElement>('.img-upload__submit');

if (!formElement || !wrapperElement || !imageElement || !sliderWrapperElement || !submitButtonElement) {
	throw new Error('Form or her critical elements were not found.');
}

export { formElement, wrapperElement, imageElement, imagePreviewElements, sliderContainerElement, sliderWrapperElement, effectsWrapperElement, submitButtonElement };
