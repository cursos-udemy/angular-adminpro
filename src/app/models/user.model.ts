export interface UserModel {
  id: string
  email: string,
  name: string
  image?: string
  role: string,
}

export interface UserSignUpModel {
  email: string,
  name: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}
