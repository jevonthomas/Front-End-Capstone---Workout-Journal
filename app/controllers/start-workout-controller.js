"use strict";

workoutJournalApp.controller("StartWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {



  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    testURL = $routeParams.startWorkoutFBID;
    fetchSingleWorkout($routeParams.viewWorkoutFBID);
    fetchWorkoutExercises(testURL);
  });

  $scope.createWorkout = {
    isCompleted: true
  };

  $scope.completedWorkout = {
    name: "",
    reps1: "",
    wt1: "",
    reps2: "",
    wt2: "",
    reps3: "",
    wt3: "",
    workoutID: testURL
  };

  //This function is calle when the page loads
  //This function gets the workout info for the workout card to be displayed on the DOM
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

  //This function is called when the page loads
  //This function gets all the exercises associated with the viewed workouts
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

  $scope.saveCompletedExercise = (exerciseName) => {
    $scope.completedWorkout.name = exerciseName;
    WorkoutJournalFactory.postFinishedExercise($scope.completedWorkout);
  };

  $scope.updateWorkout = () => {
    WorkoutJournalFactory.patchFinishedWorkout($scope.createWorkout, testURL);
    $window.location.href = `#!/home`;
  };

});