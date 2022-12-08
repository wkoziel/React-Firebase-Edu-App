import {
  Box,
  Grid,
  Typography,
  styled,
  Avatar,
  Button,
  Divider,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material'
import { format } from 'date-fns'
import pl from 'date-fns/locale/pl'
import { ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { rolesOptions } from '../../Consts/roles'
import { genderOptions, subjectOptions } from '../../Consts/selectOptions'
import { useUserContext } from '../../Context/userContext'
import { storage } from '../../Database/firebaseConfig'
import paths from '../../Routes/paths'
import { UserProfileType } from '../../Types/Users'

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

type Props = {
  user: UserProfileType | null
  userImage: string
}

const Title = styled(Box)({
  width: '100%',
  border: '1px solid black',
  padding: '0.5rem',
})

const Body = styled(Box)({
  width: '100%',
  border: '1px solid black',
  borderTop: '0',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '1.5rem',
})

const Label = styled(Typography)({
  color: 'gray',
  fontWeight: '500',
})
const Text = styled(Typography)({})

const ProfileComponent = ({ user, userImage = '' }: Props) => {
  const [image, setImage] = useState<any>(null)
  const [displayImage, setDisplayImage] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const { userID, userRole } = useUserContext()
  const hiddenFileInput = React.useRef(null)
  const navigate = useNavigate()

  const handleClick = () => {
    /* @ts-ignore */
    hiddenFileInput.current.click()
  }

  const submitFile = () => {
    const storageRef = ref(storage, `${userID}.jpg`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(p)
      },
      (error) => console.log(error),
    )
  }

  return (
    <Box padding={'2rem'}>
      <Title sx={{ display: 'flex', justifyContent: 'space-between', px: 5 }}>
        <Typography variant='h5'>Twój profil</Typography>
        <Button
          variant='text'
          onClick={() => navigate(userRole === 'student' ? paths.studentEditProfile : paths.teacherEditProfile)}
        >
          Edytuj
        </Button>
      </Title>
      <Body>
        <Box
          width={'30%'}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 3 }}
        >
          <Avatar sx={{ width: 200, height: 200 }} src={displayImage || userImage} />
          <input
            ref={hiddenFileInput}
            type={'file'}
            onChange={(e) => {
              /* @ts-ignore */
              setImage(e.target.files[0])
              /* @ts-ignore */
              setDisplayImage(URL.createObjectURL(e.target.files[0]))
            }}
            accept='image/*'
            style={{ display: 'none' }}
          />
          {!!progress && <CircularProgressWithLabel value={progress} />}
          <Box>
            <Button variant='text' onClick={handleClick} sx={{ marginRight: '15px' }}>
              Wybierz zdjęcie
            </Button>
            <Button onClick={submitFile} disabled={!image}>
              Zatwierdź
            </Button>
          </Box>
        </Box>
        <Box width={'60%'}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Label variant='caption'>Imię</Label>
              <Text variant='h5'>{user?.firstName}</Text>
            </Grid>

            <Grid item xs={6}>
              <Label variant='caption'>Nazwisko</Label>
              <Text variant='h5'>{user?.lastName}</Text>
            </Grid>

            <Grid item xs={6}>
              <Label variant='caption'>Data urodzenia</Label>
              <Text variant='h5'>
                {user?.birthday &&
                  // @ts-ignore
                  format(new Date(user.birthday.toDate()), 'dd/MM/yyyy', {
                    locale: pl,
                  })}
              </Text>
            </Grid>

            <Grid item xs={6}>
              <Label variant='caption'>Płeć</Label>
              <Text variant='h5'>{genderOptions.find((g) => g.value === user?.gender)?.name}</Text>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {user?.subject && (
              <Grid item xs={6}>
                <Label variant='caption'>Przedmiot</Label>
                <Text variant='h5'>{subjectOptions.find((g) => g.value === user?.subject)?.name}</Text>
              </Grid>
            )}

            <Grid item xs={6}>
              <Label variant='caption'>Rola</Label>
              <Text variant='h5'>{rolesOptions.find((g) => g.value === user?.role)?.name}</Text>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={6}>
              <Label variant='caption'>Numer telefonu</Label>
              <Text variant='h5'>{user?.phone}</Text>
            </Grid>

            <Grid item xs={6}>
              <Label variant='caption'>Adres email</Label>
              <Text variant='h5'>{user?.email}</Text>
            </Grid>

            {user?.address && (
              <Grid item xs={12}>
                <Label variant='caption'>Adres</Label>
                <Text variant='h5'>{user.address}</Text>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Box>
      </Body>
    </Box>
  )
}

export default ProfileComponent
