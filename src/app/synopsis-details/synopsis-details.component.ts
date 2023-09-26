/**
 * @module get-information-on-synopsis
 * @remarks
 * This component allows to display information about the description/synopsis of each movie in a dialog prompt (when clicked by users). To do so, it takes the information about X movie object, and renders it in the html.
 * @example  
 * In the TypeScript file, this is the data extracted from a movie object and required for this component to work:
 * 
 * data: {
 *    Descritpion: string
 *  }
 * 
 * These are then accessed within the html (e.g: {{ data.Name }} to display genre's name).
 * @param - Description = movie's description/synopsis.
 * @returns Movie's description/synopsis.
 */

import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-details',
  templateUrl: './synopsis-details.component.html',
  styleUrls: ['./synopsis-details.component.scss']
})
export class SynopsisDetailsComponent {
  synopsis: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string,
    }
  ) { }
}