import React, { Suspense, useState } from 'react'
import { customFetch, fetchWithErrorHandling, genresList, networksList } from '../utils'
import { Card, PersonCard, ShowCard } from '../components'
import { Await, Form, Link, useLoaderData } from 'react-router-dom';
import { QueryClient, usePrefetchQuery, useQuery } from '@tanstack/react-query';
import { FaPlayCircle } from "react-icons/fa"

const fetchTrendingMovies = async (duration) => {
  const { data } = await customFetch.get(`/trending/movie/${duration}`);
  return data.results;
};

const fetchTrendingShows = async (duration) => {
  const { data } = await customFetch.get(`/trending/tv/${duration}`);
  return data.results;
};

const fetchTrendingPeople = async() => {
  const {data} = await customFetch('/person/popular')
  return data.results
}

const popularMoviesQuery = (duration) => {
  return {
    queryKey: ['popularMovies', duration],
    queryFn: () => customFetch.get(`/trending/movie/${duration}`)
  }
}

const trendingVideosQuery = (id) => {
  return {
    queryKey: ['trendingVideos', id],
    queryFn: () => customFetch(`/movie/${id}/videos`)
  }
}

const trailerQuery = (id) => {
  return {
    queryKey: ['fetchTrailer'],
    queryFn: () => customFetch(`/movie/${id}/videos`)
  }
}


export const loader = (queryClient) => async() => {
  const initialMoviePromise = queryClient.prefetchQuery({
    queryKey: ['trendingMovies', 'week'],
    queryFn: () => fetchTrendingMovies('week')
  })

  const initialShowPromise = queryClient.prefetchQuery({
    queryKey: ['trendingShows', 'week'],
    queryFn: () => fetchTrendingShows('week')
  })
  
  const initialPeoplePromise = queryClient.prefetchQuery({
    queryKey: ['popularPeople'],
    queryFn: () => fetchTrendingPeople()
  })

  const popularMovies = await queryClient.ensureQueryData(popularMoviesQuery('week'))
  
  

  return {initialMovies: initialMoviePromise, initialShows: initialShowPromise, initialPeople: initialPeoplePromise, popularMovies}
}

const Landing = () => {
  const {initialMovies, initialShows, initialPeople, popularMovies} = useLoaderData();
  const [topMovieDuration, setTopMovieDuration] = useState('week')
  const [topShowDuration, setTopShowDuration] = useState('week')
  

  const { data: topMovieData, isLoading: isLoadingMovies, isError: isErrorMovies, error: movieError } = useQuery({
    queryKey: ['trendingMovies', topMovieDuration],
    queryFn: () => fetchTrendingMovies(topMovieDuration),
    // If you want to suspend on subsequent loads too, you might need
    // to configure a custom suspense hook or use useSuspenseQuery
    // but for simple button clicks, isLoading is sufficient for UI feedback.
  }); 

  const { data: topShowData, isLoading: isLoadingShows, isError: isErrorShows, error: showError } = useQuery({
    queryKey: ['trendingShows', topShowDuration],
    queryFn: () => fetchTrendingShows(topShowDuration)
  })

  const {data: topPeopleData, isLoading: isLoadingPeople} = useQuery({
    queryKey: ['popularPeople'],
    queryFn: () => fetchTrendingPeople()
  })

  
 
  const slicedMovies = popularMovies.data.results.slice(0,4)
  const trailerBackgrounds = [];
  slicedMovies.map(movie => trailerBackgrounds.push(movie)) 

  let banners = []
  console.log(popularMovies);
  
  popularMovies.data.results.map(movie => banners.push(movie.backdrop_path))
  let randomBannerFunc = () => {
    let random = Math.floor(Math.random() * banners.length)
    return banners[random]
  }

  console.log(trailerBackgrounds);

  const [banner, setBanner] = useState(randomBannerFunc)
  const [trailerBanner, setTrailerBanner] = useState(trailerBackgrounds[0].backdrop_path)
  
  const changeVideoBanner = (movieID) => {
    console.log(movieID);
    const newBanner = trailerBackgrounds.find((item) => item.id === movieID)
    console.log(newBanner);
    setTrailerBanner(newBanner['backdrop_path'])
  }

  const compQueryClient = new QueryClient()

  const [trailerModalKey, setTrailerModalKey] = useState('')
  const [isTrailerLoading, setIsTrailerLoading] = useState(false)

  const openTrailerModal = async(id) => {
    setIsTrailerLoading(true)
    document.getElementById(`trailerModal${id}`).showModal()
    const response = await compQueryClient.fetchQuery(trailerQuery(id))
    console.log(response);
    
    const trailer = response.data.results.find((video) => video.type === "Trailer" && video.site === "YouTube")
    setTrailerModalKey(trailer.key)
    setIsTrailerLoading(false)
  }
  
  return (
    <div>
      <div
        className="hero min-h-92"
        style={{backgroundImage:`url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${banner})`, backgroundPosition: 'center center'}}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center px-10 md:px-0">
          <div className="max-w-5xl">
            <h1 className="mb-5 md:text-5xl font-bold">Welcome to FilmsVault</h1>
            <p className="mb-5 md:text-2xl">
              Your ultimate guide to movies and shows, where every story finds its spotlight. <br /> <span className='hidden md:block'>Discover what’s worth watching and why.</span>
            </p>
            <div className='mb-5'>
              <Form action='/search' method='get'>
                <label className="input w-full md:w-4/5 focus:outline-none">
                  <svg className="h-[1em] text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input className='input input-md focus:outline-none placeholder-gray-400 text-black' type='search' placeholder='search' name='query' />
                </label>
                <button className='btn btn-accent w-full md:w-30 md:ml-1 mt-2 md:mt-0' type='submit'>Search</button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      
      <div className='mb-5 '>
        <div className='px-10 py-15'>
          <h2 className='text-2xl font-bold text-start mb-5'>Movie Genres</h2>
            <ul className='flex flex-wrap gap-6'>
              {genresList.map((movieGenre) => {
                const {id, name, icon} = movieGenre
                return <li key={id}><Link to={`/movies?with_genres=${id}`} className='btn btn-ghost py-6'><img className='mr-1' style={{width: '30px',}} src={icon} />{name}</Link></li>
              })}
            </ul>
        </div>
      </div>


      <div className='mb-10 px-10 py-10 bg-gray-200'>
        <div className='md:flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-start mb-3'>Trending movies</h2>
          <div className='md:text-end mb-5'>
            <button className={`btn ${topMovieDuration === 'week' ? 'btn-outline' : null}  btn-accent`} onClick={() => setTopMovieDuration('day')}>Today</button> | <button className={`btn ${topMovieDuration === 'day' ? 'btn-outline' : null}  btn-accent`} onClick={() => setTopMovieDuration('week')}>This week</button>
          </div>
        </div>

        <Suspense fallback={<div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>}>
          <Await resolve={initialMovies} errorElement={<div>Failed to load initial movies!</div>}>
            {/*
              The Await's child function is called when the promise resolves.
              At this point, topMovieData (from useQuery) should be available
              from React Query's cache.
              We also check isLoadingMovies here for subsequent button clicks.
            */}
            {() => (
              isLoadingMovies ? (
                <div><span className="loading loading-dots loading-xl"></span></div>
              ) : (
                topMovieData && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={topMovieData} isMovie={true} isFeaturedProducts={true} /></div>
              )
            )}
          </Await>
        </Suspense>
      </div>


      <div className='mb-5 '>
        <div className='px-10 py-15'>
          <h2 className='text-2xl font-bold text-start mb-3'>Networks</h2>
            <ul className='flex flex-wrap gap-12 justify-center items-center'>
              {
                networksList.map((network) => {
                  const {id, name, logo_path} = network
                  return <li key={id}><Link to={`/shows?with_networks=${id}`}><img className='logos transition-all hover:scale-120' src={`https://image.tmdb.org/t/p/original${logo_path}`} alt={name} /></Link></li>
                })
              }
            </ul>
        </div>
      </div>

      <div className='bg-cover bg-center' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h427_multi_faces${trailerBanner})`}}>      
        <div className='overlay px-10 py-20'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-start mb-5 text-white'>Top Trailers</h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                      {popularMovies?.data?.results.slice(0, 4).map((movie) => {
                        const {title, id, backdrop_path} = movie
                        return <div key={id} className='cursor-pointer' onMouseOver={() => changeVideoBanner(id)} onClick={()=>openTrailerModal(id)}>
                          <div className='relative group'>
                            <img className='transition group-hover:scale-105 rounded-md shadow shadow-gray-800 mb-5' src={`https://image.tmdb.org/t/p/w710_and_h400_multi_faces${backdrop_path}`} />
                            <FaPlayCircle className='absolute top-2/5 left-2/5 transition group-hover:scale-110 shadow-lg shadow-black rounded-full text-5xl text-white' />
                          </div>
                          <h3 className='text-white text-center'>{title}</h3>
                          
                          <dialog id={`trailerModal${id}`} className="modal">
                            <div className="modal-box">
                              {
                                isTrailerLoading ? <p>'Loading trailer...'</p> : <iframe width="100%" height="300" src={`//www.youtube.com/embed/${trailerModalKey}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}></iframe>
                              }
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      })}
                    </div>
        </div>
      </div>


      <div className='px-10 py-10 bg-gray-200'>
        <div className='md:flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-start mb-3'>Trending shows</h2>
          <div className='md:text-end mb-5'>
            <button className={`btn ${topShowDuration === 'week' ? 'btn-outline' : null}  btn-accent`} onClick={() => setTopShowDuration('day')}>Today</button> | <button className={`btn ${topShowDuration === 'day' ? 'btn-outline' : null}  btn-accent`} onClick={() => setTopShowDuration('week')}>This week</button>
          </div>
        </div>

          <Suspense fallback={<div>Loading trending shows...</div>}>
            <Await resolve={initialShows} errorElement={<div>Failed to load initial shows!</div>}>
              {() => (
                isLoadingShows ? (
                  <div>Loading new shows data...</div>
                ) : (
                  topShowData && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={topShowData} isFeaturedProducts={true} /></div>
                )
              )}
            </Await>
          </Suspense>
      </div>

      <div className='px-10 py-20'>
        <h2 className='text-2xl font-bold text-start mb-5'>Popular people</h2>
        <Suspense fallback={<div><span className="loading loading-dots loading-xl"></span></div>}>
          <Await resolve={initialPeople} errorElement={<div>Failed to load popular people!</div>}>
              {() => {
                return isLoadingPeople ? (<div>Loading people...</div>) : topPeopleData && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'><PersonCard products={topPeopleData} isFeatured={true} /></div>
              }}
          </Await>
        </Suspense>
      </div>

    </div>
  )
}

export default Landing
