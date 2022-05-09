import { Model } from '../model/Model'
import FooterPresenter from '../presenters/footerPresenter'
import HeaderPresenter from '../presenters/headerPresenter'
import Layout from './Layout'

/**
 * The main Layout of pages.
 * Places children between HeaderPresenter and FooterPresenter
 */
export default function MainLayout({
  children,
  model,
  title,
  description,
}: {
  children: React.ReactNode
  model: Model
  title?: string
  description?: string
}) {
  return (
    <Layout title={title} description={description}>
      <HeaderPresenter model={model} />
      {children}
      <FooterPresenter />
    </Layout>
  )
}
