import { AfterViewInit, Component, OnInit } from '@angular/core';

//OpenLayers
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import { Projection } from 'ol/proj';
import {Style, Fill, Stroke, Circle} from 'ol/style.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import { createPointTextStyle } from '../utilities/labels';

//services
import { AlignmentResultsService } from '../services/alignment-results.service';

//models
import { AlignmentResult } from '../models/alignment-result';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map:Map;
  pointSource: VectorSource;
  pointsLayer: VectorLayer<VectorSource>;
  linesSource: VectorSource;
  linesLayer: VectorLayer<VectorSource>;
  currentAlignmentResult: AlignmentResult;
  linesSourcePerpendicular: VectorSource;
  linesLayerPerpendicular: VectorLayer<VectorSource>;
  epsg25830:Projection;
  constructor(public alignmentResultsService:AlignmentResultsService){
    this.currentAlignmentResult = this.alignmentResultsService.getCurrentResult();
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    if(this.alignmentResultsService.currentResultIndex==-1){
      //console.log('Que me salgo')  
      return
    }
    this.createMap();
  }
  createMap(){
    //console.log('Creating map')
    //console.log(this.alignmentResultsService.currentResultIndex,this.alignmentResultsService.getNumberOfResults(), this.alignmentResultsService.getCurrentResult())
  
    
    this.epsg25830=new Projection({
      code:'EPSG:25830',
      extent: this.alignmentResultsService.getCurrentResult().getExtent(),
      units: 'm'
    });

    var pointStyle=new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({
          color: '#0000ff'
        })
      })
    });

    var lineStyle=new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2
      })
    });

    var lineStylePerpendicular=new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2
      })
    });

    this.pointSource = new VectorSource();
    this.pointsLayer = new VectorLayer({
      source: this.pointSource,
      style: createPointTextStyle('name','red')
    });

    this.linesSource = new VectorSource();
    this.linesLayer = new VectorLayer({
      source: this.linesSource,
      style: lineStyle
    });

    this.linesSourcePerpendicular = new VectorSource();
    this.linesLayerPerpendicular = new VectorLayer({
      source: this.linesSourcePerpendicular,
      style: lineStylePerpendicular
    });

    this.map = new Map({
      controls: [],
      view: new View({
        center: this.alignmentResultsService.getCurrentResult().getExtentCenter(),
        zoom: 0.5,
        projection: this.epsg25830,
      }),
      layers: [ this.linesLayer, this.linesLayerPerpendicular, this.pointsLayer],
      target: 'map'
    }); 
    this.drawCurrentResult();
    this.addMousePositionControl();
  }

  drawCurrentResult(){
    this.currentAlignmentResult=this.alignmentResultsService.getCurrentResult();

    this.pointSource.clear();
    this.linesSource.clear();
    this.linesSourcePerpendicular.clear();

    this.epsg25830.setExtent(this.currentAlignmentResult.getExtent())

    this.map.setView(
      new View({
        center: this.alignmentResultsService.getCurrentResult().getExtentCenter(),
        zoom: 0.5,
        projection: this.epsg25830,
      })
    );

    this.pointSource.addFeature(this.currentAlignmentResult.getPt1AsOlFeature());
    this.pointSource.addFeature(this.currentAlignmentResult.getPt2AsOlFeature());
    this.pointSource.addFeature(this.currentAlignmentResult.getPt3AsOlFeature());
    this.pointSource.addFeature(this.currentAlignmentResult.getPt4AsOlFeature());
  
    this.linesSource.addFeature(this.currentAlignmentResult.getLinePt1Pt3AsOlFeature());
    this.linesSourcePerpendicular.addFeature(this.currentAlignmentResult.getLinePt3Pt4AsOlFeature());
  }

  addMousePositionControl(){
    //Adds the mouse coordinate position to the map
    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(3),
      projection: 'EPSG:25830',
      // comment the following two lines to have the mouse position
      // be placed within the map.
    });
    this.map.addControl(mousePositionControl);
  }
  getCurrentResultIndex(){
    return this.alignmentResultsService.currentResultIndex;
  }

  disablePreviousButton(): boolean{
    if (this.alignmentResultsService.currentResultIndex<=0){
      return true;
    }else{
      return false;
    }
  }
  disableNextButton():boolean{
    if (this.alignmentResultsService.currentResultIndex==-1){return true}
    if (this.alignmentResultsService.currentResultIndex < this.alignmentResultsService.alignmentResults.length-1){
      return false;
    }else{
      return true;
    }
  }
  nextResult(){
    this.alignmentResultsService.incrementCurrentResultIndex()
    this.drawCurrentResult();
  }
  previousResult(){
    this.alignmentResultsService.decreaseCurrentResultIndex()
    this.drawCurrentResult();
  }

}
