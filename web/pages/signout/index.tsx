import MainLayout from '../../components/MainLayout'
import { Model } from '../../model/Model'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SignOutPage({ model }: { model: Model }) {
  const router = useRouter()
  useEffect(() => {
    model.signOut().then(u => router.push(u))
  })
  return <MainLayout model={model} />
}
