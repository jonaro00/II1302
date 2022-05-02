import 'semantic-ui-css/semantic.min.css'

import HeaderPresenter from "../../presenters/headerPresenter";
import AboutPresenter from "../../presenters/aboutPresenter";
import FooterPresenter from "../../presenters/footerPresenter";

const AboutPage = () => {
  return (
    <>
      <HeaderPresenter />
      <AboutPresenter />
      <FooterPresenter />
    </>
  );
};

export default AboutPage;
