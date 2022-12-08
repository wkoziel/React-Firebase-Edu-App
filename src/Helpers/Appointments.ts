import { format } from 'date-fns'
import { AppointmentDate, StudentDate } from '../Types/Apointments'
import pl from 'date-fns/locale/pl'

export const mapDatesForTableTeacher = (dates: AppointmentDate[]) => {
  const result = dates.map((date) => {
    return {
      // @ts-ignore *
      date: format(date.date.toDate(), 'dd/MM/yyyy (EEEE) - HH:mm', {
        locale: pl,
      }),
      studentName: date.assignedStudent ? `${date.assignedStudent?.firstName} ${date.assignedStudent?.firstName}` : '-',
      studentEmail: date.assignedStudent?.email || '-',
      studentPhone: date.assignedStudent?.phone || '-',
    }
  })
  return result
}

export const mapDatesForTableStudent = (dates: StudentDate[]) => {
  const result = dates.map((date) => {
    return {
      // @ts-ignore *
      date: format(date.date.toDate(), 'dd/MM/yyyy (EEEE) - HH:mm', {
        locale: pl,
      }),
      teacherName: date.teacher ? `${date.teacher?.firstName} ${date.teacher?.firstName}` : '-',
      teacherEmail: date.teacher?.email || '-',
      teacherPhone: date.teacher?.phone || '-',
      teacherAddress: date.teacher?.phone || '-',
      subject: date.teacher.subject,
      appointmentId: date.teacher.userId,
      dateId: date.id,
    }
  })
  return result
}
