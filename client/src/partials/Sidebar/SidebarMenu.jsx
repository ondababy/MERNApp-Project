import { Menu } from 'react-daisyui';
import makeMenu from './menu';
import MenuDropdown from './MenuDropdown';
import MenuLink from './MenuLink';

const SidebarMenu = () => {
  const menuList = makeMenu();
  return (
    <Menu>
      {menuList.map((value, index) => {
        const { type, ...props } = value;

        return (
          <Menu.Item key={index}>
            {type === 'dropdown' ? <MenuDropdown {...props} /> : <MenuLink {...props} />}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
SidebarMenu.propTypes = {};

export default SidebarMenu;
