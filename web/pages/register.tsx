import { Model } from '../model/Model'
import SignInPage from './signin'

export default function RegisterPage({ model }: { model: Model }) {
  return <SignInPage model={model} register={true} />
}
