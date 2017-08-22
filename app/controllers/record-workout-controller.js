"use strict";

workoutJournalApp.controller("RecordWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.editWorkout = {
    day: "",
    goal: "",
    muscle_group: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  $scope.editExercises = {
    name_1: "",
    name_2: "",
    name_3: "",
    name_4: "",
    name_5: "",
    name_6: "",
    name_7: "",
    name_8: "",
    isCompleted: true,
    uid: UserFactory.getUser(),
    workoutID: $routeParams.viewWorkoutFBID
  };

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.viewWorkoutFBID);
    fetchWorkoutExercises($routeParams.viewWorkoutFBID);
  });

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
  $scope.exerciseArr = [];
  function fetchWorkoutExercises(workoutURL) {
      WorkoutJournalFactory.getWorkoutExercises(workoutURL)
      .then( (exercises) => {
        let exerciseData = exercises.data;
        Object.keys(exerciseData).forEach( (key) => {
          $scope.exerciseArr.push(exerciseData[key]);
        });
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }

  $scope.exercises = [];
  $scope.fetchExercises = (muscleGroup) => {
      WorkoutJournalFactory.getExercises(muscleGroup)
      .then( (exerciseList) => {
          let exerciseData = exerciseList.data;
          Object.keys(exerciseData).forEach( (key) => {
              $scope.exercises.push(exerciseData[key]);
          });
      })
      .catch( (err) => {
          console.log("error", err);
      });
  };

  $scope.updateUserWorkout = () => {
    WorkoutJournalFactory.patchUserWorkout($scope.editWorkout, $routeParams.viewWorkoutFBID);
    WorkoutJournalFactory.patchUserExercises($scope.editExercises, $routeParams.viewWorkoutFBID);
  };

});