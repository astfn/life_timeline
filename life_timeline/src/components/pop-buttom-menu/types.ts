import { ReactElement } from "react";

export interface ASPopButtomMenuItem {
  [key: string | number]: ASPopButtomMenuItemInfo;
}

export interface ASPopButtomMenuItemInfo {
  title: string;
  icon: ReactElement<any, any>;
  desc: string;
  link: string;
}
