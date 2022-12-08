import { Grid } from '@mui/material'
import React from 'react'
import { UserProfile as UserProfileType } from '../../Types/Users'

type Props = {
  user: UserProfileType | null
}

const UserProfile = ({ user }: Props) => {
  return <Grid container>{JSON.stringify(user)}</Grid>
}

export default UserProfile
