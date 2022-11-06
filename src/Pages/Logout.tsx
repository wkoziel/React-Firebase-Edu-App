import React, { useEffect } from 'react'
import { useUserContext } from '../Context/userContext'

type Props = {}

const Logout = (props: Props) => {
  const { logoutUser } = useUserContext()

  useEffect(() => {
    logoutUser()
  }, [logoutUser])

  return <div>Logout</div>
}

export default Logout
