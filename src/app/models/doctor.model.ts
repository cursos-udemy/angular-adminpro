import {HospitalModel} from "./hospital.model";

export interface DoctorModel {
  _id: string
  name: string,
  image?: string,
  user?: string,
  hospital?: HospitalModel,
}

export interface DoctorRequest {
  _id?: string
  name: string,
  image?: string,
  hospital: string,
}
