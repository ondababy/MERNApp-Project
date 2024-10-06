import { Steps } from '@common';
import PropTypes from 'prop-types';
import React from 'react';

const steps = [
  {
    label: 'Profile Setup',
    isActive: true,
  },
  {
    label: 'Account Setup',
  },
  {
    label: 'Email Verification',
  },
];

function AuthOnboarding(props) {
  return (
    <div className="flex flex-col items-start h-full">
      <Steps content={steps} />
    </div>
  );
}

AuthOnboarding.propTypes = {};

export default AuthOnboarding;

