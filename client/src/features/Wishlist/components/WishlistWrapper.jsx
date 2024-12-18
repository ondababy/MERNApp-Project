import { PageTitle } from '@partials';
import PropTypes from 'prop-types';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

function WishlistWrapper({ children, title, prevUrl }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full">
        <PageTitle title={title} prevUrl={prevUrl}>
          <Button
            color="primary"
            className="my-4"
            onClick={() => navigate(prevUrl || '/dashboard/wishlists')}
          >
            Back
          </Button>
        </PageTitle>
        <div className="p-8">{children}</div>
      </div>
    </>
  );
}

WishlistWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  prevUrl: PropTypes.string,
};

export default WishlistWrapper;

