import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component with genre information dialog
 * @selector 'app-genre'
 * @templateURL './genre.component.html'
 * @styleURL './genre.component.scss',
 */

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss',
})
export class GenreComponent implements OnInit {
  /**
   * @constructor - constructor for GenereComponent
   * @param  - Data containing genre info
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
