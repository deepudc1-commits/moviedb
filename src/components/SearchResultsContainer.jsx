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
        <h2>Movies</h2>
        <div>
            {moviesArr.length === 0 ? <div>No movies found!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={moviesArr} isMovie={true} /></div> }
        </div><br />

        <h2>Tv Shows</h2>
        <div>
            {showsArr.length === 0 ? <div>No TV shows found!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'><Card products={showsArr} /></div> }
        </div><br />

        <h2>People</h2>
        <div>
            {peopleArr.length === 0 ? <div>No people found!</div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'><PersonCard products={peopleArr} /></div> }
        </div><br />
    </div>
  )
}

export default SearchResultsContainer
