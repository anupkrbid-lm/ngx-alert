import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './alert/alert.component';
import { ReversePipe } from './alert/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
