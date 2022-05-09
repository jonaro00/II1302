import MainLayout from '../components/MainLayout'
import { Model } from '../model/Model'
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import { GetStaticProps } from 'next'
import { Container } from 'semantic-ui-react'

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: { md: fs.readFileSync('pages/api/endpoints.md').toString() },
  }
}

export default function APIPage({ model, md }: { model: Model; md: string }) {
  return (
    <MainLayout model={model} title="API Documentation">
      <Container>
        <ReactMarkdown>{md}</ReactMarkdown>
      </Container>
    </MainLayout>
  )
}
