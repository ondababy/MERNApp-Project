import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
export function Counter({ count = 1, onChange }) {

  const [counter, setCounter] = React.useState(count)
  const handleIncrement = () => {
    setCounter(counter + 1)
    onChange(counter + 1)
  }

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1)
      onChange(counter - 1)
    }
  }



  return (
    <>
      {/* Counter */}
      <div className="flex items-center justify-between">
        <button className="btn btn-ghost" onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span>
          {counter}
        </span>
        <button className="btn btn-ghost" onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
    </>
  )
}
