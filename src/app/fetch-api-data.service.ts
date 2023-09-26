/**
 * @module fetch-api-service
 * @remarks
 * This component regroups all the logic and function to call the different API's endpoints. Specific logics/functions defined in this file to call the endpoints are re-used throughout all the other files of this project when necessary to complete different actions (e.g.: fetch all movies in the app initial page - see <strong>get-all-movie</strong> section <strong>(movie-card.component.ts)</strong>).
 * 
 * This component include several requests/functions:
 * 
 * -6 GET requests <br>
 * -1 PUT request <br>
 * -3 POST requests <br>
 * -2 DELETE requests
 */

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


/** 
* Declaring the api url that will provide data for the client app.
*/
const apiUrl = 'https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})


/** 
* This will provide HttpClient to the entire class, making it available via this.http.
*/
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }


/** 
* Making the api call for the user registration endpoint.
* @param userDetails 
* @returns JSON user object.
*/
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError((error) => {
        //***Return the error response as an object with status and message properties (used to display during update if user try to use a username or email already used by someone else).
        return throwError({ status: error.status, message: error.error });
      })
    );
  }


/** 
* Making the api call for the user login endpoint.
* @param userDetails 
* @returns Information on user that has logged in is stored in localStorage, along with a JWT.
*/
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


/** 
* Making the api call to the endpoint which GET all movies.
* @returns All movies from the database.
*/
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


/** 
* Making the api call to the endpoint which GET one movie.
* @param title
* @returns JSON movie object on the selected movie.
*/
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


/** 
* Making the api call to the endpoint which GET director information.
* @param directorName
* @returns JSON movie object(s) of the movie(s) that have been directed by the selected director (which then allow to extract director's information).
*/
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


/** 
* Making the api call to the endpoint which GET genre information.
* @param genreName
* @returns JSON movie object(s) of the movie(s) categorized in the genre of the selected genre (which then allow to extract genre's information).
*/
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

/** 
* Making the api call to the endpoint which GET user information.
* @param Username
* @returns JSON user object.
*/
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

/** 
* Making the api call to the endpoint which GET user favorite movies information.
* @param Username
* @returns JSON user object (which then allow to extract user's favorite movies information).
*/
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


/** 
* Making the api call to the endpoint which POST a movie to user's favorite movies.
* @param Username
* @param MovieID
* @returns JSON user object.
*/
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

/** 
* Making the api call to the endpoint which DELETE one of user's favorite movies.
* @param Username
* @param MovieID
* @returns JSON user object.
*/
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


/** 
* Making the api call to the endpoint which UPDATE user information.
* @param Username
* @param userData
* @returns JSON user object.
*/
  updateUser(Username: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError((error) => {
        //***Return the error response as an object with status and message properties (messages is used to display the right information during sign up/update process if users try to use a username or an email already used by someone else).
        return throwError({ status: error.status, message: error.error });
      })
    );
  }

/** 
* Making the api call to the endpoint which DELETE user account.
* @param Username
* @returns Confirmation message that the account has been deleted.
*/
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


  //***On-typed response extraction
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