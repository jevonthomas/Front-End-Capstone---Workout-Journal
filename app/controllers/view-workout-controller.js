"use strict";

workoutJournalApp.controller("ViewWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.viewWorkoutFBID);
    testURL = $routeParams.viewWorkoutFBID;
  });

  //This function is called when the page loads
  //This function gets the workout info for the workout card to be displayed on the DOM
  $scope.workoutArr = [];
  function fetchSingleWorkout(workoutURL) {
      WorkoutJournalFactory.getSingleWorkout(workoutURL)
      .then( (workout) => {
        $scope.workoutArr.push(workout.data);
        fetchWorkoutExercises(workoutURL);
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

  //Takes user to start workout page
  $scope.startWorkout = () => {
    $window.location.href = `#!/start-workout/${testURL}`;
  };

  $scope.editWorkout = () => {
    $window.location.href = `#!/edit-workout/${testURL}`;
  };

});