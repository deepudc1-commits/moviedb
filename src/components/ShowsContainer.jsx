import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Card from './Card';
import { customFetch } from '../utils';
import { useQueryClient } from '@tanstack/react-query';

const fetchShowsQuery = (queryParams, page) => {
  const {with_genres, sort_by} = queryParams;
  return {
      queryKey: ['fetchNewShows', sort_by ?? '', with_genres ?? '', page],
      queryFn: () => customFetch('/discover/tv', {params: {...queryParams, page}})
  }
}

const ShowsContainer = () => {
  const queryClient = useQueryClient()
  const {shows: initialShows, totalPages: initialTotalPages, params} = useLoaderData();
  const [shows, setShows] = useState(initialShows)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    setShows(initialShows)
    setCurrentPage(1)
    setTotalPages(initialTotalPages)
  }, [initialShows, initialTotalPages, params])

  const loadMoreShows = async() => {
    setIsLoadingMore(true)
    const nextPage = currentPage + 1
    try {
      const response = await queryClient.fetchQuery(fetchShowsQuery(params, nextPage))
      setShows((prevShows) => [...prevShows, ...response.data.results] )
      setCurrentPage(nextPage)
      setTotalPages(response.data.total_pages)
      setIsLoadingMore(false)
    } catch (error) {
      console.log(error);
      setIsLoadingMore(false)
    }
  }
  
  if(shows.length < 1) {
    return <h2 className='my-20'>There are no shows with these set of filters!</h2>
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        <Card products={shows} />
      </div>
      <div className='flex justify-center mt-8 mb-8'>
        {
          currentPage < totalPages && <button onClick={loadMoreShows} disabled={isLoadingMore} className='btn btn-success mx-auto'>{isLoadingMore? 'Loading...' : 'Load more'}</button>
        }
      </div>
    </>
  )
}

export default ShowsContainer
