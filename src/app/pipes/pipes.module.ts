import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { SpliceTextPipe } from './splice-text.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    SpliceTextPipe
  ],
  imports: [
  ],
    exports: [
        ImagePipe,
        SpliceTextPipe
    ]
})
export class PipesModule { }
