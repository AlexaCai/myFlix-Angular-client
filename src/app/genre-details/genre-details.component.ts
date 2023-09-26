/**
 * @module get-information-on-genre
 * @remarks
 * This component allows to display information about the genre of each movie in a dialog prompt (when clicked by users). To do so, it takes the information about the genre of X movie object, and renders it in the html.
 * @example  
 * In the TypeScript file, this is the data extracted from a movie object and required for this component to work:
 * 
 * data: {
 *    Name: string,
 *    Descritpion: string
 *  }
 * 
 * These are then accessed within the html (e.g: {{ data.Name }} to display genre's name).
 * @param - Name = genre's name <br>
 * Descritpion = genre's description <br>
 * @returns Genre's all information.
 */

import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})


export class GenreDetailsComponent {
  genre: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }
}