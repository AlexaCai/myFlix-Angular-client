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