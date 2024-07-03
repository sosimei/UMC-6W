import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { debounce } from 'lodash';
import Movie from '../components/Movie';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
`;

const WelcomeText = styled.div`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #22254b;
  width: 100%;
  padding: 50px 0;
`;

const SearchTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 24px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: #ffcc00;
  border: none;
  border-radius: 50%;
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.span`
  font-size: 20px;
`;

const ResultsContainer = styled.div`
  display: grid;
  background-color: grey;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px; /* 줄인 Space between items */
  margin-top: 20px;
  max-height: 60vh; 
  overflow-y: auto; 
  padding: 0 20px; /* Add padding to the sides to prevent items from touching the edges */
  width: 45%; /* Adjust width to fit the content more nicely */
  justify-content: center; 
  align-items: start;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 18px;
  margin-top: 20px;
`;

export default function MainPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchQuery) => {
    if (searchQuery.trim() === '') return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c004e3cbb51120f3feda30eae128a1af&query=${searchQuery}&include_adult=false&language=ko&page=1&region=KR`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data from TMDB', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchMovies(newQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    debouncedFetchMovies(query);
  };

  return (
    <PageContainer>
      <WelcomeText>환영합니다</WelcomeText>
      <SearchSection>
        <SearchTitle>🎥 Find your movies !</SearchTitle>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
          />
          <SearchButton type="submit">
            <SearchIcon role="img" aria-label="search">🔍</SearchIcon>
          </SearchButton>
        </SearchForm>
        {isLoading ? (
          <LoadingMessage>데이터를 받아오는 중 입니다</LoadingMessage>
        ) : (
          <ResultsContainer>
            {error ? (
              <LoadingMessage>{error}</LoadingMessage>
            ) : (
              movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  overview={movie.overview}
                  release_date={movie.release_date}
                />
              ))
            )}
          </ResultsContainer>
        )}
      </SearchSection>
    </PageContainer>
  );
}
