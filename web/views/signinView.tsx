import Link from 'next/link'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function SigninView({
  register,
  submitHandler,
  onUsername,
  onPassword,
  loading,
  errorText,
}: {
  register: boolean
  submitHandler(): void
  onUsername(u: string): void
  onPassword(p: string): void
  loading: boolean
  errorText?: string
}) {
  return (
    <Grid textAlign="center" style={{ paddingBottom: 50 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2">{register ? 'Register an account' : 'Sign in with your account'}</Header>
        <Form
          loading={loading}
          error={!!errorText}
          onSubmit={event => {
            event.preventDefault()
            submitHandler()
            ;(event.target as HTMLFormElement).reset()
          }}>
          <input type="hidden" name="register" value={String(register)} />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username"
            onChange={event => onUsername(event.target.value)}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={event => onPassword(event.target.value)}
            autoComplete={register ? 'new-password' : 'current-password'}
          />
          <Button fluid size="large" color={loading ? 'grey' : 'teal'}>
            {register ? 'Register' : 'Sign in'}
          </Button>
          <Message error color="red">
            Error: {errorText}
          </Message>
        </Form>
        <Message size="large">
          {register ? (
            <>
              Have an account? Sign in{' '}
              <Link href="/signin">
                <a>here</a>
              </Link>
              .
            </>
          ) : (
            <>
              Don{"'"}t already have an account? Register{' '}
              <Link href="/register">
                <a>here</a>
              </Link>
              .
            </>
          )}
        </Message>
      </Grid.Column>
    </Grid>
  )
}
