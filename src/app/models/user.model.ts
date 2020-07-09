export interface UserModel {
  _id: string
  email: string,
  name: string
  image?: string
  role: string,
  googleAccount: boolean
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
