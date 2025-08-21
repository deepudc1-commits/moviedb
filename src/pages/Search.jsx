import React from 'react'
import { Form, useLoaderData, useNavigation } from 'react-router'
import { customFetch } from '../utils'
import { useQuery } from '@tanstack/react-query'
import { SearchResultsContainer } from '../components'

const searchQuery = (search) => {
    return {
        queryKey: ['search', search],
        queryFn: async() => {
            const response = await customFetch(`/search/multi?query=${search}`)
            return response.data.results
        }
    }
}

export const loader = (queryClient) => async ({request}) => {
    const path = new URL(request.url)
    const searchTerm = path.searchParams.get('query')    
    await queryClient.ensureQueryData(searchQuery(searchTerm))
    return {searchTerm}
}

const Search = () => {
    const {searchTerm} = useLoaderData()
    const {data: results} = useQuery(searchQuery(searchTerm))
    console.log(results);

  return (
    <div className='mt-10'>
      <div className='max-w-8xl text-center mb-10'>
        <Form method='get'>
          <label className="input w-3xl">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            <input className='input input-md' type='search' name='query' defaultValue={searchTerm} required />
          </label>
          <button className='btn btn-accent w-30 ml-1' type='submit'>Search</button>
        </Form>
      </div>
      <SearchResultsContainer results={results} />
    </div>
  )
}

export default Search
