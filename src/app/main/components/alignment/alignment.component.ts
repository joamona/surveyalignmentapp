import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';

//services
import { AlignmentResultsService } from '../../services/alignment-results.service';

//models
import { Point2d } from '../../models/point2d';
import { AzimutDistance } from '../../models/azimut-distance';
import { AlignmentResult } from '../../models/alignment-result';


//utilities
import { ManagePropertiesJson } from '../../models/manage-properties-json';
import { isNumber } from '../../utilities/general';
import { calculateAzimutDistance , radia2d} from '../../utilities/survey';

@Component({
  selector: 'app-alignement',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.scss']
})
export class AlignmentComponent implements OnInit{
  
  currentAlignmentResult:AlignmentResult;
  
  errorMessage="";
  xpt1 = new FormControl('', [Validators.required]);//to show on insert
  ypt1 = new FormControl('', [Validators.required]);//to show on insert
  xpt2 = new FormControl('', [Validators.required]);//to show on insert
  ypt2 = new FormControl('', [Validators.required]);//to show on insert
  xpt3 = new FormControl('', [Validators.required]);//to show on insert
  ypt3 = new FormControl('', [Validators.required]);//to show on insert
  xOffset = new FormControl('', [Validators.required]);//to show on insert
  yOffset = new FormControl('', [Validators.required]);//to show on insert

  referenceLineAzimuth =new FormControl();
  referenceLineLength = new FormControl();
  distance = new FormControl();
  originDistance= new FormControl();
  projectedPtX=new FormControl();
  projectedPtY=new FormControl();

  // countryFormControl Mira arriba 

  controlsGroup = new FormGroup({
    xpt1: this.xpt1,
    ypt1: this.ypt1,
    xpt2: this.xpt2,
    ypt2: this.ypt2,
    xpt3: this.xpt3,
    ypt3: this.ypt3,
    xOffset: this.xOffset,
    yOffset: this.yOffset, 
    referenceLineAzimuth: this.referenceLineAzimuth,
    referenceLineLength: this.referenceLineLength,
    distance: this.distance,
    originDistance: this.originDistance,
    projectedPtX: this.projectedPtX,
    projectedPtY: this.projectedPtY
  });

  constructor(public alignmentResultsService:AlignmentResultsService){

  }
  ngOnInit(): void {
    this.xOffset.setValue("0");
    this.yOffset.setValue("0");
    this.clearResults();
    if(this.alignmentResultsService.currentResultIndex!==-1){
      this.loadCurrentResult();
    }
  }
  clearResults(){
    this.referenceLineAzimuth.setValue("");
    this.referenceLineLength.setValue("");
    this.distance.setValue("");
    this.originDistance.setValue("");
    this.projectedPtX.setValue("");
    this.projectedPtY.setValue("");
  }
  clearServiceResults(){
    this.alignmentResultsService.clear()
  }
  calculate(){
    if (!isNumber(this.xpt1.value)){this.errorMessage="X pt1 must be numeric";return;}
    if (!isNumber(this.ypt1.value)){this.errorMessage="Y pt1 must be numeric";return;}
    if (!isNumber(this.xpt2.value)){this.errorMessage="X pt2 must be numeric";return;}
    if (!isNumber(this.ypt2.value)){this.errorMessage="Y pt2 must be numeric";return;}
    if (!isNumber(this.xpt3.value)){this.errorMessage="X pt3 must be numeric";return;}
    if (!isNumber(this.ypt3.value)){this.errorMessage="Y pt3 must be numeric";return;}
    if (!isNumber(this.xOffset.value)){this.errorMessage="Distance offset must be numeric";return;}
    if (!isNumber(this.yOffset.value)){this.errorMessage="Distance origin offset must be numeric";return;}
    this.errorMessage="";
    let pt1 = new Point2d(this.xpt1.value, this.ypt1.value);
    let pt2 = new Point2d(this.xpt2.value, this.ypt2.value);
    let pt3 = new Point2d(this.xpt3.value, this.ypt3.value);
    let ad=calculateAzimutDistance(pt1,pt2);
    this.referenceLineAzimuth.setValue(ad.getAzimutAsString());
    this.referenceLineLength.setValue(ad.getDistanceAsString());

    let ad2 = calculateAzimutDistance(pt1,pt3);
    let angulo = ad2.azimut - ad.azimut
    let distance = ad2.distance * Math.sin(angulo*Math.PI/200);
    let originDistance = ad2.distance * Math.cos(angulo*Math.PI/200);
    let projectedPt = radia2d(pt1,new AzimutDistance(ad.azimut,originDistance));

    let xOffset = Number(this.xOffset.value)
    let yOffset = Number(this.yOffset.value)

    distance = distance + xOffset
    originDistance = originDistance + yOffset
    
    this.distance.setValue(this.asStringDecimals(distance,3));
    this.originDistance.setValue(this.asStringDecimals(originDistance,3));
    this.projectedPtX.setValue(this.asStringDecimals(projectedPt.x, 3));
    this.projectedPtY.setValue(this.asStringDecimals(projectedPt.y, 3));

    var ar=new AlignmentResult();
    ar.initWithJSON(this.controlsGroup.value);
    this.alignmentResultsService.addResult(ar);
  }
  nextResult(){
    this.alignmentResultsService.incrementCurrentResultIndex()
    this.loadCurrentResult();
  }
  previousResult(){
    this.alignmentResultsService.decreaseCurrentResultIndex()
    this.loadCurrentResult();
  }
  loadCurrentResult(){
    this.currentAlignmentResult=this.alignmentResultsService.getCurrentResult();
    this.initFormControlsWithJSON(this.currentAlignmentResult);
  }
  asStringDecimals(n:number|string, decimals:number):string{
    var a=Number(n)
    return a.toFixed(decimals).toString()
  }
  initFormControlsWithJSON(json){
    for (var key in json) {
        if (this[key]!==undefined){
          this[key].setValue(json[key]);
        }else{
          console.log('alignment.component. The form control ' + key + ' does not exist.')
        }
        
    }
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
  getCurrentResultIndex(){
    return this.alignmentResultsService.currentResultIndex;
  }

}
