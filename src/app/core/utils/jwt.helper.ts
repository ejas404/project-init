import { jwtDecode } from "jwt-decode"
import { UserData } from "../interfaces/auth.interface"

export const setToken = (token: string) => {
    localStorage.setItem('auth-token', token)
}

export const removeToken = () => {
    localStorage.removeItem('auth-token')
}

export const decodeUserToken = (): UserData | false => {
    const authToken = sessionStorage.getItem('auth_token')
    if (typeof (authToken) !== 'string') return false;
    const decodedUser: UserData = (jwtDecode(authToken))
    return decodedUser;
}


export const isTutorToken = (): boolean => {
    const user: UserData | false = decodeUserToken()
    if (!user) return false;
    return user.role === 'User'
}



export const isAdminToken = (): boolean => {
    const user: UserData | false = decodeUserToken()
    if (!user) return false;
    return user.role === 'Admin'
}