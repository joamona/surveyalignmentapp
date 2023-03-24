import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
//services
import {SidenavsService} from './services/sidenavs.service';


@Component({
  selector: 'main-module-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('appDrawerLeft') appDrawerLeft!: ElementRef;
  @ViewChild('appDrawerRight') appDrawerRight!: ElementRef;

  showMenuHamburguer:boolean=false;

  constructor(private sidenavsService: SidenavsService){

  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    /**Después de inicializarse el componente, se establecen las variables del servicio 
     * Esto es para poder abrir y cerrar los sidenavs desde otros componentes
    */
    this.sidenavsService.setAppDrawerLeft(this.appDrawerLeft);
    this.sidenavsService.setAppDrawerRight(this.appDrawerRight);
  }
}