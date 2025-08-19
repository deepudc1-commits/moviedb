import React from 'react'
import { customFetch } from '../utils'
import { Link, useLoaderData } from 'react-router-dom'
import { MovieReview } from '../components'

const showDetailsQuery = (id) => {
  return {
    queryKey: ['showDetails', id],
    queryFn: () => customFetch(`/tv/${id}`)
  }
}

const showReviewsQuery = (id) => {
  return {
    queryKey: ['showReviews', id],
    queryFn: () => customFetch(`/tv/${id}/reviews`)
  }
}

export const loader = (queryClient) => async({params}) => {
    const {tvID} = params
    const detailsResponse = await queryClient.ensureQueryData(showDetailsQuery(tvID))
    const showDetails = detailsResponse?.data
    const showsResponse = await queryClient.ensureQueryData(showReviewsQuery(tvID))
    const showReviews = showsResponse?.data?.results
    
    return {showDetails, showReviews, tvID}
}

const AllReviews = () => {
    const {showDetails, showReviews, tvID} = useLoaderData()
    const {name, poster_path} = showDetails
    console.log(showDetails);
    
  return (
    <div>
        <div className='mb-10 bg-gray-200 bg-cover'>
            <div className='overlay p-10'>
                <div className='grid grid-cols-8 gap-5 items-center'>
                    <div>
                        <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`} alt={name} />
                    </div>
                    <div className='col-span-7'>
                        <h1 className='text-white mb-5'>{name}</h1>
                        <Link to={`/tv/${tvID}`} className='btn btn-success'>Back to TV series</Link>
                    </div>
                    
                </div>
            </div>
        </div>  

        <div className='grid grid-cols-4 gap-5'>
            <div className='col-span-3'>
                <div className='mb-10 px-10'>
                    <h2 className="text-2xl font-bold text-start mb-5">Reviews</h2> 
                    <div>
                        {showReviews.map(review => <MovieReview key={review.id} review={review} />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllReviews
