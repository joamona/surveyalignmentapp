 import { ManagePropertiesJson } from "./manage-properties-json";
export class AzimutDistance{
  azimut = 0;
  distance = 0;
  constructor(azimut:number,distance:number){
    this.azimut=azimut;
    this.distance=distance
  }
  getAzimutAsString(){
    return this.azimut.toFixed(4).toString()
  }
  getDistanceAsString(){
    return this.distance.toFixed(3).toString()
  }
}
