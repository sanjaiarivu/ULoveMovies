import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { productService } from '../api/productService';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');
      // Assuming you have a products/movies endpoint
      const data = await productService.getAllProducts();
      setMovies(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (movieId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    alert(`You rated movie ${movieId}! Feature coming soon.`);
  };

  const handleAddToFavorites = (movieId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  if (loading) return <div className="movies-container"><p>Loading movies...</p></div>;

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1>🎬 Discover Amazing Movies</h1>
        <p>Rate and add your favorite movies</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {movies.length === 0 ? (
        <div className="no-movies">
          <p>No movies available yet</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img src={movie.poster || 'https://via.placeholder.com/200x300'} alt={movie.name} />
              </div>
              <div className="movie-content">
                <h3>{movie.name || movie.title}</h3>
                <p className="movie-description">{movie.description || 'No description available'}</p>
                
                <div className="movie-actions">
                  <button
                    className="rate-btn"
                    onClick={() => handleRate(movie.id)}
                    title={isLoggedIn ? 'Rate this movie' : 'Login to rate'}
                  >
                    ⭐ Rate
                  </button>
                  <button
                    className={`favorite-btn ${favorites.has(movie.id) ? 'active' : ''}`}
                    onClick={() => handleAddToFavorites(movie.id)}
                    title={isLoggedIn ? 'Add to favorites' : 'Login to add to favorites'}
                  >
                    ❤️ {favorites.has(movie.id) ? 'Favorited' : 'Favorite'}
                  </button>
                </div>

                {!isLoggedIn && (
                  <div className="login-prompt">
                    <p>Login to rate and add favorites</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
