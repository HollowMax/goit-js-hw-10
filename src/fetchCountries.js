export const fetchCountries = function (name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`
  )
    .then(items => {
      if (!items.ok) {
        throw new Error('No valid');
      }
      return items.json();
    })
    .then(items => items);
};
