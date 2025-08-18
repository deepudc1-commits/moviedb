import React from 'react'
import SelectBtn from './SelectBtn'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { genresList, sortList } from '../utils'
import CheckboxInput from './CheckboxInput'



const Filters = () => {
    const {params, genreIDs} = useLoaderData()
    const {sort_by, with_genres} = params
    console.log(with_genres);
    
    
  return (
    <div className='mt-5 mb-5 px-10'>
      <Form>
        <SelectBtn name="sort_by" label="sort by" list={sortList} defaultValue={sort_by} />
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
        <button type='submit' className='btn btn-accent mr-5'>Submit</button>
        <Link to={'/movies?'}>Reset filters</Link>
      </Form>
    </div>
  )
}

export default Filters
