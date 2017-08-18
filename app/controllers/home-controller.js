"use strict";

workoutJournalApp.controller("HomeController", function($timeout, $route, $scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

	let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
  currentUser = UserFactory.getUser();
  fetchMyWorkouts();
  });


  //When home page loads, this function is called
  //This function calls a get function in wj factory
  function fetchMyWorkouts() {
  let myWorkoutsArr = [];
    WorkoutJournalFactory.getWorkouts()
    .then( (myWorkoutsList) => {
      let myWorkoutsData = myWorkoutsList.data;
      //Takes the each workout route parameter
      //and assign it to each workout a value of the property id
      //to be used to attach to user exercises so they can relate to each other
      Object.keys(myWorkoutsData).forEach( (key) => {
          myWorkoutsData[key].id = key;
          myWorkoutsArr.push(myWorkoutsData[key]);
      });
      $timeout( function() {
        $scope.myWorkouts = myWorkoutsArr;
      }, 500);
    })
    .catch( (err) => {
      console.log("error", err);
    });
  }

  //Deletes the workout profile and all associated user exercises
  $scope.deleteWorkout = (workoutURL) => {
    WorkoutJournalFactory.deleteWorkout(workoutURL)
    .then( (data) => {
      WorkoutJournalFactory.deleteWorkoutExercises(workoutURL);
      fetchMyWorkouts();
    });
  };

  $scope.logout = () => {
    UserFactory.logoutUser();
  };

});