import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modules
import { MainRoutingModule } from './main-routing.module';
import {AngularMaterialImportsModule} from '../angular-material-imports/angular-material-imports.module';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { SidenavsService } from './services/sidenavs.service';

//services

//Components
import { MainComponent } from './main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
//import { HelpComponent } from './components/help/help.component';
import { AlignmentComponent } from './components/alignment/alignment.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavLeftComponent } from './components/sidenav-left/sidenav-left.component';
import { AppComponent } from './components/app/app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    MainComponent,
    OptionsMenuComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
//    HelpComponent,
    AlignmentComponent,
    HeaderComponent,
    SidenavLeftComponent,
    AppComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MainRoutingModule,
    AngularMaterialImportsModule,
//    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MainComponent,
  ],
  providers:[
    SidenavsService
  ]
})
export class MainModule { }
