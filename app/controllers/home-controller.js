"use strict";

workoutJournalApp.controller("HomeController", function($route, $scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

	let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
  currentUser = UserFactory.getUser();
  fetchMyWorkouts();
  });

  let myWorkoutsArr = [];
  function fetchMyWorkouts() {
    WorkoutJournalFactory.getWorkouts()
    .then( (myWorkoutsList) => {
      let myWorkoutsData = myWorkoutsList.data;
      Object.keys(myWorkoutsData).forEach( (key) => {
          myWorkoutsData[key].id = key;
          myWorkoutsArr.push(myWorkoutsData[key]);
      });
      $scope.myWorkouts = myWorkoutsArr;
      myWorkoutsArr.reverse();
    })
    .catch( (err) => {
      console.log("error", err);
    });
  }

  $scope.deleteWorkout = (workoutURL) => {
    WorkoutJournalFactory.deleteWorkout(workoutURL);
    WorkoutJournalFactory.deleteWorkoutExercises(workoutURL);
  };

});