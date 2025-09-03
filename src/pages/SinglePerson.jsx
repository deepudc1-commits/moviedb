import React, { useState } from 'react'
import { customFetch, formatDate } from '../utils'
import { useLoaderData } from 'react-router-dom'
import personImg from '../assets/personimage.png'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineMapsHomeWork, MdOutlineWorkOutline } from "react-icons/md";
import { Card } from '../components';

const singlePersonQuery = (id) => {
    return {
        queryKey: ['singlePersonAll', id],
        queryFn: () => customFetch(`/person/${id}?append_to_response=movie_credits,tv_credits,images`)
    }
}

export const loader = (queryClient) => async({params}) => {
    const response = await queryClient.ensureQueryData(singlePersonQuery(params.personID))
    const person = response.data
    console.log(person);
    return {person}
}

const SinglePerson = () => {
    const {person} = useLoaderData()
    const {name, profile_path, biography, known_for_department, birthday, place_of_birth, images, movie_credits, tv_credits} = person
    const personImages = images?.profiles
    const actedMovies = movie_credits?.cast
    const actedShows = tv_credits?.cast
    const [expandBio, setExpandBio] = useState(false)
  return (
    <div>
      <div className='mb-10 bg-gray-200 bg-cover' style={{backgroundColor: '#000'}}>
        <div className='overlay p-10'>
          <div className='md:grid md:grid-cols-4 gap-5'>
            <div className='mb-5 md:mb-0'>
              <img className='rounded-lg' src={ profile_path ? `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${profile_path}` : personImg} alt={name} />
            </div>

            <div className='col-span-3 text-white'>
              <h1 className='font-bold mb-5'>{name}</h1>
              <ul className='flex flex-wrap gap-6 mb-5'>
                <li className='flex items-center'>
                  <div className='flex items-center mr-2'>
                    <MdOutlineWorkOutline className='text-xl mr-2' />
                    <h3 className='font-semibold'>Profession:</h3>
                  </div>
                  <p className='mar-bot0'>{known_for_department ? known_for_department : 'N/A'}</p>
                </li>

                <li className='flex items-center'>
                  <div className='flex items-center mr-2'>
                    <LiaBirthdayCakeSolid className='text-xl mr-2' />
                    <h3 className='font-semibold'>Birthday:</h3>
                  </div>
                  <p className='mar-bot0'>{birthday ? formatDate(birthday) : 'N/A'}</p>
                </li>

                <li className='sm:flex items-center'>
                  <div className='flex items-center mr-2'>
                    <MdOutlineMapsHomeWork className='text-xl mr-2' />
                    <h3 className='font-semibold'>Place of birth:</h3>
                  </div>
                  <p className='mar-bot0'>{place_of_birth ? place_of_birth : 'N/A'}</p>
                </li>
              </ul>

              <h2 className='text-2xl font-bold text-start mb-2'>Biography</h2>
              { biography ? <p>{ expandBio ? biography : <>{`${biography.slice(0, 450)}`}{biography.length > 450 && <>...<button onClick={() => setExpandBio(true)} className='btn btn-link'>View more</button></>}</>}</p> : 
                <p>There is no biography available for this person!</p> }
            </div>
          </div>
          
        </div>
      </div>
      
      <div className='grid grid-cols-4'>
        <div className='col-span-4'>
          { actedMovies.length < 1 ? null : 
            <div className='mb-10'>
              <div className='px-10'>
                <h2 className="text-2xl font-bold text-start mb-5">Movies</h2>
                <div className='container grid grid-flow-col auto-cols-[17rem] overflow-x-auto gap-8'>
                  <Card products={actedMovies} isMovie={true} />
                </div>
              </div>
            </div>
          }

          { actedShows.length < 1 ? null : 
            <div className='mb-10'>
              <div className='px-10'>
                <h2 className="text-2xl font-bold text-start mb-5">Tv series</h2>
                <div className='container grid grid-flow-col auto-cols-[17rem] overflow-x-auto gap-8'>
                  <Card products={actedShows} />
                </div>
              </div>
            </div>
          }

          { personImages.length < 1 ? null : 
            <div className='mb-10'>
              <div className='px-10'>
                <h2 className="text-2xl font-bold text-start mb-5">Images</h2>
                <div className='container grid grid-flow-col auto-cols-[17rem] overflow-x-auto gap-8'>
                  {
                    personImages.map(pic => {
                      const {file_path} = pic
                      return <img className='rounded-full' src={`https://media.themoviedb.org/t/p/w440_and_h660_face${file_path}`} />
                    })
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SinglePerson
