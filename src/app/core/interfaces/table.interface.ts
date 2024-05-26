import { UserData } from "./auth.interface"

export type TableHeaderModel = {
    title : string,
    tBodyKey : string 
}




export interface UserDetailsTableModel  {
    _id ?: string
    name : string,
    email : string
    [tBodyKey : string] : string | undefined | null | boolean
}
