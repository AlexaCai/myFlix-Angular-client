/**
 * @module favorite-movie-add
 * @remarks
 * This component allows to display a message in a dialog prompt (when a movie favorite icon is clicked) to confirm that the movie has been added to the user's list of favorite. To do so, it takes the information about the title of X movie object, and renders it in the html along with a generic message.
 * 
 * The logic/function to POST a new favorite movie to a user document in the database can be found in the <strong>get-all-movie</strong> section <strong>(movie-card.component.ts)</strong>. 
 * @example  
 * In the TypeScript file, this is the data extracted from a movie object and required for this component to work:
 * 
 * data: {
 *    Title: string
 *  }
 * 
 * This is then accessed within the html (via {{ data.Title }}) to display the correct movie's title dynamically in the dialog prompt).
 * @param - Title = movie's title
 * @returns Dialog prompt confirming users that their movie has been correctly added in their favorite: '{{ data.Title }} has been successfully added to your list of favorite!'.
 */

import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-favorite-details',
  templateUrl: './add-favorite-details.component.html',
  styleUrls: ['./add-favorite-details.component.scss']
})
export class AddFavoriteDetailsComponent {
  favoriteMovie: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
    }
  ) { }
}
