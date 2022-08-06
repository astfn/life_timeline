//components
import ASTopBanner from "@/layout/top-banner";
import { AppStyledWrapper } from "./AppStyle";
//utils
import { renderRoutes } from "react-router-config";
import routes from "./router";

function App() {
  return (
    <AppStyledWrapper>
      <ASTopBanner />
      <main> {renderRoutes(routes)}</main>
    </AppStyledWrapper>
  );
}

export default App;
