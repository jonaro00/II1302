import { Model } from '../model/Model'
import FooterPresenter from '../presenters/footerPresenter'
import HeaderPresenter from '../presenters/headerPresenter'

/**
 * Places child elements between header and footer
 */
export default function MainLayout({ children, model }: { children: JSX.Element; model: Model }) {
  return (
    <>
      <HeaderPresenter model={model} />
      {children}
      <FooterPresenter />
    </>
  )
}
