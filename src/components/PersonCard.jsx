import React from 'react'
import { Link } from 'react-router-dom';
import personImg from '../assets/personimage.png'

const PersonCard = ({products, isFeatured, hasCharacter}) => {
    const slicedPeople = isFeatured ? products.slice(0, 4) : products
  return (
    <>
        {
            slicedPeople.map((person) => {     
                const {id, name, profile_path, known_for_department, character} = person                   
                return (
                    <div key={id} className="text-center">
                        <figure className='mb-5'>
                            <Link to={`/person/${id}`}>
                                <img className='rounded-full shadow-lg shadow-gray-800 ring-4 ring-white transition duration-300 ease-out hover:-translate-y-4' src={ profile_path ? `https://image.tmdb.org/t/p/w470_and_h470_face/${profile_path}` : personImg} alt={name} />
                            </Link>
                        </figure>
                        <div className="">
                            <h2 className="text-lg font-bold"><Link to={`/person/${id}`}>{name}</Link></h2>
                            <p className='mar-bot0'>{ hasCharacter ? character : known_for_department} </p>
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default PersonCard
