import React, { memo, useState } from "react";
//components
import { Menu, Trigger, TooltipProps } from "@arco-design/web-react";
import { IconMessage, IconClose } from "@arco-design/web-react/icon";
import { ASPopButtomMenuWrapper } from "./style";
//types
import { ASPopButtomMenuItem } from "./types";
interface ASPopButtomMenuProps {
  menuItems: ASPopButtomMenuItem;
  tooltipProps?: Partial<TooltipProps>;
  [key: string]: any;
}

const MenuItem = Menu.Item;

const ASPopButtomMenu: React.FC<ASPopButtomMenuProps> = (props) => {
  const renderMenu = () => {
    const { menuItems, tooltipProps, ...extra } = props;
    return (
      <Menu
        mode="popButton"
        tooltipProps={{ ...tooltipProps }}
        hasCollapseButton
        {...extra}
      >
        {Object.entries(menuItems).map(([key, item]) => (
          <MenuItem key={key + ""}>
            {item.icon}
            {item.desc}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const [popupVisible, setPopupVisible] = useState(false);
  return (
    <ASPopButtomMenuWrapper>
      <Trigger
        popup={renderMenu}
        trigger={["click", "hover"]}
        onVisibleChange={(v) => setPopupVisible(v)}
        position="bottom"
      >
        <div
          className={`button-trigger ${
            popupVisible ? "button-trigger-active" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="button-trigger-content">
            {popupVisible ? <IconClose /> : <IconMessage />}
          </div>
        </div>
      </Trigger>
    </ASPopButtomMenuWrapper>
  );
};

export default memo(ASPopButtomMenu);
