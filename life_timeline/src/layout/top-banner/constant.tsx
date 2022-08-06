import { IconHistory, IconCalendarClock } from "@arco-design/web-react/icon";
import type { ASPopButtomMenuItem } from "@/components/pop-buttom-menu/types";

enum MenuKeysEnum {
  DAY_TIMELINE = "DAY_TIMELINE",
  LIFE_TIMELINE = "LIFE_TIMELINE",
}
export const menuItems: ASPopButtomMenuItem = {
  [MenuKeysEnum.DAY_TIMELINE]: {
    title: "每日时间线",
    icon: <IconHistory />,
    desc: "进来看看你一天能够自由分配的时间吧",
    link: "day_timeline",
  },
  [MenuKeysEnum.LIFE_TIMELINE]: {
    title: "生命时间线",
    icon: <IconCalendarClock />,
    desc: "努力向前吧！",
    link: "life_timeline",
  },
};
