import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-favorite-details',
  templateUrl: './remove-favorite-details.component.html',
  styleUrls: ['./remove-favorite-details.component.scss']
})
export class RemoveFavoriteDetailsComponent {
  favoriteMovie: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
    }
  ) { }
}