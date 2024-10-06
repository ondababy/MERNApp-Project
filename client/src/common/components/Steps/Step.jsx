import PropTypes from 'prop-types';
import React from 'react';

const arrowNext = () => {
  return (
    <svg
      className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m7 9 4-4-4-4M1 9l4-4-4-4"
      />
    </svg>
  );
};

function Step({ index, label = 'No label', isLast = false, isActive = false, isDone = false }) {
  const activeClass = isActive || isDone ? 'font-extrabold text-primary' : '';
  const isDoneClass = isDone && !isActive ? 'font-normal' : '';
  return (
    <li
      className={`flex items-center ${activeClass} ${isDoneClass}`}
      key={index}
    >
      <span
        className={`flex items-center justify-center w-5 h-5 me-2 text-xs border  rounded-full shrink-0 ${
          isActive || isDone ? 'border-primary' : ''
        } `}
      >
        {index}
      </span>
      {label}
      {!isLast && arrowNext()}
    </li>
  );
}

export default Step;

