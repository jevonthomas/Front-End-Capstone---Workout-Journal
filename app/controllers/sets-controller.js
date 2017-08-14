"use strict";

workoutJournalApp.controller("SetsController", function($route, $scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {


  $scope.exercise = {
    name: $routeParams.setURL,
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
    workoutID: $routeParams.workoutFBID
  };


  $scope.saveMyWorkout = () => {
    console.log("sind", $scope.exercise);
    WorkoutJournalFactory.postPlannedWorkout($scope.exercise);
    $window.location.href = `#!/create-workout/select-exercises/${$routeParams.workoutFBID}`;
  };

});