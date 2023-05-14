import { post } from './api'
import { ApiConstants } from './ApiConstants';

export type AttendancePayload {
    userId: string;
    subject: string;
    teacherId: string;
}

export const addAttendance = (payload:AttendancePayload) => {
    return post(ApiConstants.ATTENDANCE_REGISTER, payload)
}