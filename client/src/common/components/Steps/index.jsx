import PropTypes from 'prop-types';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import Step from './Step';

const initialSteps = [
  {
    label: 'Step 1',
    isDone: false,
    isActive: true,
  },
  {
    label: 'Step 2',
    isDone: false,
    isActive: false,
  },
];

function Steps({
  stepList = initialSteps,
  onChange = () => { },
  componentClass,
  addClass,
  current = 0,
}) {
  const [steps, setSteps] = React.useState(stepList);

  React.useEffect(() => {
    setSteps(
      steps.map((step, index) => ({
        ...step,
        isDone: index < current,
        isActive: index === current,
      }))
    );
  }, [current]);

  const onClick = (index) => {
    onChange(index);
  };

  return (
    <>
      <ol
        className={
          componentClass ||
          `flex items-center justify-center p-3 space-x-2 text-sm font-medium text-center rounded-lg shadow-sm sm:p-4 sm:space-x-4 rtl:space-x-reverse ${addClass}`
        }
      >
        {steps?.length
          ? steps.map((step, index) => (
            <Step
              key={index}
              index={index + 1}
              label={step.label}
              isLast={index === steps.length - 1}
              isActive={step.isActive}
              isDone={step.isDone}
              onClick={onClick}
              doneIcon={<FaCircleCheck />}
            />
          ))
          : 'No steps found'}
      </ol>
    </>
  );
}

Steps.propTypes = {
  stepList: PropTypes.array,
  onChange: PropTypes.func,
  componentClass: PropTypes.string,
  addClass: PropTypes.string,
  current: PropTypes.number,
};

export default Steps;