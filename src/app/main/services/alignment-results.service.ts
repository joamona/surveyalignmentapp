import { Injectable } from '@angular/core';

import { AlignmentResult } from '../models/alignment-result';

@Injectable({
  providedIn: 'root'
})
export class AlignmentResultsService {
  alignmentResults: AlignmentResult[]=[];
  currentResultIndex=-1;

  constructor() { }

  addResult(alignmentResult:AlignmentResult){
    var num_elements=this.alignmentResults.push(alignmentResult);
    this.currentResultIndex=num_elements-1;
    //console.log('addResult', this.currentResultIndex, this.alignmentResults, this.getCurrentResult())
  }
  incrementCurrentResultIndex(){
    var n=this.alignmentResults.length;
    if (this.currentResultIndex+1 <= n-1){this.currentResultIndex+=1}
  }
  decreaseCurrentResultIndex(){
    var n=this.alignmentResults.length;
    if (this.currentResultIndex > 0){this.currentResultIndex-=1}
  }
  getCurrentResult():AlignmentResult{
    return this.alignmentResults[this.currentResultIndex]
  }
  getNumberOfResults():number{
    return this.alignmentResults.length
  }
  clear(){
    this.alignmentResults=[];
    this.currentResultIndex=-1;
  }
}
