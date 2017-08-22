"use strict";

workoutJournalApp.controller("SetsController", function($route, $scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

    //To be posted in firebase
    //associated with the workout profile and exercise
  $scope.exercise = {
    name: $routeParams.setURL,
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
    planWt6: "",
    workoutID: $routeParams.workoutFBID,
    isCompleted: false
  };


  $scope.goBack = () => {
    $window.location.href = `#!/create-workout/choose-exercise/${$routeParams.workoutFBID}`;
  };

  $scope.saveMyWorkout = () => {
    WorkoutJournalFactory.postPlannedWorkout($scope.exercise)
    .then( (workout) => {
      $route.reload();
      $window.location.href = `#!/create-workout/select-exercises/${$routeParams.workoutFBID}`;
    })
      .catch( (err) => {
          console.log("error", err);
      });
  };
});