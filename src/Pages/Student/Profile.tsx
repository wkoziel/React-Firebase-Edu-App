import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ProfileComponent from '../../Components/UserProfile/UserProfile'
import { useUserContext } from '../../Context/userContext'
import { UserProfile } from '../../Types/Users'

type Props = {}

const Profile = (props: Props) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getMyProfile } = useUserContext()

  useEffect(() => {
    const loadDate = async () => {
      const data = await getMyProfile()
      if (data) {
        setUser(data)
        setIsLoading(false)
      }
    }
    loadDate()
  }, [getMyProfile])

  return <Container>{isLoading ? <div>Loading...</div> : <ProfileComponent user={user} />}</Container>
}

export default Profile
