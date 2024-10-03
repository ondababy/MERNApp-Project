import { Sidebar as SidebarComponent, useToggle } from '@common';
import PropTypes from 'prop-types';
import SideContent from './SideContent';

function Sidebar(props) {
  const [pin, togglePin] = useToggle(false);
  const { visible, toggleVisible, children, ...overlayProps } = props;
  const { noOverlay, noOverlayEvent, ...rest } = overlayProps;
  const pinned = visible && (pin ? '2xl:block 2xl:relative' : noOverlay ? 'xl:block xl:relative' : '');

  return (
    <SidebarComponent
      open={visible || pin}
      onClickOverlay={toggleVisible(pin)}
      sideClassName={`scrollbar-none z-[70] w-60 md:min-w-60 md:w-80 md:max-w-xs  ${pinned} `}
      className="sticky flex-row-reverse max-h-screen overflow-auto scrollbar-none 2xl:flex"
      contentClassName="scrollbar-none 2xl:w-full 2xl:max-h-screen overflow-y-auto transition-all ease-in-out px-[0px!important]"
      overlayClassName="w-0"
      side={
        <SideContent
          toggleVisible={toggleVisible}
          togglePin={togglePin}
          noOverlay={noOverlay}
          noOverlayEvent={noOverlayEvent || noOverlay}
        />
      }
      {...rest}
    >
      {children}
    </SidebarComponent>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  toggleVisible: PropTypes.func,
  side: PropTypes.node,
  noOverlayEvent: PropTypes.bool,
  noOverlay: PropTypes.bool,
};

export default Sidebar;
