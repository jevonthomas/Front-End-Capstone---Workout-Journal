"use strict";

workoutJournalApp.controller("StartExerciseController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.completedExercise = {
    name: "",
    reps1: "",
    wt1: "",
    reps2: "",
    wt2: "",
    reps3: "",
    wt3: "",
    reps4: "",
    wt4: "",
    reps5: "",
    wt5: "",
    reps6: "",
    wt6: "",
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

  $scope.saveCompletedExercise = (exerciseName) => {
    $scope.completedExercise.name = exerciseName;
    WorkoutJournalFactory.postFinishedExercise($scope.completedExercise);
  };

});