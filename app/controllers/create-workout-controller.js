"use strict";

workoutJournalApp.controller("CreateWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {



  $scope.createWorkout = {
    day: "",
    goal: "",
    muscle_group: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  $scope.saveWorkout = () => {
    WorkoutJournalFactory.postNewWorkout($scope.createWorkout)
    .then( (data) => {
      $window.location.href = `#!/create-workout/select-exercises/${data.data.name}`;
    });
  };

  $scope.cancelWorkoutCreation = () => {
    $window.location.href = `#!/home`;
  };

});