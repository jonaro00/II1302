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
    <div>
      <h3>
        {register
          ? "Don't already have an account? Register here:"
          : 'Sign in with your account here:'}
      </h3>
      <form
        onSubmit={event => {
          event.preventDefault()
          submitHandler()
          ;(event.target as HTMLFormElement).reset()
        }}>
        <label htmlFor="username">Username:</label>

        <input onChange={event => onUsername(event.target.value)} name="username" type="text" />

        <label htmlFor="password">Password:</label>

        <input
          onChange={event => onPassword(event.target.value)}
          name="password"
          type="password"
          autoComplete={register ? 'new-password' : 'current-password'}
        />

        <input type="submit" value={register ? 'Register' : 'Sign in'} />
      </form>

      {loading ? <div>Loading...</div> : false}

      {errorText ? <div>Error: {errorText}</div> : false}
    </div>
  )
}
