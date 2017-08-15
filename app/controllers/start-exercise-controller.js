"use strict";

workoutJournalApp.controller("StartExerciseController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.completedExercise = {
    name: "",
    compReps1: "",
    compWt1: "",
    compReps2: "",
    compWt2: "",
    compReps3: "",
    compWt3: "",
    compReps4: "",
    compWt4: "",
    compReps5: "",
    compWt5: "",
    compReps6: "",
    compWt6: "",
    isCompleted: true,
    workoutID: $routeParams.startWorkoutFBID
  };

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchExercise($routeParams.exerciseID);
  });

  //This function is called when the page loads
  //This function gets all the exercises associated with the viewed workouts
  $scope.exerciseArr = [];
  function fetchExercise(exerciseURL) {
      WorkoutJournalFactory.getCurrentExercise(exerciseURL)
      .then( (exercise) => {
        let exerciseData = exercise.data;
        console.log("just the data", exerciseData);
        $scope.exerciseArr.push(exerciseData);
        console.log("controller", $scope.exerciseArr);
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }

  //Updates the exercise profile with the user's recorded performance
  $scope.saveCompletedExercise = (exerciseName) => {
    $scope.completedExercise.name = exerciseName;
    WorkoutJournalFactory.postFinishedExercise($scope.completedExercise, $routeParams.exerciseID);
    $window.history.back();
  };

});