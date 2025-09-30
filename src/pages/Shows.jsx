import React from 'react'
import { ShowsContainer, ShowsFilters } from '../components';
import { customFetch } from '../utils';

const fetchShowsQuery = (params, page = 1) => {
    const {with_genres, sort_by, with_networks} = params
    return {
        queryKey: ['fetchShows', sort_by ?? '', with_networks ?? '', with_genres ?? '', page],
        queryFn: () => customFetch('/discover/tv', {params: {...params, page}})
    }
}

export const loader = (queryClient) => async({request}) => {
    const sParams = new URL(request.url).searchParams    
    const params = Object.fromEntries(sParams.entries());
    let genreIDs = [];
    if(sParams.has('with_genres')) {
        genreIDs = sParams.getAll('with_genres')
        params.with_genres = genreIDs.join(',')
    }
    
    const response = await queryClient.ensureQueryData(fetchShowsQuery(params))
    const shows = response.data.results;
    const totalPages = response.data.total_pages
    console.log(response);
    
    return {params, shows, genreIDs, totalPages}
}

const Shows = () => {
  return (
    <div className='px-10 bg-gray-200'>
      <ShowsFilters />
      <ShowsContainer />
    </div>
  )
}

export default Shows
