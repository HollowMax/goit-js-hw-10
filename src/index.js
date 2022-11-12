import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

const renderCountries = function (items) {
  let render = '';

  items.forEach(country => {
    render += `<li><div style="display: flex"><img src=${country.flag} alt="${country.name} falg" height="40px" width="70px"> <p style="margin-left: 15px; font-weight: bold;">${country.name}</p></div></li>`;
  });
  countryList.innerHTML = render;
};
const renderCountry = function (item) {
  const render = `<li><div style="display: flex"><img src=${item[0].flag} alt="${item[0].name} falg" height="40px" width="70px"> 
  <p style="margin:0 15px; font-weight: bold; font-size: 30px">${item[0].name}</p></div> <p><span>Capital: </span>${item[0].capital}</p><p><span>Population: </span>${item[0].population}</p><p><span>Language: </span>${item[0].languages[0].name}</p></li>`;
  countryList.innerHTML = render;
};

inputField.addEventListener(
  'input',
  debounce(e => {
    if (e.target.value.trim() !== '') {
      fetchCountries(e.target.value.trim())
        .then(items => {
          if (items.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
          } else if (items.length > 1 && items.length < 11) {
            renderCountries(items);
          } else if (items.length === 1) {
            renderCountry(items);
          }
        })
        .catch(e => {
          if (e.message === 'No valid') {
            Notify.failure('Oops, there is no country with that name');
          } else {
            console.log(e);
          }
        });
    } else {
      countryList.innerHTML = '';
    }
  }, 300)
);
