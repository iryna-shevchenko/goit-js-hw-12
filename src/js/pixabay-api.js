import axios from 'axios';

const API_KEY = '44479541-afd008fbdfda4a6c986ece69f'; 

export async function getImages(searchQuery, currentPage) {
  
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 15,
      },
    });
   
    return data;
}