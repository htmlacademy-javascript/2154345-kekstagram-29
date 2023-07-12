// const effects = document.querySelector('.effects');
// const effectsInputs = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level__slider');

// const onEffectClick = (evt) => {
// 	console.log(evt.target.value);
// };

// effectsInputs.forEach((input) => input.addEventListener('click', onEffectClick));

noUiSlider.create(
	slider,
	{
		range: {
			min: 0,
			max: 100
		},
		start: 100,
		step: 1,
  	connect: 'lower',
	}
);

