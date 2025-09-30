import React from 'react'
import { Link } from 'react-router'
import movieIcon from '../assets/movie_icon.png'
import showIcon from '../assets/show_icon.png'
import { formatDate } from '../utils'

const Card = ({products, isMovie, isFeaturedProducts}) => {
    const slicedProducts = isFeaturedProducts ? products.slice(0, 4) : products
  return (
    <>
        {
            slicedProducts.map(item => {
                const {poster_path, id, vote_average} = item
                const title = item.title || item.name;
                const releaseDate = item.release_date || item.first_air_date;
                const vote = Math.round(vote_average * 10)                                     
                return (
                    <div key={id} className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link to={`/${isMovie ? 'movie' : 'tv'}/${id}`}>
                            <img className="pb-0 pt-2.5 px-2.5 rounded-t-lg transition hover:saturate-300" src={poster_path ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}` : isMovie ? movieIcon : showIcon} alt={title} />
                        </Link>
                        <div className="px-5 pb-5">
                            <div className="radial-progress bg-primary text-primary-content border-primary border-4 mr-3 -mt-12 mb-3"
                                style={{ "--value": vote } /* as React.CSSProperties */ } aria-valuenow={vote} role="progressbar">
                                <span className='text-xl font-bold'>{vote}%</span>
                            </div>
                            <Link to={`/${isMovie ? 'movie' : 'tv'}/${id}`}>
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                            </Link>
                            <p className="text-gray-900 dark:text-white mar-bot0">{formatDate(releaseDate)}</p>                          
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default Card
