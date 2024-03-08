import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component with movie details information dialog
 * @selector 'app-movie-details'
 * @templateURL './movie-details.component.html'
 * @styleURL './movie-details.component.scss',
 */

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  /**
   * @constructor - constructor for MovieDetailsComponent
   * @param  - Data containing movie details
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
