import { useEffect, useState } from 'react'
import SigninView from '../views/signinView'
import { useRouter } from 'next/router'
import { Model } from '../model/Model'
import { useSession } from 'next-auth/react'

const ERRORS: { [index: string]: any } = {
  CredentialsSignin: 'Incorrect credentials',
}

export default function SigninPresenter({ model, register }: { model: Model; register: boolean }) {
  const { status } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    window.location
  })
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('status=', status)
  }, [status])

  const submit = async () => {
    setLoading(true)
    setUserError(null)
    const { error, ok, url } = await model._auth(register, username, password)
    setLoading(false)
    if (error) {
      if (process.env.NODE_ENV === 'development') console.log(error)
      setUserError(ERRORS[error] || 'Other error')
      return
    }
    if (ok && url) {
      router.push(new URL(url).searchParams.get('callbackUrl') ?? '/')
    } else {
      router.push('/')
    }
  }

  return (
    <SigninView
      register={register}
      errorText={userError ?? ''}
      loading={status === 'loading' || loading}
      onUsername={setUsername}
      onPassword={setPassword}
      submitHandler={submit}
    />
  )
}
