"use strict";

workoutJournalApp.controller("EditWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.editWorkout = {
    day: "",
    goal: "",
    muscle_group: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  $scope.editExercises = {
    name_1: "",
    set_1: {
      rep: "",
      wt: ""
    },
    set_2: {
      rep: "",
      wt: ""
    },
    set_3: {
      rep: "",
      wt: ""
    },
    uid: UserFactory.getUser(),
    fbid: ""
  };

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.editWorkoutFBID);
    fetchWorkoutExercises($routeParams.editWorkoutFBID);
  });

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

  $scope.exerciseArr = [];
  function fetchWorkoutExercises(workoutURL) {
      WorkoutJournalFactory.getWorkoutExercises(workoutURL)
      .then( (exercises) => {
        let exercisesData = exercises.data;
        Object.keys(exercisesData).forEach( (key) => {
              // takes firebase id and stores it in object
              exercisesData[key].fbid = key;
              $scope.exerciseArr.push(exercisesData[key]);
          });
      })
      .catch( (err) => {
          console.log("error", err);
      });
  }

  $scope.updateUserWorkout = (urlBase) => {
    WorkoutJournalFactory.patchUserWorkout($scope.editWorkout, $routeParams.editWorkoutFBID);
    WorkoutJournalFactory.patchUserExercises($scope.editExercises, urlBase);
  };

});