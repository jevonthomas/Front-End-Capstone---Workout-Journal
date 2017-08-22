"use strict";

workoutJournalApp.controller("CreateWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  //Workout profile object to be posted to firebase after user inputs the values
  $scope.createWorkout = {
    day: "",
    name: "",
    goal: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  //Calls a post function in the wj factory with the workout profile
  //object as an argument
  //Takes the user to the select exercises page
  $scope.saveWorkout = () => {
    WorkoutJournalFactory.postNewWorkout($scope.createWorkout)
    .then( (data) => {
      $window.location.href = `#!/create-workout/select-exercises/${data.data.name}`;
    });
  };

  //Returns the user to home page
  $scope.cancelWorkoutCreation = () => {
    $window.location.href = `#!/home`;
  };

});