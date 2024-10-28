import React from 'react';

export default function BirthdateInput({ label, refer, meta, outerStyle, ...inputProps }) {
  const values = React.useRef({
    age: 0,
    date: null,
  })

  return (
    <div className={outerStyle}>
      <div className="flex items-center gap-2">
        <div className='w-full'>
          <label className={`${meta?.touched && meta?.error ? 'text-error' : 'text-base-content'}`}>{label}</label>
          <input
            className={`input input-bordered ${meta?.touched && meta?.error ? 'input-error' : 'input-primary'} w-full`}
            ref={refer}
            {...inputProps}
            type='date'


          />
        </div>
        <div className='w-1/3'>
          <label className={`${meta?.touched && meta?.error ? 'text-error' : 'text-base-content'}`}>Age</label>
          <input
            className={`input input-bordered ${meta?.touched && meta?.error ? 'input-error' : 'input-primary'} w-full input-disabled`}
            ref={refer}
            {...inputProps}
            type='text'
            disabled
          />
        </div>


      </div>
      {meta?.touched && meta?.error && <div className="text-xs italic text-error">{meta?.error}</div>}
    </div>
  )
}
