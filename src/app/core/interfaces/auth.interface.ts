export interface UserData{
    _id : string
    name : string
    email : string
    role : string
    token ?: string; 
}

export interface LoginAuth{
    email : string,
    password : string
}

export interface SignUpAuth{
    name : string,
    email : string,
    password : string
}

export interface UserDataResponse{
    _id ?: string
    name : string,
    email : string
}