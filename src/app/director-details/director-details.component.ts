/**
 * @module get-information-on-director
 * @remarks
 * This component allows to display information about the director of each movie in a dialog prompt (when clicked by users). To do so, it takes the information about the director of X movie object, and renders it in the html.
 * @example  
 * In the TypeScript file, this is the data extracted from a movie object and required for this component to work:
 * 
 * data: {
 *    Name: string,
 *    Bio: string,
 *    Birth: string,
 *    Death: string
 *  }
 * 
 * These are then accessed within the html (e.g: {{ data.Name }} to display director's name).
 * @param - Name = director's name <br>
 * Bio = director's biography <br>
 * Birth = director's birth <br>
 * Death = director's death <br>
 * @returns Director's all information.
 */

import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss']
})

export class DirectorDetailsComponent {
  director: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string
    }
  ) { }
}