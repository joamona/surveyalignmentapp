import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// models
import { Point2d } from '../../models/point2d';
import { AzimutDistance } from '../../models/azimut-distance';

// utilities
import { isNumber } from '../../utilities/general';
import { radia2d } from '../../utilities/survey';

@Component({
  selector: 'app-radiate2d',
  templateUrl: './radiate2d.component.html',
  styleUrls: ['./radiate2d.component.scss']
})
export class Radiate2dComponent implements OnInit {
  errorMessage = "";
  xBase = new FormControl('', [Validators.required]);
  yBase = new FormControl('', [Validators.required]);
  desorientacion = new FormControl('', [Validators.required]);
  lecturaHorizontal = new FormControl('', [Validators.required]);
  distancia = new FormControl('', [Validators.required]);

  azimutResult = new FormControl();
  xResult = new FormControl();
  yResult = new FormControl();

  controlsGroup = new FormGroup({
    xBase: this.xBase,
    yBase: this.yBase,
    desorientacion: this.desorientacion,
    lecturaHorizontal: this.lecturaHorizontal,
    distancia: this.distancia,
    azimutResult: this.azimutResult,
    xResult: this.xResult,
    yResult: this.yResult
  });

  ngOnInit(): void {
    this.clearResults();
  }

  clearResults(): void {
    this.azimutResult.setValue("");
    this.xResult.setValue("");
    this.yResult.setValue("");
  }

  calculate(): void {
    if (!isNumber(this.xBase.value)) { this.errorMessage = "X base must be numeric"; return; }
    if (!isNumber(this.yBase.value)) { this.errorMessage = "Y base must be numeric"; return; }
    if (!isNumber(this.desorientacion.value)) { this.errorMessage = "Desorientación must be numeric"; return; }
    if (!isNumber(this.lecturaHorizontal.value)) { this.errorMessage = "Lectura horizontal must be numeric"; return; }
    if (!isNumber(this.distancia.value)) { this.errorMessage = "Distance must be numeric"; return; }
    this.errorMessage = "";

    const basePt = new Point2d(Number(this.xBase.value), Number(this.yBase.value));
    
    // Azimut = lectura horizontal + desorientacion
    let az = Number(this.lecturaHorizontal.value) + Number(this.desorientacion.value);
    while (az < 0) az += 400;
    while (az >= 400) az -= 400;

    const ad = new AzimutDistance(az, Number(this.distancia.value));
    const radiatedPt = radia2d(basePt, ad);

    this.azimutResult.setValue(az.toFixed(4).toString());
    this.xResult.setValue(radiatedPt.x.toFixed(3).toString());
    this.yResult.setValue(radiatedPt.y.toFixed(3).toString());
  }
}
