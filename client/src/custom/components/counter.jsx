import React, { useRef } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export function Counter({ count = 1, onChange, max = null, min = 1 }) {
  const [counter, setCounter] = React.useState(count);
  const num = useRef(null);

  const handleIncrement = () => {
    if (max && counter >= max) return;
    setCounter(counter + 1);
    if (num.current) {
      num.current.value = counter + 1;
    }
    onChange(counter + 1);
  };

  const handleDecrement = () => {
    if (counter <= min) return;
    if (counter > 1) {
      setCounter(counter - 1);
      if (num.current) {
        num.current.value = counter - 1;
      }
      onChange(counter - 1);
    }
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    if (value >= min && (!max || value <= max)) {
      setCounter(value);
      onChange(value);
    } else {
      if (num.current) {
        num.current.value = '';
      }
    }
  };

  return (
    <>
      {/* Counter */}
      <div className="flex items-center justify-between">
        <button className="btn btn-ghost" onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span>
          <input
            type="text"
            ref={num}
            defaultValue={counter || count}
            onChange={handleInput}
            className="input input-bordered w-16 text-center"
          />
        </span>
        <button className="btn btn-ghost" onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
    </>
  );
}