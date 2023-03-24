 import { ManagePropertiesJson } from "./manage-properties-json";
 import { OlPoint2d, Point2d } from "./point2d";
 import { Feature } from "ol";
 import { LineString } from "ol/geom";

 export class AlignmentResult extends ManagePropertiesJson{
  xpt1 = "";
  ypt1 = "";
  xpt2 = "";
  ypt2 = "";
  xpt3 = "";
  ypt3 = "";

  xOffset = "";
  yOffset = "";
  referenceLineAzimuth ="";
  referenceLineLength = "";
  distance = "";
  originDistance="";
  projectedPtX="";
  projectedPtY="";
  getPt1AsOlFeature():Feature{
    return new OlPoint2d(new Point2d(this.xpt1, this.ypt1,1,'pt1')).getAsOlFeature()
  }
  getPt2AsOlFeature():Feature{
    return new OlPoint2d(new Point2d(this.xpt2, this.ypt2,2,'pt2')).getAsOlFeature()
  }
  getPt3AsOlFeature():Feature{
    return new OlPoint2d(new Point2d(this.xpt3, this.ypt3,3,'pt3')).getAsOlFeature()
  }

  getPt4AsOlFeature():Feature{
    return new OlPoint2d(new Point2d(this.projectedPtX, this.projectedPtY,4,'pt3')).getAsOlFeature()
  }


  getLinePt1Pt3AsOlFeature(): Feature{
    var pt1=new Point2d(this.xpt1, this.ypt1);
    var pt2=new Point2d(this.xpt2, this.ypt2)
    var l = new LineString([[pt1.x,pt1.y],[pt2.x,pt2.y]])
    var fl = new Feature({
      name: 1,
      geometry: l,
      properties: {'a':200}
    });
    return fl
  }
  getLinePt3Pt4AsOlFeature(): Feature{
    var pt1=new Point2d(this.xpt3, this.ypt3);
    var pt2=new Point2d(this.projectedPtX, this.projectedPtY)
    var l = new LineString([[pt1.x,pt1.y],[pt2.x,pt2.y]])
    var fl = new Feature({
      name: 1,
      geometry: l,
      properties: {'a':200}
    });
    return fl
  }
  getExtent():number[]{
    var minX: number=Math.min.apply(null,[this.xpt1, this.xpt2,this.xpt3,this.projectedPtX]);
    var minY: number=Math.min.apply(null,[this.ypt1, this.ypt2,this.ypt3,this.projectedPtY]);
    var maxX: number=Math.max.apply(null,[this.xpt1, this.xpt2,this.xpt3,this.projectedPtX]);
    var maxY: number=Math.max.apply(null,[this.ypt1, this.ypt2,this.ypt3,this.projectedPtY]);
    //console.log([minX, minY,maxX, maxY])
    return [minX, minY,maxX, maxY]
  }
  getExtentCenter():number[]{
    var v = this.getExtent();
    var centerX = (v[0]+v[2])/2
    var centerY = (v[1]+v[3])/2
    //console.log([centerX,centerY])
    return [centerX,centerY]
  }
}
