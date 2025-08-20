import React from 'react'
import { customFetch } from '../utils'
import { Link, useLoaderData } from 'react-router-dom'
import { MovieReview } from '../components'

const movieDetailsQuery = (id) => {
  return {
    queryKey: ['movieDetails', id],
    queryFn: () => customFetch(`/movie/${id}`)
  }
}

const movieReviewsQuery = (id) => {
  return {
    queryKey: ['fetchReviews', id],
    queryFn: () => customFetch(`/movie/${id}/reviews`)
  }
}

export const loader = (queryClient) => async({params}) => {
    const {movieID} = params
    const movieDetailsResponse = await queryClient.ensureQueryData(movieDetailsQuery(movieID))
    const movieDetails = movieDetailsResponse?.data
    const movieReviewsResponse = await queryClient.ensureQueryData(movieReviewsQuery(movieID))
    const movieReviews = movieReviewsResponse?.data?.results
    
    return {movieDetails, movieReviews, movieID}
}

const AllReviewsMovie = () => {
    const {movieDetails, movieReviews, movieID} = useLoaderData()
    const {title, poster_path} = movieDetails
    console.log(movieDetails);
    
  return (
    <div>
        <div className='mb-10 bg-gray-200 bg-cover'>
            <div className='overlay p-10'>
                <div className='grid grid-cols-8 gap-5 items-center'>
                    <div>
                        <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`} alt={title} />
                    </div>
                    <div className='col-span-7'>
                        <h1 className='text-white mb-5'>{title}</h1>
                        <Link to={`/movie/${movieID}`} className='btn btn-success'>Back to movie</Link>
                    </div>
                    
                </div>
            </div>
        </div>  

        <div className='grid grid-cols-4 gap-5'>
            <div className='col-span-4'>
                <div className='mb-10 px-10'>
                    <h2 className="text-2xl font-bold text-start mb-5">Reviews</h2> 
                    <div>
                        {movieReviews.map(review => <MovieReview key={review.id} review={review} />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllReviewsMovie
