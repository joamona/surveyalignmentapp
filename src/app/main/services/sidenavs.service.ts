import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavsService {

  public appDrawerLeft: any;//es el identificador del sidenav de la izquierda
  public appDrawerRight: any;//es el identificador del sidenav de la derecha
  public showNavRightButton = false;
  public navRigthOpened=false;
  public navLeftOpened=false;
  
  constructor() {
  }

  public setShowNavRightButton(show:boolean){
    this.showNavRightButton=show;
  }
  setAppDrawerLeft(identifier:any){
    this.appDrawerLeft=identifier;
  }
  setAppDrawerRight(identifier:any){
    this.appDrawerRight=identifier;
  }
  public closeNavLeft() {
    this.appDrawerLeft.close();
    this.navLeftOpened=false;
  }

  public openNavLeft() {
    this.appDrawerLeft.open();
    this.navLeftOpened=true;
  }

  public closeNavRight() {
    this.appDrawerRight.close();
    this.navRigthOpened=false;
  }

  public openNavRight() {
    this.appDrawerRight.open();
    this.navRigthOpened=true;
  }

  public toogleNavRight(){
    if (this.navRigthOpened){
      this.closeNavRight();
    }else{
      this.openNavRight();
    }
  }
  public toogleNavLeft(){
    if (this.navLeftOpened){
      this.closeNavLeft();
    }else{
      this.openNavLeft();
    }
  }
}
