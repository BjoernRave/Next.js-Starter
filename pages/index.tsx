import Layout from 'components/Layout'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/client'
import React from 'react'

const Hello: NextPage<Props> = ({}) => {
  const [session, loading] = useSession()

  return (
    <Layout>
      <button className='btn-blue' onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </Layout>
  )
}

export default Hello

interface Props {}
