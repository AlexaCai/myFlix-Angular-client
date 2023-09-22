import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//***Declaring the api url that will provide data for the client app.
const apiUrl = 'https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  //***Inject the HttpClient module to the constructor params.
  //***This will provide HttpClient to the entire class, making it available via this.http.
  constructor(private http: HttpClient) {
  }


  //***Making the api call for the user registration endpoint.
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  //***Making the api call for the user login endpoint.
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET all movies.
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET one movie.
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET director info.
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET genre info.
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET user info.
  getUserInfo(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which GET user favorite movies info.
  getUserfavoriteMovies(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies || []),
      catchError(this.handleError)
    );
  }


  userAddFavoriteMovie(Username: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    const requestBody = {};
    return this.http.post(apiUrl + 'users/' + Username + '/movies/' + MovieID, requestBody, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  //***Making the api call to the endpoint which DELETE one of user's favorite movie.
  userDeleteFavoriteMovie(Username: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which UPDATE user info.
  updateUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***Making the api call to the endpoint which DELETE user account.
  deleteUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: 'text',
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //***on-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Action failed.');
  }
}