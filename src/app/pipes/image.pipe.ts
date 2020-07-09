import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../environments/environment";

const MODEL_USER = 'user';
const MODEL_HOSPITAL = 'hospital';
const MODEL_DOCTOR = 'doctor';
const MODEL_TYPES = [MODEL_HOSPITAL, MODEL_USER, MODEL_DOCTOR];

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string, modelType: string = MODEL_USER): string {
    console.log(value)
    if (!value) return 'assets/images/users/image-default.svg';
    if (value.includes('https://')) return value;

    modelType = modelType.toLowerCase();
    if (!MODEL_TYPES.includes(modelType)) {
      modelType = MODEL_USER;
    }
    return `${environment.hospitalServiceUrl}/image/${modelType}/${value}`;
  }
}
