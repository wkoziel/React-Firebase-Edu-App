import { Grid } from '@mui/material'
import React from 'react'
import { UserProfile } from '../../Types/Users'

type Props = {
  user: UserProfile | null
}

const UserProfileComponent = ({ user }: Props) => {
  return <Grid container>{JSON.stringify(user)}</Grid>
}

export default UserProfileComponent
