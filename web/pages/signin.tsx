import MainLayout from '../components/MainLayout'
import SigninPresenter from '../presenters/signinPresenter'
import { Model } from '../model/Model'

export default function SignInPage({
  model,
  register = false,
}: {
  model: Model
  register: boolean
}) {
  return (
    <MainLayout model={model} title={register ? 'Register' : 'Sign in'}>
      <SigninPresenter model={model} register={register} />
    </MainLayout>
  )
}
