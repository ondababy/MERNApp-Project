import { useCheckAuth } from '@custom';
import PropTypes from 'prop-types';
import { Hero } from 'react-daisyui';
import AuthLogin from './AuthLogin';
import AuthSignup from './AuthSignup';
function Auth({ page = 'login' }) {
  const { userInfo } = useCheckAuth();
  let pageComponent = <AuthLogin />;

  switch (page) {
    case 'signup':
      pageComponent = <AuthSignup />;
      break;
  }

  return (
    !userInfo?.id && (
      <>
        <Hero className="container max-w-5xl h-full ">
          <Hero.Content className="flex-col lg:flex-row-reverse h-full w-full">{pageComponent}</Hero.Content>
        </Hero>
      </>
    )
  );
}

Auth.propTypes = {
  page: PropTypes.string,
};

export default Auth;
