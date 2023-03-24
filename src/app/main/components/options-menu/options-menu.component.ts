import { Component, OnInit } from '@angular/core';
import { SidenavsService } from '../../services/sidenavs.service';
//import { MapService } from '../../../map/services/map.service';

@Component({
  selector: 'main-module-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {

  constructor(public sidenavsService:SidenavsService) { }


  ngOnInit(): void {
    
  }


}
