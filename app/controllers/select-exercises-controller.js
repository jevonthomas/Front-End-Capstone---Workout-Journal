"use strict";

workoutJournalApp.controller("SelectExercisesController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.userExercises = {
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
    workoutID: $routeParams.workoutFBID
  };

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.workoutFBID);
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

  $scope.saveUserExercises = () => {
    WorkoutJournalFactory.postUserExercises($scope.userExercises, $routeParams.workoutFBID);
    $window.location.href = `#!/home`;
  };

  $scope.cancelCreateWorkout = () => {
    WorkoutJournalFactory.deleteWorkout($routeParams.workoutFBID)
    .then( (data) => {
    $window.location.href = `#!/home`;
    });
  };

});