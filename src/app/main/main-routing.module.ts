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
import { AzimuthDistanceComponent } from './components/azimuth-distance/azimuth-distance.component';
import { Radiate2dComponent } from './components/radiate2d/radiate2d.component';
import { Radiate3dComponent } from './components/radiate3d/radiate3d.component';
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  //{path: 'map', component: MapMainComponent},
  {path: 'about', component: AboutComponent},
  //{path: 'help', component: HelpComponent},
  {path: 'alignment', component: AlignmentComponent},
  {path: 'azimuth-distance', component: AzimuthDistanceComponent},
  {path: 'radiate2d', component: Radiate2dComponent},
  {path: 'radiate3d', component: Radiate3dComponent},
  {path: 'app', component: AppComponent},
  {path: 'map', component: MapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
