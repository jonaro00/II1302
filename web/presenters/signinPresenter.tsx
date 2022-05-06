import React from 'react'
import SigninView from '../views/signinView'
import { useRouter } from 'next/router'
import { Model } from '../model/Model'
import { useSession, signIn } from 'next-auth/react'

const ERRORS: { [index: string]: any } = {
  CredentialsSignin: 'Incorrect credentials',
}

export default function SigninPresenter({ model, register }: { model: Model; register: boolean }) {
  const { status } = useSession()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userError, setUserError] = React.useState((): string | null => null)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const submit = async () => {
    setLoading(true)
    setUserError(null)
    const { error, ok, url }: { error?: string; ok: number; url: string | null } = (await signIn(
      'credentials',
      { redirect: false, username, password },
    )) as any
    setLoading(false)
    if (error) {
      setUserError(ERRORS[error] || 'Other error')
      return
    }
    console.log(ok, url)
    if (ok && url) {
      // set model user?
      const target = new URL(url).searchParams.get('callbackUrl')
      router.push(target || '/')
    } else {
      router.push('/')
    }
  }

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('status=', status)
  }, [status])

  return (
    <SigninView
      register={register}
      errorText={userError || ''}
      loading={status === 'loading' || loading}
      onUsername={(u: string) => setUsername(u)}
      onPassword={(p: string) => setPassword(p)}
      submitHandler={async () => {
        await submit()
      }}
    />
  )
}
