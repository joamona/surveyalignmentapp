import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// models
import { Point2d } from '../../models/point2d';
import { AzimutDistance } from '../../models/azimut-distance';

// utilities
import { isNumber } from '../../utilities/general';
import { calculateAzimutDistance } from '../../utilities/survey';

@Component({
  selector: 'app-azimuth-distance',
  templateUrl: './azimuth-distance.component.html',
  styleUrls: ['./azimuth-distance.component.scss']
})
export class AzimuthDistanceComponent implements OnInit {
  errorMessage = "";
  xpt1 = new FormControl('', [Validators.required]);
  ypt1 = new FormControl('', [Validators.required]);
  xpt2 = new FormControl('', [Validators.required]);
  ypt2 = new FormControl('', [Validators.required]);

  azimutResult = new FormControl();
  distanceResult = new FormControl();

  controlsGroup = new FormGroup({
    xpt1: this.xpt1,
    ypt1: this.ypt1,
    xpt2: this.xpt2,
    ypt2: this.ypt2,
    azimutResult: this.azimutResult,
    distanceResult: this.distanceResult
  });

  ngOnInit(): void {
    this.clearResults();
  }

  clearResults(): void {
    this.azimutResult.setValue("");
    this.distanceResult.setValue("");
  }

  calculate(): void {
    if (!isNumber(this.xpt1.value)) { this.errorMessage = "X pt1 must be numeric"; return; }
    if (!isNumber(this.ypt1.value)) { this.errorMessage = "Y pt1 must be numeric"; return; }
    if (!isNumber(this.xpt2.value)) { this.errorMessage = "X pt2 must be numeric"; return; }
    if (!isNumber(this.ypt2.value)) { this.errorMessage = "Y pt2 must be numeric"; return; }
    this.errorMessage = "";

    const pt1 = new Point2d(Number(this.xpt1.value), Number(this.ypt1.value));
    const pt2 = new Point2d(Number(this.xpt2.value), Number(this.ypt2.value));
    const ad = calculateAzimutDistance(pt1, pt2);

    this.azimutResult.setValue(ad.getAzimutAsString());
    this.distanceResult.setValue(ad.getDistanceAsString());
  }
}
