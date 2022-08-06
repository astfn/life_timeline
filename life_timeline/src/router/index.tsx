import ASDayTimeline from "@/views/day-timeline";
import ASLifeTimeline from "@/views/life-timeline";
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/day_timeline"></Redirect>,
  },
  { path: "/day_timeline", component: ASDayTimeline },
  { path: "/life_timeline", component: ASLifeTimeline },
];

export default routes;
