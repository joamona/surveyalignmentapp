import { Point } from 'ol/geom';
import { Feature } from 'ol';

export class Point2d{
    x:number;
    y:number;
    n:number;
    code: string;
    constructor(x:number | string, y:number | string, n?:number | string, code?: string){
        this.x = Number(x);
        this.y = Number(y);
        if (typeof n !== 'undefined'){this.n = Number(n)}
        if (typeof code !== 'undefined'){this.code=code}
    }
    getXAsString(){
        return this.x.toFixed(3).toString()
      }
    getYAsString(){
        return this.y.toFixed(3).toString()
      }
}

export class OlPoint2d extends Point2d{
  olProperties:object;
  constructor(point2d:Point2d, olProperties?:object){
    
    super(point2d.x, point2d.y, point2d.n,point2d.code);
    
    if (olProperties === undefined){
      olProperties={};
    }
    if (this.n !== undefined){
      olProperties['n']=this.n;
    }
    if (this.code !== undefined){
      olProperties['code']=this.code;
    }
    this.olProperties=olProperties;
  }
  getAsOlFeature():Feature{
    var point = new Point([this.x,this.y]);
    var featurePoint = new Feature({
      name: this.n,
      geometry: point,
      properties: this.olProperties
    });
    return featurePoint;
  }
}