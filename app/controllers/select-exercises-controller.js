"use strict";

workoutJournalApp.controller("SelectExercisesController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  //Exercise profile to be posted to firebase after user input
  $scope.userExercises = {
    name: "",
    uid: UserFactory.getUser(),
    workoutID: $routeParams.workoutFBID
  };

  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.workoutFBID);
    fetchWorkoutExercises($routeParams.workoutFBID);
    testURL = $routeParams.workoutFBID;
  });


  //This function is called when the page loads
  //calls a get function in wj factory to get the workout profile object
  //that was just created, sending the user to this page
  //Sole purpose is to have the workout profile displayed while the user selects their exercises
  $scope.workoutArr = [];
  function fetchSingleWorkout(workoutURL) {
      WorkoutJournalFactory.getSingleWorkout(workoutURL)
      .then( (workout) => {
        $scope.workoutArr.push(workout.data);
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }


  //When the page loads, this function is called to get all user exercises
  //associated with the selected workout profile
  $scope.workoutExercisesArr = [];
  function fetchWorkoutExercises(workoutURL) {
      WorkoutJournalFactory.getSelectExercises(workoutURL)
      .then( (workout) => {
        let workoutData = workout.data;
        Object.keys(workoutData).forEach( (key) => {
          $scope.workoutExercisesArr.push(workoutData[key]);
        });
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }

  //Takes user back to the view workout page
  $scope.saveUserExercises = () => {
    $window.location.href = `#!/view-workout/${testURL}`;
  };

  //Deletes workout profile and all associated user exercises
  $scope.cancelCreateWorkout = () => {
    WorkoutJournalFactory.deleteWorkout($routeParams.workoutFBID)
    .then( (data) => {
      $window.location.href = `#!/home`;
    });
  };

  //Takes user to the choose exercise page
  $scope.addExercises = () => {
    $window.location.href = `#!/create-workout/choose-exercise/${testURL}`;
  };

});