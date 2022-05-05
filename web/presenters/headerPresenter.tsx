import { Model } from '../model/Model'
import HeaderView from '../views/headerView'

export default function HeaderPresenter({ model }: { model: Model }) {
  return <HeaderView username={model.user?.username || ''} />
}
