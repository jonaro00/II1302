import { useCallback, useState } from 'react'
import SigninView from '../views/signinView'
import { useRouter } from 'next/router'
import { Model } from '../model/Model'
import { useSession } from 'next-auth/react'
import useUpdateLogger from '../hooks/useUpdateLogger'
import { dev_log } from '../lib/logging'

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
  useUpdateLogger(status, 'status')

  const submit = useCallback(async () => {
    setLoading(true)
    setUserError(null)
    const { error, ok, url } = await model._auth(register, username, password)
    setLoading(false)
    if (error) {
      dev_log('error:', error)
      setUserError(ERRORS[error] || 'Other error')
      return
    }
    if (ok && url) {
      router.push(new URL(url).searchParams.get('callbackUrl') ?? '/')
    } else {
      router.push('/')
    }
  }, [model, password, register, router, username])

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
