import React from 'react'
import { Link } from 'react-router'
import movieIcon from '../assets/movie_icon.png'
import showIcon from '../assets/show_icon.png'
import { formatDate } from '../utils'

const WideCard = ({products, isMovie, isFeaturedProducts}) => {
    const slicedProducts = isFeaturedProducts ? products.slice(0, 4) : products
  return (
    <>
        {
            slicedProducts.map(item => {
                const {poster_path, id, vote_average, overview} = item
                const title = item.title || item.name;
                const releaseDate = item.release_date || item.first_air_date;
                const vote = Math.round(vote_average * 10)                                     
                return (
                    <>
                        <div className="list bg-base-100 rounded-box shadow-lg hover:shadow-xl duration-300 group mb-7 gap-10">
                            <Link to={`/${isMovie ? 'movie' : 'tv'}/${id}`} className='list-row gap-8'>
                                <img className="pb-2 w-20 group-hover:scale-105 transition duration-300" src={poster_path ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}` : isMovie ? movieIcon : showIcon} alt={title} />
                                <div>
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                                    <p className="text-gray-900 dark:text-white opacity-60 mar-bot0">{formatDate(releaseDate)}</p> 
                                    <p className="list-col-wrap font-normal text-gray-500 mt-2">{overview}</p>
                                </div>
                                
                                <div className="radial-progress bg-primary text-primary-content border-primary border-4 mt-5"
                                    style={{ "--value": vote } /* as React.CSSProperties */ } aria-valuenow={vote} role="progressbar">
                                    <span className='text-xl font-bold'>{vote}%</span>
                                </div>
                            </Link>
                        </div>
                    </>
                )
            })
        }
    </>
  )
}

export default WideCard
