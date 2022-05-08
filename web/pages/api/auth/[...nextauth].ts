import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DAO } from '../../../integration/DAO'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        register: { type: 'hidden' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You can use the `req` object to obtain additional parameters
        if (!credentials) return null
        const dao = await DAO.getInstance()
        try {
          const user =
            credentials?.register === 'true'
              ? await dao.register(credentials)
              : await dao.login(credentials)
          // Any object returned will be saved in `user` property of the JWT
          return { id: user.id, name: user.username }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: '/signin',
  },
})
