import { UserDataResponse } from "./auth.interface"

export type TableHeaderModel = {
    title : string,
    tBodyKey : string 
}




export interface UserDetailsTableModel extends UserDataResponse {
    [tBodyKey : string] : string | undefined | null | boolean
}
