import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component with director information dialog
 * @selector 'app-director'
 * @templateURL './director.component.html'
 * @styleURL './director.component.scss',
 */

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss',
})
export class DirectorComponent implements OnInit {
  /**
   * @constructor - constructor for DirectorComponent
   * @param  - Data containing director info
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) {}

  ngOnInit(): void {}
}
