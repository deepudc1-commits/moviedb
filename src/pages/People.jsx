import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils'
import { PersonCard } from '../components'
import { useLoaderData } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

const fetchPeopleQuery = (page) => {
    return {
        queryKey: ['peopleQuery', page],
        queryFn: () => customFetch('/person/popular', {params: {page}})
    }
}

export const loader = (queryClient) => async({request}) => {
    const sParams = new URL(request.url).searchParams
    const page = sParams.get('page')    
    const response = await queryClient.ensureQueryData(fetchPeopleQuery(page))
    const allPeople = response.data.results
    const totalPages = response.data.total_pages
    console.log(allPeople);
    return {allPeople, totalPages}
}



const People = () => {
    const {allPeople: initialPeople, totalPages: initialTotalPages} = useLoaderData()
    const [people, setPeople] = useState(initialPeople)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(initialTotalPages)

    const queryClient = new QueryClient()

    useEffect(() => {
        setCurrentPage(1)
        setTotalPages(initialPeople)
    }, [initialPeople, initialTotalPages])

    const loadPeople = async() => {
        const nextPage = currentPage + 1        
        const response = await queryClient.fetchQuery(fetchPeopleQuery(nextPage))
        const results = response.data.results
        console.log(results);
        setPeople((prevPeople) => [...prevPeople, ...results])        
        setCurrentPage(nextPage)
        setTotalPages(response.data.total_pages)
    }
    
  return (
    <div className='py-10'>
      <div className=' px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        <PersonCard products={people} />
      </div>
      <div className='flex justify-center mt-8 mb-8'>
        <button onClick={loadPeople} className='btn btn-success'>Load more</button>
      </div>
    </div>
  )
}

export default People
