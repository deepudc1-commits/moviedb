import React, { Suspense, useState } from 'react'
import { customFetch, formatDate } from '../utils';
import { Await, Link, useLoaderData } from 'react-router';
import { FaLanguage, FaPlay } from 'react-icons/fa';
import { GrStatusInfo } from 'react-icons/gr';
import { MdOutlineTitle, MdLiveTv } from 'react-icons/md';
import { IoShapesOutline } from "react-icons/io5";
import { Card, MovieReview, PersonCard } from '../components';
import { useQuery } from '@tanstack/react-query';

const showDetailsQuery = (id) => {
  return {
    queryKey: ['showDetails', id],
    queryFn: () => customFetch(`/tv/${id}`)
  }
}

const showCreditsQuery = (id) => {
  return {
    queryKey: ['showCredits', id],
    queryFn: () => customFetch(`/tv/${id}/credits`)
  }
}

const showReviewsQuery = (id) => {
  return {
    queryKey: ['showReviews', id],
    queryFn: () => customFetch(`/tv/${id}/reviews`)
  }
}

const trailerQuery = (id) => {
  return {
    queryKey: ['fetchShowTrailer', id],
    queryFn: () => customFetch(`/tv/${id}/videos`)
  }
}

const recommendedShowsQuery = (id) => {
  return {
    queryKey: ['fetchRecommendedShows', id],
    queryFn: () => customFetch(`/tv/${id}/recommendations`)
  }
}

export const loader = (queryClient) => async({params}) => {
    const {tvID} = params
    const showDetails = await queryClient.ensureQueryData(showDetailsQuery(tvID))
    const showCredits = await queryClient.ensureQueryData(showCreditsQuery(tvID))
    const showReviewsResponse = await queryClient.ensureQueryData(showReviewsQuery(tvID))
    const showReviews = showReviewsResponse?.data?.results
    const recommendedShowsResponse = await queryClient.ensureQueryData(recommendedShowsQuery(tvID))
    const recommendedShows = recommendedShowsResponse?.data?.results
    void queryClient.prefetchQuery(trailerQuery(tvID))
    
    console.log(recommendedShows);
    
    return {showDetails, showCredits, showReviews, recommendedShows, tvID}
}

const SingleShow = () => {
    const {showDetails, showCredits, showReviews, recommendedShows, tvID} = useLoaderData()
    const {cast} = showCredits.data
    console.log(showDetails.data);
      const [showTrailer, setShowTrailer] = useState(false)
    
    const { id, name, overview, tagline, poster_path, backdrop_path, episode_run_time, first_air_date, genres, vote_average, status, type, original_name, original_language, networks } = showDetails.data
    const vote = Math.round(vote_average * 10)

    const {data: trailerResponse} = useQuery(trailerQuery(id))
    const trailerData = trailerResponse?.data?.results;
    const trailer = trailerData?.find((video) => video.type === "Trailer" && video.site === "YouTube")
    
    const playTrailer = () => {
      setShowTrailer(true)
      document.getElementById('trailerModal').showModal()    
      setShowTrailer(false)
    }

  return (
    <div>
      <div className='mb-10 bg-gray-200 bg-cover' style={{backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`}}>
        <div className='overlay p-10'>
          <div className='grid grid-cols-4 gap-5'>
            <div>
              <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`} alt={name} />
            </div>
            <div className='col-span-3 text-white'>
              <h1 className='font-bold mb-1'>{name}</h1>
              <ul className='flex list-disc list-inside gap-3 mb-4'>
                {first_air_date &&<li>{formatDate(first_air_date)}</li> }
                <li>{episode_run_time.length > 0 ? episode_run_time[0] : '0'} m</li>
                <li>
                  {
                    genres.map((genre, index) => {
                      return <span key={genre.id}>{genre.name}{index === genres.length-1 ? '' : ','} </span>
                    })
                  }
                </li>
              </ul>
              
              <div className='flex items-center mb-5'>
                <div className="radial-progress bg-primary text-primary-content border-primary border-4 mr-3"
                  style={{ "--value": vote } /* as React.CSSProperties */ } aria-valuenow={vote} role="progressbar">
                  <span className='text-2xl font-bold'>{vote}%</span>
                </div>
                <span className='font-semibold text-lg mr-5'>User <br />score</span>
                {trailer && <button className='btn btn-success' onClick={() => playTrailer()}><FaPlay />Play Trailer</button>}
              </div>

              {tagline && <p className='italic text-lg'>{tagline}</p>}
              <h3 className='font-semibold text-2xl'>Overview</h3>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>


      <div className='grid grid-cols-4 gap-5'>
        <div className='col-span-3'>
          <div className='mb-10'>
            <div className='px-10'>
              <h2 className="text-2xl font-bold text-start mb-5">Cast</h2>
              <div className='container grid grid-flow-col auto-cols-[9rem] overflow-x-auto gap-8'>
                <PersonCard products={cast} />
              </div>
            </div>
          </div>

          <div className='mb-10 px-10'>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-bold text-start mb-5">Reviews</h2> 
              { showReviews.length > 1 && <Link to={`/tv/${tvID}/reviews`} className='text-end'>View all reviews</Link> }
            </div>
            <div>
              {
                showReviews.length < 1 ? <p>There are no reviews for this yet.</p> : <MovieReview review={showReviews[showReviews.length - 1]} />
              }
            </div>
          </div>

          { recommendedShows.length < 1 ? null : 
          <div className='mb-10'>
            <div className='px-10'>
              <h2 className="text-2xl font-bold text-start mb-5">Recommended series</h2>
              <div className='container grid grid-flow-col auto-cols-[16rem] overflow-x-auto gap-8'>
                <Card products={recommendedShows} />
              </div>
            </div>
          </div>
          }
        </div>
          

        <div>
          {networks.length > 0 && <>
            <div className='flex items-center mb-2'>
              <MdLiveTv className='text-xl mr-2' />
              <h3 className='font-semibold'>Network</h3>
            </div>
            <Link to={`/shows?with_networks=${networks[0].id}`}>
              <img className='max-w-18 mb-5' src={`https://image.tmdb.org/t/p/h60${networks[0].logo_path}`} />
            </Link>
            </>
          }

          <div className='flex items-center'>
            <GrStatusInfo className='text-xl mr-2' />
            <h3 className='font-semibold'>Status</h3>
          </div>
          <p>{status}</p>
        
          <div className='flex items-center'>
            <FaLanguage className='text-xl mr-2' />
            <h3 className='font-semibold'>Original language</h3>
          </div>
          <p>{original_language}</p>

          <div className='flex items-center'>
            <MdOutlineTitle className='text-xl mr-2' />
            <h3 className='font-semibold'>Original title</h3>
          </div>
          <p>{original_name}</p>

          <div className='flex items-center'>
            <IoShapesOutline className='text-xl mr-2' />
            <h3 className='font-semibold'>Type</h3>
          </div>
          <p>{type}</p>
        </div>
      </div>

      {
        trailer && <>
        <dialog id='trailerModal' className="modal">
            <div className="modal-box">
                <iframe width="100%" height="300" src={`//www.youtube.com/embed/${trailer.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}></iframe>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
      </dialog></>
      }
    </div>
  )
}

export default SingleShow
