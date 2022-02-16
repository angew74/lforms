import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';

@Component({
  selector: 'lhc-item',
  templateUrl: './lhc-item.component.html',
  styleUrls: ['./lhc-item.component.css'],
})
export class LhcItemComponent implements OnInit {

  @Input() item;

  viewMode = "";  

  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {     
    winService.windowWidth.subscribe(updatedWidth => {
      this.viewMode = winService.getViewMode();
    });  
  }

  /**
   * get CSS class of view mode for an item
   * @param item an item in a form
   * @returns 
   */
  getItemViewModeClass(item) {
    return this.lhcDataService.getItemViewModeClass(item, this.viewMode)
  }

  ngOnInit(): void {
  }

  
}