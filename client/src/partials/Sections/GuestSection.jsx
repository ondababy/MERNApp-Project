
import {SelectComponent} from '@common';
function GuestSection() {
  return (
    <div className="w-full">
      {/* BANNER */}
      <div className='border border-blue-400 min-h-56'>
      </div>

      {/* CONTENT */}
      <div className='flex border border-red-400 h-screen'>
        {/* Filters */}
        <div className="container max-w-sm border border-red-400 h-full">
          <div className="divider"></div>

        </div>


        {/* Products */}
        <div className="mx-8 py-4 w-full border border-green-400 h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-display">
              Our Products
            </h1>

            <SelectComponent />


          </div>


        </div>


      </div>
    </div>
  );
}

export default GuestSection;
