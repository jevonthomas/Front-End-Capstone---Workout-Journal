"use strict";

workoutJournalApp.controller("EditWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  //Workout profile object to be patched to firebase after user inputs the values
  $scope.editWorkout = {
    day: "",
    name: "",
    goal: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.editWorkoutParam);
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

    //Calls a post function in the wj factory with the workout profile
  //object as an argument
  //Takes the user to the select exercises page
  $scope.saveWorkout = () => {
    WorkoutJournalFactory.patchUserWorkout($scope.editWorkout, $routeParams.editWorkoutParam)
    .then( (data) => {
      $window.location.href = `#!/edit-workout/${$routeParams.editWorkoutParam}/edit-exercises/${$routeParams.editWorkoutParam}`;
    });
  };

});