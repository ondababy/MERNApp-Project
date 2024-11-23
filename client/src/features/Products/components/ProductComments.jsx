

export default function ProductComments() {
  return (
    <div className="w-full px-4 lg:px-12 my-8 mb-24" >
      <div className="w-full flex flex-col lg:flex-row gap-8">
        <div className='flex-grow'>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="divider"></div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-base-200">
              <p className="font-semibold">John Doe</p>

              {/* RATING TODO */}
              {/* sm */}
              <div className="rating rating-sm">
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
              </div>

              <p className="text-sm">This product is amazing! Highly recommend.</p>
            </div>
            <div className="p-4 border rounded-lg bg-base-200">
              <p className="font-semibold">Jane Smith</p>

              {/* RATING TODO */}
              {/* sm */}
              <div className="rating rating-sm">
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
              </div>
              <p className="text-sm">Good quality but a bit expensive.</p>
            </div>
          </div>
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