import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const movieReview = ({reviews}) => {
    const [expandText, setExpandText] = useState(false)
    console.log(reviews);
    const {id: reviewerID, author, content, created_at, author_details : {rating}} = reviews[reviews.length-1]
  return (
    <div className="shadow-lg shadow-gray-300">
        <div className="card-body">
            <div className='flex items-start'>
                <div className="avatar avatar-placeholder mr-2">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span>{author.slice(0,1)}</span>
                    </div>
                </div>
                <div>
                    <h2 className="card-title mb-2">{author}</h2>
                    <div className='flex'>
                        <div className="badge badge-success mr-2 gap-1"><FaStar />{rating*10}%</div>
                        <p>{new Date(created_at).toDateString()}</p>
                    </div>
                </div>
            </div>
            { expandText ? <p className='mar-bot0'>{content}</p> : ( <p className='mar-bot0'>{content.slice(0, 300)}{content.length > 300 && <><span>...</span><button onClick={() => setExpandText(true)} className='btn btn-link'>Read full review</button></>}</p> )}
        </div>
    </div>
  )
}

export default movieReview
