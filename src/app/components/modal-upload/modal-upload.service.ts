import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  private _modelType: string;
  private _modelId: string;
  private _modelName: string
  private _modelImage: string;
  private visible: boolean;
  public uploadNotificationEvent: EventEmitter<any>;

  constructor() {
    this.uploadNotificationEvent = new EventEmitter<any>();
  }


  public openModal(modelType: string, modelId: string, modelName: string, modelImage: string): void {
    this._modelType = modelType;
    this._modelId = modelId;
    this._modelName = modelName;
    this._modelImage = modelImage;
    this.visible = true;
  }

  get modelType(): string {
    return this._modelType;
  }

  get modelId(): string {
    return this._modelId;
  }

  get modelName(): string {
    return this._modelName;
  }

  get modelImage() : string {
    return this._modelImage;
  }

  public closeModal(): void {
    this._modelType = "";
    this._modelId = "";
    this._modelName = "";
    this._modelImage = "";
    this.visible = false;
  }

  public isOpened(): boolean {
    return this.visible;
  }
}
