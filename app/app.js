"use strict";

let workoutJournalApp = angular.module("WorkoutJournalApp", ["ngRoute", "ui.materialize"])
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
  .when('/view-workout/:viewWorkoutFBID', {
    templateUrl: 'partials/view-workout.html',
    controller: 'ViewWorkoutController',
    resolve: {isAuth}
  })
  .when('/record-workout/:viewWorkoutFBID', {
    templateUrl: 'partials/record-workout.html',
    controller: 'RecordWorkoutController',
    resolve: {isAuth}
  })
  .when('/create-workout/choose-exercise/:workoutFBID', {
    templateUrl: 'partials/choose-exercise.html',
    controller: 'ChooseExercisesController',
    resolve: {isAuth}
  })
  .when('/create-workout/choose-exercise/:workoutFBID/sets/:setURL', {
    templateUrl: 'partials/sets.html',
    controller: 'SetsController',
    resolve: {isAuth}
  })
  .when('/start-workout/:startWorkoutFBID', {
    templateUrl: 'partials/start-workout.html',
    controller: 'StartWorkoutController',
    resolve: {isAuth}
  })
  .when('/start-workout/:startWorkoutFBID/start-exercise/:exerciseID', {
    templateUrl: 'partials/start-exercise.html',
    controller: 'StartExerciseController',
    resolve: {isAuth}
  })
  .when('/edit-workout/:editWorkoutParam', {
    templateUrl: 'partials/edit-workout.html',
    controller: 'EditWorkoutController',
    resolve: {isAuth}
  })
  .when('/edit-workout/:editWorkoutParam/edit-exercises/:editExerciseParam', {
    templateUrl: 'partials/edit-exercises.html',
    controller: 'EditExercisesController',
    resolve: {isAuth}
  })
  .when('/edit-workout/:editWorkoutParam/edit-exercises/:editExerciseParam/sets/:editSetsParam', {
    templateUrl: 'partials/edit-sets.html',
    controller: 'EditSetsController',
    resolve: {isAuth}
  })
  .otherwise('/');
});
