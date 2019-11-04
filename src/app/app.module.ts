import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import {HttpClientModule} from '@angular/common/http';
import {ServerAPIService} from './services/server-api.service';
import { ChartsModule } from 'ng2-charts';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CookieService} from 'ngx-cookie-service';
import { AngularResizedEventModule } from 'angular-resize-event';

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
    DragDropModule,
    AngularResizedEventModule
  ],
  providers: [ServerAPIService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
