import MainLayout from '../../components/MainLayout'
import SigninPresenter from '../../presenters/signinPresenter'
import { Model } from '../../model/Model'

export default function SignInPage({ model }: { model: Model }) {
  return (
    <MainLayout model={model}>
      <SigninPresenter model={model} register={false} />
    </MainLayout>
  )
}
