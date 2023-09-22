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
