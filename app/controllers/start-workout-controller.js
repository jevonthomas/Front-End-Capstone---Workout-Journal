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

  //Gets added to the workout profile to signify that the workout has been completed
  //Used for the home screen to divide new and completed workouts
  $scope.createWorkout = {
    isCompleted: true
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


  //Takes the user to the start exercise page
  $scope.startExercise = (urlParam) => {
    $window.location.href = `#!/start-workout/${testURL}/start-exercise/${urlParam}`;
  };

  //Updates the workout profile to complete and returns the user to home page
  $scope.updateWorkout = () => {
    WorkoutJournalFactory.patchFinishedWorkout($scope.createWorkout, testURL);
    $window.location.href = `#!/home`;
  };

  $scope.goBack = () => {
    $window.history.back();
  };

});