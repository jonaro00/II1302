import { useRouter } from 'next/router'
import useModelProperty from '../hooks/useModelProperty'
import { Model } from '../model/Model'
import HeaderView from '../views/headerView'

export default function HeaderPresenter({ model }: { model: Model }) {
  const router = useRouter()
  const username = useModelProperty(model, 'username')
  return (
    <HeaderView
      username={username ?? ''}
      signOut={async () => {
        router.push(await model.signOut())
      }}
    />
  )
}
