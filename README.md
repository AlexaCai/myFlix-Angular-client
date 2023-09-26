# *myFlix* web app documentation (frontend - Angular)

**Content**
- Projet description
-  User interface
- Technical aspects (overview)
- Technical aspect (development)
- App dependencies

## Projet description

*myFlix* web app has been created to serve as a reference in the domain of visual entertainment. Users can create an account and then log into *myFlix* to have access to information about different movies. They can search for movies and create lists of favorites. *myFlix* has been built in two parts: the frontend (here) and the backend ([see this repository for the backend part of *myFlix*](https://github.com/AlexaCai/movie-api)).

The objective of this part of the project (frontend) was to develop an easy-to-use and responsive web app using Angular for the best user-experience whenever they are accessing *myFlix* to read details about different movies.

*myFlix* frontend development can be breakdown in the five following points:

-  **Who** — The users of *myFlix* web app, so movie enthusiasts who enjoy reading information about different movies.

-  **What** — A single-page, responsive app with routing, rich interactions, several interface views and a polished user experience. This client-side developed in this project support my previously built server-side API by facilitating user requests and rendering the response from the backend via a number of different interface views.

-  **When** — *myFlix* users are able to use it whenever they want to read and save information about different movies.

- **Where** — *myFlix* frontend logic is hosted online (gh-pages). *myFlix* itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience.

- **Why** — Movie enthusiasts like to be able to access information about different movies, whenever they want to. Having the ability to save a list of their favorite movies ensure users always have access to the films they want to watch or recommend to their peers.

## User interface

More concretely, when a user is not logged in, he has access to two elements on the welcome page: log in or sign up. Once logged in in the app, the user has access to two main views: home and profile.

In the home view, the user can see all the movies within the app. He can click on any link in the action bar below each movie to get a more information, and add the movie to his list of favorite if desired (he can also remove it from his list of favorite if the movie is already present in his favorite).

In the profile view, the user can view and update his account information, as well as delete his account. He can also see all the movies he has added to his list of favorite, and remove movies from his list if desired.

All views have been coded to be responsive, using a combination of Angular Material and SCSS.

## Technical aspects (overview)

The application is powered by an API built with Express framework. This API is hosted on Heroku and allows different types of requests from *myFlix* app (get movies and users' data, allows users to update info, allows users to delete account, etc.). For more information on the API used, [see the README in the following repository](https://github.com/AlexaCai/movie-api).

The frontend of *myFlix* app uses Angular. All data for the app is stored in a MongoDB database.

The specific technologies and tools used in this project are the following:

-   Angular
-   TypeScript
-   HTML
-   SCSS
-   Angular Material
-   TypeDoc

 ## Technical aspects (development)
 
**Angular CLI**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

**Development server**

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

  **Code scaffolding**

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

**Build**

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

**Running unit tests**

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

**Running end-to-end tests**

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

**Further help**

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## App dependencies

The following dependencies are required for the *myFlix* fronttend logic to work:

dependencies:

- @angular/animations: ^16.2.0
- @angular/cdk: ^16.2.4
- @angular/common: ^16.2.0
- @angular/compiler: ^16.2.0"
- @angular/core: ^16.2.0
- @angular/flex-layout: ^15.0.0-beta.42
- @angular/forms: ^16.2.0
- @angular/material": ^16.2.4
- @angular/platform-browser: ^16.2.0
- @angular/platform-browser-dynamic: ^16.2.0
- @angular/router": ^16.2.0
- rxjs: ~7.8.0
- tslib: ^2.3.0
- zone.js: ~0.13.0

For devDependencies

- @angular-devkit/build-angular: ^16.2.2
- @angular/cli: ~16.2.2
- @angular/compiler-cli: ^16.2.0
- @types/jasmine: ~4.3.0
- angular-cli-ghpages: ^1.0.7
- jasmine-core: ~4.6.0
- karma: ~6.4.0
- karma-chrome-launcher: ~3.2.0
- karma-coverage: ~2.2.0
- karma-jasmine: ~5.1.0
- karma-jasmine-html-reporter: ~2.1.0
- typedoc: ^0.25.1
- typescript: ~5.1.3