import React from 'react'
import { useLoaderData } from 'react-router'
import ShowMovie from './ShowMovie';

const AllMovies = () => {
  const allMovies = useLoaderData();

  return (
    <div>
      <h2>All Movies: {allMovies.length}</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
       {
        allMovies.map(movie => <ShowMovie
          key={movie._id}
          movie={movie}
        ></ShowMovie>)

      }
     </div>
    </div>
  )
}

export default AllMovies