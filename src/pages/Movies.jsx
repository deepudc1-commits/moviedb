import React from 'react'
import { Filters, MoviesContainer } from '../components'
import { customFetch } from '../utils'

const popularMoviesQuery = (params, page = 1) => {
  const {sort_by, with_genres} = params
  return {
    queryKey: ['popularMovies', sort_by ?? '', with_genres ?? '', page],
    queryFn: () => customFetch('/discover/movie', {params: {...params, page}})
  }
}

export const loader = (queryClient) => async({request}) => {
  const sParams = new URL(request.url).searchParams
  //Here spread operator is not needed because .entries() itself provides iterables
  const params = Object.fromEntries(sParams.entries())
  let genreIDs = []
  if(sParams.has('with_genres')) {
    genreIDs = sParams.getAll('with_genres');
    params.with_genres = genreIDs.join(',')
  }
  const page = 1;
  console.log("Final params for API:", {...params, page})

  const response = await queryClient.ensureQueryData(popularMoviesQuery(params, page))
  const movies = response.data.results
  const totalPages = response.data.total_pages;
  const totalResults = response.data.total_results;
  console.log(response.data);
  
  console.log(movies);
  
  return {params, movies, genreIDs, totalPages, totalResults}
}

const Movies = () => {
  return (
    <div>
      <Filters />
      <MoviesContainer />
    </div>
  )
}

export default Movies
