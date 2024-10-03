import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MenuLink from './MenuLink';

const MenuDropdown = ({ to, label, icon, subLinks, ...props }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-0 m-0 font-bold collapse collapse-arrow group"
      {...props}
      onDoubleClick={() => navigate(to)}
    >
      <input
        type="checkbox"
        className="peer"
      />
      <div className="flex items-center gap-2 py-0 collapse-title">
        {icon}
        {label}
      </div>
      <div className="py-0 collapse-content">
        {subLinks.map((item, index) => {
          const { type, ...props } = item;

          return props?.to || props?.label ? (
            <span key={index}>{type === 'dropdown' ? <MenuDropdown {...props} /> : <MenuLink {...props} />}</span>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

MenuDropdown.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  subLinks: PropTypes.array,
};

export default MenuDropdown;
