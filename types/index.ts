export interface RegisterUser {
    is_marketing: boolean
    last_name: string
    address: string
    avatar: string
    password_confirmation: string
    password: string
    first_name: string
    phone_number: string
    email: string
}
export interface LoginUser {
  email: string
  password: string
}

export type UserData = {
    uuid: string
    first_name: string,
    last_name: string,
    email: string,
    avatar: string | null,
    address: string | number,
    phone_number: string | number,
    is_marketing: boolean,
    updated_at: string,
    created_at: string,
    token?: string
}
export interface AuthenticateUserResponse  {
  success: 1,
  data: UserData,
  error: null,
  errors: any[],
  extra: any[]
}
export interface LoginUserResponse  {
  success: 1,
  data: {
    token: string
  },
  error: null,
  errors: any[],
  extra: any[]
}