export interface UserModel {
  id: string
  email: string,
  name: string
  image?: string
  role: string,
}

export interface UserSignInModel {
  email: string,
  password: string,
  rememberMe: boolean
}

export interface UserSignUpModel {
  email: string,
  name: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}
