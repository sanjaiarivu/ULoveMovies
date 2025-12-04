
import axios from 'axios';  

const API_URL = 'https://localhost:1234/api/movies/';

const listMovies = () => axios.get(API_URL);

