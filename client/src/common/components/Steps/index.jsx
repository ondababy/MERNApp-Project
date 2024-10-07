import PropTypes from 'prop-types';
import React from 'react';
import Step from './Step';

function Steps({ content, componentClass, addClass }) {
  const steps = content?.length
    ? content.map((step, index) => {
        return Step({
          index: index + 1,
          label: step.label,
          isLast: index === content.length - 1,
          isActive: step.isActive,
          isDone: step.isDone,
        });
      })
    : 'No steps found';

  return (
    <>
      <ol
        className={
          componentClass ||
          `flex items-center justify-center p-3 space-x-2 text-sm font-medium text-center rounded-lg shadow-sm sm:p-4 sm:space-x-4 rtl:space-x-reverse ${addClass}`
        }
      >
        {steps}
      </ol>
    </>
  );
}

Steps.propTypes = {
  content: PropTypes.array,
  componentClass: PropTypes.string,
  addClass: PropTypes.string,
};

export default Steps;

