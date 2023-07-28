const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds';
const END_POINT_IMAGES = 'images/search';
const API_KEY = 'live_aHeqbotwFvIx332d1BZqNMwlp6AeERPUSsxUJHLKiye0C2913PM3gITi9gFdYMzN';

export function fetchBreeds() { 
    return fetch(`${BASE_URL}${END_POINT_BREEDS}?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId) { 
    return fetch(`${BASE_URL}${END_POINT_IMAGES}?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }) 
}