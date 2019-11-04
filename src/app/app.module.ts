import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import {HttpClientModule} from '@angular/common/http';
import {ServerAPIService} from './services/server-api.service';
import { ChartsModule } from 'ng2-charts';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    AngularResizedEventModule,
    DragDropModule
  ],
  providers: [ServerAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
