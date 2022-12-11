import React, { useCallback, useEffect, useState } from 'react'
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
import { StudentDate } from '../../Types/Apointments'
import EmailIcon from '@mui/icons-material/Email'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'
import { mapDatesForTableStudent } from '../../Helpers/Appointments'
import DeleteIcon from '@mui/icons-material/Delete'
import { subjectOptions } from '../../Consts/selectOptions'

const TableHeaderStyled = styled(TableCell)({
  fontWeight: '600',
  fontSize: '18px',
  height: '70px',
})

const TableCellStyled = styled(TableCell)({
  fontWeight: '400',
  height: '70px',
  fontSize: '16px',
})

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<StudentDate[] | null>(null)
  const { studentGetAllMyAppointments, resignFromAppointmentDate } = useAppointmentContext()
  const { userID } = useUserContext()
  const navigate = useNavigate()

  const loadData = useCallback(async () => {
    try {
      const response = await studentGetAllMyAppointments(userID)
      if (response) {
        setAppointments(response)
      }
    } finally {
      setIsLoading(false)
    }
  }, [userID, studentGetAllMyAppointments])

  useEffect(() => {
    if (userID) loadData()
  }, [userID, loadData])

  const handleDeleteOnClick = async (dateId: string, appointmentId: string) => {
    resignFromAppointmentDate(dateId, appointmentId).then(() => setTimeout(() => loadData(), 1000))
  }

  if (!isLoading && !appointments?.length)
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
          Tutaj prezentowane są zarezerwowane przez Ciebie terminy. Jeżeli jeszcze ich nie masz, kliknij przycisk
          poniżej.
        </Typography>
        <Button onClick={() => navigate(paths.studentDashboard)} size='large' endIcon={<SearchIcon />}>
          Znajdź terminy
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
                Tutaj możesz podejrzeć wszystkie swoje terminy.
              </Typography>
            </Grid>
            <Grid xs={12} sx={{ height: '85%' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                  <TableHead>
                    <TableRow>
                      <TableHeaderStyled>Przedmiot</TableHeaderStyled>
                      <TableHeaderStyled>Termin (Data / Godzina)</TableHeaderStyled>
                      <TableHeaderStyled>Korepetytor</TableHeaderStyled>
                      <TableHeaderStyled>Adres e-mail</TableHeaderStyled>
                      <TableHeaderStyled>Numer telefonu</TableHeaderStyled>
                      <TableHeaderStyled>Adres</TableHeaderStyled>
                      <TableHeaderStyled align='right'></TableHeaderStyled>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments &&
                      mapDatesForTableStudent(appointments).map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCellStyled component='th' scope='row'>
                            {subjectOptions.find((s) => s.value === row.subject)?.name}
                          </TableCellStyled>
                          <TableCellStyled component='th' scope='row'>
                            {row.date}
                          </TableCellStyled>
                          <TableCellStyled>{row.teacherName}</TableCellStyled>
                          <TableCellStyled>{row.teacherEmail}</TableCellStyled>
                          <TableCellStyled>{row.teacherPhone}</TableCellStyled>
                          <TableCellStyled>{row.teacherAddress}</TableCellStyled>
                          <TableCellStyled align='right' sx={{ minWidth: '120px' }}>
                            <Tooltip title={'Napisz wiadomość'}>
                              <IconButton href={`mailto:${row.teacherEmail}`} target='_top' rel='noopener noreferrer'>
                                {<EmailIcon />}
                              </IconButton>
                            </Tooltip>

                            <Tooltip title={'Zrezygnuj z terminu'}>
                              <IconButton
                                onClick={() => handleDeleteOnClick(row.dateId, row.appointmentId)}
                                disabled={new Date(row.date) < new Date()}
                              >
                                {<DeleteIcon />}
                              </IconButton>
                            </Tooltip>
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
