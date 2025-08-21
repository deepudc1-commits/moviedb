import React from 'react'
import { useNavigation } from 'react-router'
import PersonCard from './PersonCard';
import Card from './Card';

const SearchResultsContainer = ({results}) => {
    const navigation = useNavigation();
    let moviesArr = [], showsArr = [], peopleArr = []
    results.filter((item) => {
        if(item.media_type === 'movie') {
            moviesArr.push(item)
        }
        if(item.media_type === 'tv') {
            showsArr.push(item)
        }
        if(item.media_type === 'person') {
            peopleArr.push(item)
        }
    })
    
    if(navigation.state === 'loading') {
        return <div>Items are loading...</div>
    }
    

  return (
    <div>
        <div className='px-10 mb-10'>
            <h2 class="text-2xl font-bold text-start mb-3">Movies</h2>
            {moviesArr.length === 0 ? <div>No movies found with this search term!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={moviesArr} isMovie={true} /></div> }
        </div>        

        <div className='px-10 mb-10'>
            <h2 class="text-2xl font-bold text-start mb-3">TV Shows</h2>
            {showsArr.length === 0 ? <div>No TV shows found with this search term!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={showsArr} /></div> }
        </div><br />

        <div className='px-10'>
            <h2 class="text-2xl font-bold text-start mb-3">People</h2>
            {peopleArr.length === 0 ? <div>No people found with this search term!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'><PersonCard products={peopleArr} /></div> }
        </div><br />
    </div>
  )
}

export default SearchResultsContainer
