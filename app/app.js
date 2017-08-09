"use strict";

let workoutJournalApp = angular.module("WorkoutJournalApp", ["ngRoute"])
.constant("FirebaseUrl", "https://front-end-capstone-b2200.firebaseio.com");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if (userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

workoutJournalApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController',
    resolve: {isAuth}
  })
  .when('/create-workout', {
    templateUrl: 'partials/create-workout.html',
    controller: 'CreateWorkoutController',
    resolve: {isAuth}
  })
  .when('/create-workout/select-exercises/:workoutFBID', {
    templateUrl: 'partials/select-exercises.html',
    controller: 'SelectExercisesController',
    resolve: {isAuth}
  })
  .when('/edit-workout/:editWorkoutFBID', {
    templateUrl: 'partials/edit-workout.html',
    controller: 'EditWorkoutController',
    resolve: {isAuth}
  })
  .otherwise('/');
});
