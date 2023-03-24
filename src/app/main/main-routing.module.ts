import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
//import { MapMainComponent } from '../map/map-main.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
//import {HelpComponent} from './components/help/help.component';
import { AlignmentComponent } from './components/alignment/alignment.component';
import { AppComponent } from './components/app/app.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  //{path: 'map', component: MapMainComponent},
  {path: 'about', component: AboutComponent},
  //{path: 'help', component: HelpComponent},
  {path: 'alignment', component: AlignmentComponent},
  {path: 'app', component: AppComponent},
  {path: 'map', component: MapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
