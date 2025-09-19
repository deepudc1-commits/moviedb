import React from 'react'
import SelectBtn from './SelectBtn'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { genresList, sortList } from '../utils'
import CheckboxInput from './CheckboxInput'



const Filters = () => {
    const {params, genreIDs} = useLoaderData()
    const {sort_by, with_genres} = params
    console.log(with_genres);
    console.log(params);
    
    
  return (
    <div className='mt-5 mb-5 px-10'>
      <div className='bg-base-300 rounded-lg shadow-lg px-8 py-4'>
        <Form key={JSON.stringify(params)}>
          <label htmlFor='sort' className="form-control w-full max-w-xs">
              <div className="label mr-2">
                  <span className="label-text">Sort by</span>
              </div>
              <select name='sort_by' id='sort' defaultValue={sort_by} className={`select select-bordered`}>
                <option value='first_air_date.desc'>First aired date</option>
                <option value='name.asc'>Name</option>
                <option value='popularity.desc'>Popularity</option>
                <option value='vote_average.desc'>Vote average</option>
              </select>
          </label>

          {/* <SelectBtn name="sort_by" label="sort by" list={sortList} defaultValue={sort_by} /> */}
          <div className='mt-5 mb-5'>
            <ul className='flex flex-wrap gap-3'>
              <li><strong>Genres: </strong></li>
              {genresList.map(genre => {
                  const {name, id} = genre
                  const isChecked = genreIDs.includes(String(id))
                  return <li key={id}><CheckboxInput name="with_genres" label={name} defaultValue={id} isChecked={isChecked} /></li>
              })}
            </ul>
          </div>
          <button type='submit' className='btn btn-accent mr-5'>Search</button>
          <Link to={'/movies?'}>Reset filters</Link>
        </Form>
      </div>
    </div>
  )
}

export default Filters
