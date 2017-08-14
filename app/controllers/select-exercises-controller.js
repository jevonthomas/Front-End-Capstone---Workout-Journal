"use strict";

workoutJournalApp.controller("SelectExercisesController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  $scope.userExercises = {
    name: "",
    uid: UserFactory.getUser(),
    workoutID: $routeParams.workoutFBID
  };

  let currentUser = null;
  let testURL = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.workoutFBID);
    fetchWorkoutExercises($routeParams.workoutFBID);
    testURL = $routeParams.workoutFBID;
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
    $window.location.href = `#!/view-workout/${testURL}`;
  };

  $scope.cancelCreateWorkout = () => {
    WorkoutJournalFactory.deleteWorkout($routeParams.workoutFBID)
    .then( (data) => {
      $window.location.href = `#!/home`;
    });
  };

  $scope.addExercises = () => {
    $window.location.href = `#!/create-workout/choose-exercise/${testURL}`;
  };

  $scope.goBack = () => {
    WorkoutJournalFactory.deleteWorkout($routeParams.workoutFBID)
    .then( (data) => {
      $window.history.back();
    });
  };

});