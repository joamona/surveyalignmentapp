import { Component, OnInit} from '@angular/core';

import { SidenavsService } from '../../services/sidenavs.service';

@Component({
  selector: 'main-module-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent implements OnInit {
  constructor(private sidenavsService: SidenavsService) { }

  ngOnInit(): void {
  }
  closeNavLeft(){
    this.sidenavsService.closeNavLeft();
  }
}
