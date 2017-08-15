"use strict";

workoutJournalApp.controller("ChooseExercisesController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchSingleWorkout($routeParams.workoutFBID);
  });


  //Allows fetchExercises to get the selected muscle group from the previous window
  //Used to display the workout profile at the top of the page
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

  //Calls a get function from wj factory to get exercises
  //based on the value of the key muscle-group
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

  //Takes the user to the page to plan their sets
  $scope.nextPage = (name) => {
    $window.location.href = `#!/create-workout/choose-exercise/${$routeParams.workoutFBID}/sets/${name}`;
  };

});