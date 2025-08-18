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
    <>
      <Form className='my-10'>
        <SelectBtn name='sort_by' label='Sort by' list={sortList} defaultValue={sort_by} />
        <label htmlFor='with_networks' className='form-control w-full max-w-xs'>
          <div className='label'>
              <span className='label-text'>Choose Network: </span>
          </div>
          <select name='with_networks' id={with_networks} defaultValue={with_networks} className='select select-bordered'>
              {
                networksList.map((network) => {
                  const {id, name} = network
                  return <option key={id} value={id}>{name}</option>
                })
              }
          </select>
        </label>
        
        <div className='my-10'>
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
        <button type='submit' className='btn btn-accent mr-5'>Submit</button>
        <Link to={'/shows'}>Reset filters</Link>
      </Form>
    </>
  )
}

export default ShowsFilters
