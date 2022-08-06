//components
import { TopBannerWrapper } from "./style";
import ASPopButtomMenu from "@/components/pop-buttom-menu";
import ASHeader from "@/components/header";
//utils
import { menuItems } from "./constant";
import { memo, useState } from "react";
import { withRouter } from "react-router-dom";

const ASHome = (props: { history: any }) => {
  const { history } = props;

  const [currentMenuItme, setCurrentMenu] = useState(() => {
    return Object.values(menuItems)[0];
  });

  const handleChangeMenuItem = (key: string) => {
    const tartgetMenuItem = menuItems[key];
    setCurrentMenu(tartgetMenuItem);
    history.replace(tartgetMenuItem.link);
  };
  /**
   * renders
   */
  const renderLeftContent = () => {
    return (
      <ASPopButtomMenu
        menuItems={menuItems}
        onClickMenuItem={handleChangeMenuItem}
      />
    );
  };
  const renderCenterContent = () => {
    return <h2>{currentMenuItme.title}</h2>;
  };
  /**
   * 最终return的部分
   */
  return (
    <TopBannerWrapper>
      <ASHeader left={renderLeftContent} center={renderCenterContent} />
    </TopBannerWrapper>
  );
};

export default withRouter(memo(ASHome));
