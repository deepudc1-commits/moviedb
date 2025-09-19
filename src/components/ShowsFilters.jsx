import React from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import SelectBtn from './SelectBtn'
import { networksList, sortList, tvGenresList } from '../utils'
import CheckboxInput from './CheckboxInput'

const ShowsFilters = () => {
  const {params, genreIDs} = useLoaderData();
  console.log(genreIDs);
  const {sort_by, with_networks} = params
  return (
    <div className='mt-5 mb-5'>
      <div className='bg-base-300 rounded-lg shadow-lg px-8 py-4'>
        <Form key={JSON.stringify(params)}>
          <label htmlFor='sort' className="form-control w-full max-w-xs">
              <div className="label mr-2">
                  <span className="label-text">Sort by</span>
              </div>
              <select name='sort_by' id='sort' defaultValue={sort_by} className={`select select-bordered`}>
                <option value='first_air_date.desc'>Airing date</option>
                <option value='name.asc'>Name</option>
                <option value='popularity.desc'>Popularity</option>
                <option value='vote_average.desc'>Vote average</option>
              </select>
          </label>

          <label htmlFor='with_networks' className='form-control w-full max-w-xs md:ml-5'>
            <div className='label mr-2'>
                <span className='label-text'>Network</span>
            </div>
            <select name='with_networks' id={with_networks} defaultValue={with_networks} className='select select-bordered'>
                <option value="">Choose network</option>
                {
                  networksList.map((network) => {
                    const {id, name} = network
                    return <option key={id} value={id}>{name}</option>
                  })
                }
            </select>
          </label>
          
          <div className='my-5'>
            <ul className='flex flex-wrap gap-3'>
              <li>Genres: </li>
              {tvGenresList.map((genre) => {
                const {id, name} = genre
                const isChecked = genreIDs.includes(String(id))
                return (
                  <li key={id}><CheckboxInput name='with_genres' label={name} defaultValue={id} isChecked={isChecked} /></li>
                )
              })}
            </ul>
          </div>
          <button type='submit' className='btn btn-accent mr-5'>Search</button>
          <Link to={'/shows'}>Reset filters</Link>
        </Form>
      </div>
    </div>
  )
}

export default ShowsFilters
