const BASE_URL = 'http://192.168.29.57:3000/'

const VERSION = "v1"
const AUTH = "auth"
const ATTENDANCE = "auth"

export const ApiConstants = {
    BASE_URL: BASE_URL,
    LOGIN: `${VERSION}/${AUTH}/login`,
    REGISTER: `${VERSION}/${AUTH}/register`,
    ATTENDANCE_REGISTER: `${VERSION}/${ATTENDANCE}/register`  
}
