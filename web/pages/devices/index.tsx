import 'semantic-ui-css/semantic.min.css'

import HeaderPresenter from "../../presenters/headerPresenter";
import DevicePresenter from "../../presenters/DevicePresenter";
import FooterPresenter from "../../presenters/footerPresenter";

const DevicePage = () => {
  return (
    <>
      <HeaderPresenter />
      <DevicePresenter />
      <FooterPresenter />
    </>
  );
};

export default DevicePage;
