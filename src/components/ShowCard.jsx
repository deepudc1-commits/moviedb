import React, { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router'

const ShowCard = () => {
    const {topShows} = useLoaderData()
    return (
        <>
            <Suspense fallback={<div>Loading weekly top tv shows</div>}>
                <Await resolve={topShows} errorElement={({ error }) => (
                    <div>
                        Error loading tv shows.
                        {error && error.statusCode && (
                            <p>Status Code: {error.statusCode}</p>
                        )}
                        {error && error.message && (
                            <p>Message: {error.message}</p>
                        )}
                    </div>
                )}
                >
                    {
                        (topShowsResponse) => {
                            console.log(topShowsResponse);
                            const products = topShowsResponse.data.results.slice(0,4)
                            return (
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                    {
                                        products.map(item => {
                                            const {name, poster_path, id, first_air_date, vote_average} = item
                                            let vote = vote_average.toFixed(1)                                        
                                            return (
                                                <div key={id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                                    <Link to={`/movie/${id}`}>
                                                        <img className="p-8 rounded-t-lg" src={`https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}`} alt={name} />
                                                    </Link>
                                                    <div className="px-5 pb-5">
                                                        <Link to={`/movie/${id}`}>
                                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                                                        </Link>
                                                        <p className="text-gray-900 dark:text-white">{first_air_date}</p>
                                                        <div className="flex items-center mt-2.5 mb-5">
                                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                </svg>
                                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                </svg>
                                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                </svg>
                                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                </svg>
                                                                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                </svg>
                                                            </div>
                                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{vote}</span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                            
                        }
                    }
                </Await>
            </Suspense>
        </>
    )
}

export default ShowCard
