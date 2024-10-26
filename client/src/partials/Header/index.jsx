import { TextRainbow, ThemeToggler } from '@common/components';
import { useGetAuth } from '@custom';
import { AuthLogout } from '@features';
import { PropTypes } from 'prop-types';
import { Dropdown, Navbar } from 'react-daisyui';
import { FaBars, FaCartArrowDown, FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenuList = ({ menus = [], iconOnly = false }) => {
  const { userInfo } = useGetAuth();

  const defaultMenus = [
    { name: 'Search', link: '/', icon: <FaSearch />, },
    { name: 'Cart', link: '/cart', icon: <FaCartArrowDown /> },
    { name: userInfo?.username || 'Profile', link: '/profile', icon: <FaUser />, showLabel: true },
    { name: 'Log In', link: '/login', icon: <FaUser /> }
  ]
  menus = menus.length ? menus : defaultMenus;

  return (
    <>
      {menus.map((menu, index) => {
        if (menu.name === 'Profile' && !userInfo?.id) return null;
        if (menu.name === 'Log In' && userInfo?.id) return null;

        return (
          <Link
            key={index}
            to={menu.link}
            className={`btn btn-ghost group hover:text-primary  ${iconOnly && !menu.showLabel ? 'w-12 p-0 rounded-full aspect-square' : ''} `}
          >
            <span className={`text-lg group-hover:text-primary ${iconOnly && !menu.showLabel ? 'flex items-center justify-center' : ''} `}>
              {menu.icon}
            </span>
            <span className={`text-sm ${iconOnly && !menu.showLabel ? 'hidden' : ''}`}>
              {menu.name}
            </span>
          </Link>
        )
      })}
    </>
  );
};
function Header({ clickLogo }) {
  return (
    <>
      <Navbar className="sticky z-[69] top-0 w-full bg-base-200">
        <Navbar.Start>
          <Dropdown className="lg:hidden">
            <Dropdown.Toggle>
              <FaBars />
            </Dropdown.Toggle>
            <Dropdown.Menu className="items-center border border-gray-400 rounded border-opacity-30 bg-base-200 w-52">
              <MenuList />
              <AuthLogout className="hover:text-primary w-full" />
            </Dropdown.Menu>
          </Dropdown>
          <TextRainbow
            text="ShoeShable"
            className="text-xl font-extrabold font-display btn btn-ghost "
            onClick={clickLogo}
          />
          <span className='hidden lg:flex'>
            <ThemeToggler />
          </span>
        </Navbar.Start>
        <Navbar.End className='w-full'>
          <div className="hidden lg:flex gap-2">
            <MenuList iconOnly={true} />
            <AuthLogout />
          </div>
          <div className="lg:hidden">
            <MenuList iconOnly={true} />
          </div>
        </Navbar.End>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  clickLogo: PropTypes.func,
};

export default Header;
export { default as DashboardHeader } from './DashboardHeader';

