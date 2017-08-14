"use strict";

workoutJournalApp.controller("StartWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {



  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    testURL = $routeParams.startWorkoutFBID;
    fetchSingleWorkout($routeParams.startWorkoutFBID);
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
    reps4: "",
    wt4: "",
    reps5: "",
    wt5: "",
    reps6: "",
    wt6: "",
    reps7: "",
    wt7: "",
    reps8: "",
    wt8: "",
    reps9: "",
    wt9: "",
    reps10: "",
    wt10: "",
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
          workoutData[key].exerciseId = key;
          $scope.workoutExercisesArr.push(workoutData[key]);
        });
        console.log($scope.workoutExercisesArr);
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }

  $scope.startExercise = (urlParam) => {
    $window.location.href = `#!/start-workout/${testURL}/start-exercise/${urlParam}`;
  };

  $scope.saveCompletedExercise = (exerciseName) => {
    $scope.completedWorkout.name = exerciseName;
    WorkoutJournalFactory.postFinishedExercise($scope.completedWorkout);
  };

  $scope.updateWorkout = () => {
    WorkoutJournalFactory.patchFinishedWorkout($scope.createWorkout, testURL);
    $window.location.href = `#!/home`;
  };

});