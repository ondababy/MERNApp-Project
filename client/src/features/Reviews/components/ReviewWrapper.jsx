import { PageTitle } from '@partials';
import PropTypes from 'prop-types';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

function ReviewWrapper({ children, title, prevUrl }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full">
        <PageTitle title={title} prevUrl={prevUrl}>

        </PageTitle>
        <div className="p-8">{children}</div>
      </div>
    </>
  );
}

ReviewWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  prevUrl: PropTypes.string,
};

export default ReviewWrapper;

