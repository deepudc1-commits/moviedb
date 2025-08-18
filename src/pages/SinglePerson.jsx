import React from 'react'
import { customFetch } from '../utils'
import { useLoaderData } from 'react-router-dom'

const singlePersonQuery = (id) => {
    return {
        queryKey: ['singlePerson', id],
        queryFn: () => customFetch(`/person/${id}`)
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
    const {name, profile_path, biography} = person
  return (
    <div>
      Single person
      <img src={`https://media.themoviedb.org/t/p/w470_and_h470_face/${profile_path}`} />
      <h1>{name}</h1>
      <p>{biography}</p>
    </div>
  )
}

export default SinglePerson
