"use strict";

workoutJournalApp.controller("ChooseExercisesController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.workoutFBID);
  });


  //Allows fetchExercises to get the selected muscle group from the previous window
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

  $scope.nextPage = (name) => {
    $window.location.href = `#!/create-workout/choose-exercise/${$routeParams.workoutFBID}/sets/${name}`;
  };

});