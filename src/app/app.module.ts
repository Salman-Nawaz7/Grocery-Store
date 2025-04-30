import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { ScriptLoaderService } from './shared/script-loader.service';


@NgModule({
  declarations: [],
  providers: [
    ScriptLoaderService
],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
  ]
})
export class AppModule { }
