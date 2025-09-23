import React, { Suspense, useState } from 'react'
import { customFetch, formatDate, formatPrice, formatTime } from '../utils'
import { Await, Link, useLoaderData} from 'react-router';
import { Card, MovieReview, PersonCard } from '../components';
import { useQuery } from '@tanstack/react-query';
import movieIcon from '../assets/movie_icon.png'
import { FaLanguage, FaInfo, FaPlay } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney, GrStatusInfo } from "react-icons/gr";
import { MdOutlineTitle } from "react-icons/md";

const movieDetailsQuery = (id) => {
  return {
    queryKey: ['movieDetails', id],
    queryFn: () => customFetch(`/movie/${id}`)
  }
}

const trailerQuery = (id) => {
  return {
    queryKey: ['fetchTrailer', id],
    queryFn: () => customFetch(`/movie/${id}/videos`)
  }
}

const reviewsQuery = (id) => {
  return {
    queryKey: ['fetchReviews', id],
    queryFn: () => customFetch(`/movie/${id}/reviews`)
  }
}

const recommendedMoviesQuery = (id) => {
  return {
    queryKey: ['fetchRecommendedMovies', id],
    queryFn: () => customFetch(`/movie/${id}/recommendations`)
  }
}

export const loader = (queryClient) => async({params}) => {
  const {movieID} = params
  
  const movieDetails = await queryClient.ensureQueryData(movieDetailsQuery(movieID))
  const movieCreditsResponse = customFetch(`/movie/${movieID}/credits`);
  void queryClient.prefetchQuery(trailerQuery(movieID))
  const movieReviewsResponse = await queryClient.ensureQueryData(reviewsQuery(movieID))
  const movieReviews = movieReviewsResponse.data.results

  const movieRecommendationResponse = await queryClient.ensureQueryData(recommendedMoviesQuery(movieID))
  const movieRecommendations = movieRecommendationResponse?.data?.results
  console.log(movieRecommendationResponse);
  
  return ({movieDetails, movieCredits: movieCreditsResponse, movieReviews, movieRecommendations})
}

const SingleMovie = () => {
  const {movieDetails, movieCredits, movieReviews, movieRecommendations} = useLoaderData()
  console.log(movieDetails);
  const [showTrailer, setShowTrailer] = useState(false)

  const {id, title, backdrop_path, poster_path, release_date, runtime, genres, overview, tagline, status, original_language, original_title, budget, revenue, vote_average} = movieDetails.data
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
      <div className='mb-10 bg-gray-200 bg-cover' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`}}>
        <div className='overlay p-10'>
          <div className='md:grid md:grid-cols-4 gap-5'>
            <div className='mb-5 md:mb-0'>
              <img className='rounded-lg' src={ poster_path ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}` : movieIcon} alt={title} />
            </div>
            <div className='col-span-3 text-white'>
              <h1 className='font-bold mb-1'>{title}</h1>
              <ul className='md:flex list-disc list-inside gap-3 mb-4'>
                <li>{formatDate(release_date)}</li>
                <li>{formatTime(runtime)}</li>
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

                { trailer && <button className='btn btn-success' onClick={() => playTrailer()}><FaPlay />Play Trailer</button> }
              </div>

              {tagline && <p className='italic text-lg'>{tagline}</p>}
              <h3 className='font-semibold text-2xl'>Overview</h3>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
                
      <div className='grid md:grid-cols-4 gap-5'>
        <div className='col-span-3'>
          <div className='mb-10'>
            <Suspense fallback={<div>Loading...</div>}>
              <Await resolve={movieCredits}>
                {
                  (creditsResponse) => {
                    const {cast} = creditsResponse.data
                    return (
                      <div className='px-10'>
                        <h2 className="text-2xl font-bold text-start">Cast</h2>
                        <div className='container'>
                          <div className='max-w-70 sm:max-w-screen grid grid-flow-col auto-cols-[9rem] overflow-x-auto gap-8 pt-5'>
                            <PersonCard products={cast} hasCharacter={true} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
              </Await>
            </Suspense>
          </div>

          <div className='mb-10 px-10'>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-bold text-start mb-5">Reviews</h2> 
              { movieReviews?.length > 1 && <Link to={`/movie/${id}/reviews`} className='text-end'>View all reviews</Link> }
            </div> 
            <div>
              {
                movieReviews?.length < 1 ? <p>There are no reviews for this yet.</p> : <MovieReview review={movieReviews[movieReviews.length - 1]} />
              }
            </div>
          </div>

          { movieRecommendations.length < 1 ? null : 
            <div className='mb-10'>
              <div className='px-10'>
                <h2 className="text-2xl font-bold text-start mb-5">Recommended movies</h2>
                <div className='container'>
                  <div className='max-w-70 sm:max-w-screen grid grid-flow-col auto-cols-[16rem] overflow-x-auto gap-8'>
                    <Card products={movieRecommendations} isMovie={true} />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <div className='pr-5 pl-10 md:pl-0 order-first md:order-last'>
          <div className='flex items-center mb-2'>
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
          <p>{original_title}</p>

          <div className='flex items-center'>
            <GrMoney className='text-xl mr-2' />
            <h3 className='font-semibold'>Budget</h3>
          </div>
          <p>{formatPrice(budget)}</p>

          <div className='flex items-center'>
            <GiMoneyStack className='text-xl mr-2' />
            <h3 className='font-semibold'>Revenue</h3>
          </div>
          <p>{formatPrice(revenue)}</p>
        </div>
      </div>

      {
        trailer && (
        <dialog id='trailerModal' className="modal">
            <div className="modal-box">
                <iframe width="100%" height="300" src={`//www.youtube.com/embed/${trailer.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}></iframe>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
      </dialog>)
      }
      
    </div>
  )
}

export default SingleMovie
