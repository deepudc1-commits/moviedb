
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Card from './Card';
import { useQueryClient } from '@tanstack/react-query';
import { customFetch } from '../utils';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import WideCard from './WideCard';

// Use the same query logic as in the loader, but for the next page
const popularMoviesQuery = (queryParams, pageNum) => {
  const { sort_by, with_genres } = queryParams;
  return {
    queryKey: ['popularMovies', sort_by ?? '', with_genres ?? '', pageNum],
    queryFn: () => customFetch('/discover/movie', { params: { ...queryParams, page: pageNum } })
  };
};

const MoviesContainer = () => {
    const {movies: initialMovies, params, totalPages: initialTotalPages} = useLoaderData();
    const [movies, setMovies] = useState(initialMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [wideView, setWideView] = useState(false)
    const queryClient = useQueryClient()
    
    // Reset movies and page when filters (params) change
    useEffect(() => {
      setMovies(initialMovies);
      setCurrentPage(1);
      setTotalPages(initialTotalPages);
    }, [initialMovies, params, initialTotalPages]);

    const handleLoadMore = async () => {
      setIsLoadingMore(true)
      const nextPage = currentPage + 1;
      try {
        const response = await queryClient.fetchQuery(popularMoviesQuery(params, nextPage));
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setCurrentPage(nextPage);
        setTotalPages(response.data.total_pages); // Update total pages in case it changes (unlikely for TMDB, but good practice)
        setIsLoadingMore(false)
      } catch (error) {
        console.error("Error fetching more movies:", error);
        setIsLoadingMore(false)
        // Handle error, maybe show a message to the user
      }
    };

    if(movies.length < 1) {
    return <h2 className='my-20'>There are no shows with these set of filters!</h2>
  }

  return (
    <div>
      <div className='flex justify-between items-center mt-9 pb-5'>
        <h4 className="font-medium text-md">Results:</h4>
        <div className='hidden md:flex gap-x-2'>
          <button className={`text-xl btn btn-circle btn-sm ${wideView ? 'btn-accent text-accent-content' : 'btn-ghost text-based-content' }`} onClick={() => setWideView(true)}><BsList /></button>
          <button className={`text-xl btn btn-circle btn-sm ${!wideView ? 'btn-accent text-accent-content' : 'btn-ghost text-based-content' }`} onClick={() => setWideView(false)}><BsFillGridFill /></button>
        </div>
      </div>
      {wideView ? <WideCard products={movies} isMovie={true} /> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={movies} isMovie={true} /></div>}
      {currentPage < totalPages && (
        <div className='flex justify-center mt-8 mb-8'>
          <button 
            onClick={handleLoadMore} 
            className='btn btn-primary'
            disabled={isLoadingMore} // Disable button while loading
          >
            {isLoadingMore ? 'Loading...' : 'Load More'} {/* Change button text */}
          </button>
        </div>
      )}
    </div>
  )
}

export default MoviesContainer
