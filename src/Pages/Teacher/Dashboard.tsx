import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  styled,
  Tooltip,
  IconButton,
} from '@mui/material'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'
import { Appointment } from '../../Types/Apointments'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'
import { mapDatesForTableTeacher } from '../../Helpers/Appointments'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const TableHeaderStyled = styled(TableCell)({
  fontWeight: '600',
  fontSize: '17px',
  height: '70px',
})

const TableCellStyled = styled(TableCell)({
  fontWeight: '400',
  height: '70px',
  fontSize: '16px',
})

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment | null>(null)
  const { getAppointments } = useAppointmentContext()
  const { userID } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAppointments(userID)
        if (response && response.exists()) {
          const data: Appointment = response.data().data
          setAppointments(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (userID) loadData()
  }, [userID, getAppointments])

  if (!isLoading && !appointments?.dates?.length)
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          gap: '2rem',
        }}
      >
        <Typography variant='h4'>Nie posiadasz jeszcze żadnych terminów</Typography>
        <Typography variant='caption' color='text.secondary'>
          Tutaj prezentowane są utworzone przez Ciebie terminy. Jeżeli jeszcze ich nie masz, kliknij przycisk poniżej.
        </Typography>
        <Button onClick={() => navigate(paths.teacherAddAppointment)} size='large' endIcon={<AddIcon />}>
          Dodaj termin
        </Button>
      </Container>
    )

  return (
    <>
      <Container sx={{ padding: '2rem' }}>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Grid container sx={{ height: '80vh' }}>
            <Grid item xs={12}>
              <Typography variant='h4'>Twoje terminy</Typography>
              <Typography variant='caption' color='text.secondary'>
                Tutaj możesz podejrzeć wszystkie swoje terminy i zobaczyć przypisane do nich osoby
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ height: '85%' }}>
              <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                  <TableHead>
                    <TableRow>
                      <TableHeaderStyled>Termin (Data / Godzina)</TableHeaderStyled>
                      <TableHeaderStyled>Osoba rezerwująca</TableHeaderStyled>
                      <TableHeaderStyled>Adres e-mail</TableHeaderStyled>
                      <TableHeaderStyled>Numer telefonu</TableHeaderStyled>
                      <TableHeaderStyled align='right'></TableHeaderStyled>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments &&
                      mapDatesForTableTeacher(appointments?.dates).map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCellStyled component='th' scope='row'>
                            {row.date}
                          </TableCellStyled>
                          <TableCellStyled>{row.studentName}</TableCellStyled>
                          <TableCellStyled>{row.studentEmail}</TableCellStyled>
                          <TableCellStyled>{row.studentPhone}</TableCellStyled>
                          <TableCellStyled align='right'>
                            {row.studentEmail !== '-' && (
                              <Tooltip title={'Napisz wiadomość'}>
                                <IconButton href={`mailto:${row.studentEmail}`} target='_top' rel='noopener noreferrer'>
                                  {<EmailIcon />}
                                </IconButton>
                              </Tooltip>
                            )}

                            {row.studentEmail === '-' && (
                              <>
                                <Tooltip title={'Edytuj termin'}>
                                  <IconButton>{<EditIcon />}</IconButton>
                                </Tooltip>

                                <Tooltip title={'Usuń termin'}>
                                  <IconButton>{<DeleteIcon />}</IconButton>
                                </Tooltip>
                              </>
                            )}
                          </TableCellStyled>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default Dashboard
