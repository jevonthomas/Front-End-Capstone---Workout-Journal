"use strict";

workoutJournalApp.controller("EditSetsController", function($route, $scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

    //To be posted in firebase
    //associated with the workout profile and exercise
  $scope.exercise = {
    planReps1: "",
    planWt1: "",
    planReps2: "",
    planWt2: "",
    planReps3: "",
    planWt3: "",
    planReps4: "",
    planWt4: "",
    planReps5: "",
    planWt5: "",
    planReps6: "",
    planWt6: ""
  };

  $scope.saveMyWorkout = () => {
    WorkoutJournalFactory.patchPlannedWorkout($scope.exercise, $routeParams.editSetsParam);
    $window.location.href = `#!/edit-workout/${$routeParams.editExerciseParam}/edit-exercises/${$routeParams.editExerciseParam}`;
  };

});