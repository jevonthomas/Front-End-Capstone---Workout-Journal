"use strict";

workoutJournalApp.controller("SetsController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {


  $scope.exercise = {
    name: $routeParams.setURL,
    reps1: "",
    wt1: "",
    reps2: "",
    wt2: "",
    reps3: "",
    wt3: "",
    workoutID: $routeParams.workoutFBID
  };

  $scope.saveMyWorkout = () => {
    WorkoutJournalFactory.postPlannedWorkout($scope.exercise);
    $window.location.href = `#!/create-workout/select-exercises/${$routeParams.workoutFBID}`;
  };

});