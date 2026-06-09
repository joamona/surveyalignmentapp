import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// utilities
import { isNumber } from '../../utilities/general';

@Component({
  selector: 'app-radiate3d',
  templateUrl: './radiate3d.component.html',
  styleUrls: ['./radiate3d.component.scss']
})
export class Radiate3dComponent implements OnInit {
  errorMessage = "";

  xBase = new FormControl('', [Validators.required]);
  yBase = new FormControl('', [Validators.required]);
  zBase = new FormControl('', [Validators.required]);
  desorientacion = new FormControl('', [Validators.required]);
  lecturaHorizontal = new FormControl('', [Validators.required]);
  lecturaVertical = new FormControl('', [Validators.required]);
  distanciaGeometrica = new FormControl('', [Validators.required]);
  i = new FormControl('', [Validators.required]);
  m = new FormControl('', [Validators.required]);
  coeficienteRefraccion = new FormControl('0.08', [Validators.required]);

  azimutResult = new FormControl();
  distanciaReducida = new FormControl();
  tResult = new FormControl();
  correccionRefraccion = new FormControl();
  xResult = new FormControl();
  yResult = new FormControl();
  zResult = new FormControl();

  controlsGroup = new FormGroup({
    xBase: this.xBase,
    yBase: this.yBase,
    zBase: this.zBase,
    desorientacion: this.desorientacion,
    lecturaHorizontal: this.lecturaHorizontal,
    lecturaVertical: this.lecturaVertical,
    distanciaGeometrica: this.distanciaGeometrica,
    i: this.i,
    m: this.m,
    coeficienteRefraccion: this.coeficienteRefraccion,
    azimutResult: this.azimutResult,
    distanciaReducida: this.distanciaReducida,
    tResult: this.tResult,
    correccionRefraccion: this.correccionRefraccion,
    xResult: this.xResult,
    yResult: this.yResult,
    zResult: this.zResult
  });

  ngOnInit(): void {
    this.clearResults();
  }

  clearResults(): void {
    this.azimutResult.setValue("");
    this.distanciaReducida.setValue("");
    this.tResult.setValue("");
    this.correccionRefraccion.setValue("");
    this.xResult.setValue("");
    this.yResult.setValue("");
    this.zResult.setValue("");
  }

  calculate(): void {
    if (!isNumber(this.xBase.value)) { this.errorMessage = "X base must be numeric"; return; }
    if (!isNumber(this.yBase.value)) { this.errorMessage = "Y base must be numeric"; return; }
    if (!isNumber(this.zBase.value)) { this.errorMessage = "Z base must be numeric"; return; }
    if (!isNumber(this.desorientacion.value)) { this.errorMessage = "Desorientación must be numeric"; return; }
    if (!isNumber(this.lecturaHorizontal.value)) { this.errorMessage = "Lectura horizontal must be numeric"; return; }
    if (!isNumber(this.lecturaVertical.value)) { this.errorMessage = "Lectura vertical must be numeric"; return; }
    if (!isNumber(this.distanciaGeometrica.value)) { this.errorMessage = "Distancia geométrica must be numeric"; return; }
    if (!isNumber(this.i.value)) { this.errorMessage = "Altura del aparato (i) must be numeric"; return; }
    if (!isNumber(this.m.value)) { this.errorMessage = "Altura de mira (m) must be numeric"; return; }
    if (!isNumber(this.coeficienteRefraccion.value)) { this.errorMessage = "Coeficiente de refracción must be numeric"; return; }

    this.errorMessage = "";

    const xb = Number(this.xBase.value);
    const yb = Number(this.yBase.value);
    const zb = Number(this.zBase.value);
    const desor = Number(this.desorientacion.value);
    const lh = Number(this.lecturaHorizontal.value);
    const lv = Number(this.lecturaVertical.value);
    const dg = Number(this.distanciaGeometrica.value);
    const hi = Number(this.i.value);
    const hm = Number(this.m.value);
    const k = Number(this.coeficienteRefraccion.value);

    // Azimut = lectura horizontal + desorientacion
    let az = lh + desor;
    while (az < 0) az += 400;
    while (az >= 400) az -= 400;

    // Convert centesimal to radians: angle * PI / 200
    const azRad = az * Math.PI / 200;
    const lvRad = lv * Math.PI / 200;

    // Formulas:
    // distanciaReducida = distanciaGeometrica * cos(lecturaVertical)
    // t = distanciaGeometrica * sin(lecturaVertical)
    // correccionRefraccion = (1 - coeficienteRefraccion) / (2 * 6371000) * distanciaReducida * distanciaReducida
    // xPuntoRadiado = xBase + distanciaReducida * sin(azimut)
    // yPuntoRadiado = yBase + distanciaReducida * cos(azimut)
    // zPuntoRadiado = zBase + t + i - m + correccionRefraccion

    const dr = dg * Math.sin(lvRad);
    const t = dg * Math.cos(lvRad);
    const cr = ((1 - k) / (2 * 6371000)) * dr * dr;

    const xp = xb + dr * Math.sin(azRad);
    const yp = yb + dr * Math.cos(azRad);
    const zp = zb + t + hi - hm + cr;

    this.azimutResult.setValue(az.toFixed(4).toString());
    this.distanciaReducida.setValue(dr.toFixed(3).toString());
    this.tResult.setValue(t.toFixed(3).toString());
    this.correccionRefraccion.setValue(cr.toFixed(5).toString());
    this.xResult.setValue(xp.toFixed(3).toString());
    this.yResult.setValue(yp.toFixed(3).toString());
    this.zResult.setValue(zp.toFixed(3).toString());
  }
}
