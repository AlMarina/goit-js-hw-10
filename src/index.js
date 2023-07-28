
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    infoEl: document.querySelector('.cat-info'),
}

refs.selectEl.hidden = true;
refs.errorEl.hidden = true;

fetchBreeds()
    .then(renderBreedSelect)
    .catch(()=>Notify.failure('Oops! Something went wrong! Try reloading the page!'))



function renderBreedSelect(data) { 
    refs.loaderEl.hidden = true;
    refs.selectEl.hidden = false;
  refs.selectEl.innerHTML = markupBreedSelect(data);
}

function markupBreedSelect(arr) {
  return arr
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
}

refs.selectEl.addEventListener('change', breedCheck);


function breedCheck(evt) {
    evt.preventDefault();
    const breed = evt.target.value;
    refs.loaderEl.hidden = false;
    fetchCatByBreed(breed)
    .then(data => renderCatInfo(data[0]) )
    .catch(()=>Notify.failure('Oops! Something went wrong! Try reloading the page!'))

 }

function renderCatInfo(cat) {
    refs.loaderEl.hidden = true;
    refs.infoEl.innerHTML = markupCatInfo(cat, cat.breeds[0]);
}

function markupCatInfo({ url }, { name, description, temperament }) {
  return `<img src="${url}" alt="${name}" width=450>
      <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
      </div>`;
}