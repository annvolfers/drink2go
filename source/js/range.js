const rangeContainer = document.querySelector('.range');
const rangeElement = rangeContainer.querySelector('.range__target');
const inputMinPrice = rangeContainer.querySelector('[name="min-price"]');
const inputMaxPrice = rangeContainer.querySelector('[name="max-price"]');

const RangeSettings = {
  MIN_VALUE: parseInt(inputMinPrice.min, 10),
  MAX_VALUE: parseInt(inputMinPrice.max, 10),
  START_MIN: parseInt(inputMinPrice.value, 10) || parseInt(inputMinPrice.min, 10),
  START_MAX: parseInt(inputMaxPrice.value, 10) || parseInt(inputMinPrice.max, 10),
};

function inputChangeHandler() {
  rangeElement.noUiSlider.set([inputMinPrice.value, inputMaxPrice.value]);
}

function setListeners() {
  rangeElement.noUiSlider.on('update', () => {
    inputMinPrice.value = rangeElement.noUiSlider.get()[0];
    inputMaxPrice.value = rangeElement.noUiSlider.get()[1];
  });

  inputMinPrice.addEventListener('change', inputChangeHandler);
  inputMaxPrice.addEventListener('change', inputChangeHandler);
}

function setAvailability() {
  if (inputMinPrice.disabled) {
    rangeElement.querySelectorAll('.range__handle')[0].setAttribute('disabled', true);
    rangeElement.noUiSlider.disable(0);
  }
  if (inputMaxPrice.disabled) {
    rangeElement.querySelectorAll('.range__handle')[1].setAttribute('disabled', true);
    rangeElement.noUiSlider.disable(1);
  }
  if (inputMinPrice.disabled && inputMaxPrice.disabled) {
    rangeElement.classList.add('range__target--disabled');
    rangeElement.noUiSlider.disable();
  }
}

noUiSlider.create(rangeElement, {
  start: [RangeSettings.START_MIN, RangeSettings.START_MAX],
  range: {
    'min': RangeSettings.MIN_VALUE,
    'max': RangeSettings.MAX_VALUE
  },
  connect: true,
  handleAttributes: [
    { 'aria-label': 'Изменить минимальную цену.' },
    { 'aria-label': 'Изменить максимальную цену.' },
  ],
  cssPrefix: 'range__',
  format: {
    to: function (value) {
      return Math.trunc(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

setListeners();
setAvailability();

rangeElement.classList.remove('range__target--nojs');
