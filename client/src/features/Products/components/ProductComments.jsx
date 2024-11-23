
import { Rating } from '@common';
import { useCallback, useEffect, useState } from 'react';
import { productApi } from '../product.api';


const Comment = ({ comment }) => {
  return (
    <div className="p-4 border rounded-lg bg-base-200">
      <p className="font-semibold">
        {comment.username}
      </p>
      {/* RATING TODO */}
      {/* sm */}
      <p className='text-md my-2 flex gap-4 items-center'>
        <div className="w-full flex gap-2 justify-start items-end">
          <Rating size="md" withRating={false} value={comment?.rating || 0} />  {(comment?.rating || 0).toFixed(2)}
        </div>
      </p>

      <p className="text-sm font-bold">
        {comment.title}
      </p>
      <p className="text-sm">
        {comment.description}
      </p>
    </div>

  )
};

export default function ProductComments({ product }) {
  const [reviews, setReviews] = useState([]);
  const [getRatings] = productApi.useGetRatingsMutation();

  const fetchReviews = useCallback(async (id) => {
    return getRatings(id).unwrap().then((data) => {
      setReviews(data.resource);
    });

  }, [getRatings]);

  useEffect(() => {
    if (product?.id) {
      fetchReviews(product.id);
    }
  }, [product])







  return (
    <div className="w-full px-4 lg:px-12 my-8 mb-24" >
      <div className="w-full flex flex-col lg:flex-row gap-8">
        <div className='flex-grow flex-col gap-2 max-h-screen overflow-auto'>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="divider"></div>
          {reviews.map((review) => <Comment comment={review} />)}


        </div>

        {/* <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Leave a Comment</h3>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Write your comment here..."
            ></textarea>
            <button className="mt-2 btn btn-primary">Submit</button>
          </div> */}


      </div>
    </div >

  )
}