"use strict";

workoutJournalApp.controller("CreateWorkoutController", function($scope, $window, $routeParams, UserFactory, WorkoutJournalFactory) {

  //Workout profile object to be posted to firebase after user inputs the values
  $scope.createWorkout = {
    day: "",
    date: "",
    goal: "",
    isCompleted: false,
    uid: UserFactory.getUser()
  };

  //Calls a post function in the wj factory with the workout profile
  //object as an argument
  //Takes the user to the select exercises page
  $scope.saveWorkout = () => {
    WorkoutJournalFactory.postNewWorkout($scope.createWorkout)
    .then( (data) => {
      $window.location.href = `#!/create-workout/select-exercises/${data.data.name}`;
    });
  };

  //Returns the user to home page
  $scope.cancelWorkoutCreation = () => {
    $window.location.href = `#!/home`;
  };


  //Angular clock
  //Will replace with an input element
  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // $scope.disable = [false, 1, 7];
  $scope.today = 'Today';
  $scope.clear = 'Clear';
  $scope.close = 'Close';
  var days = 15;
  $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
  $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
  // $scope.onStart = function () {
  //     console.log('onStart');
  // };
  // $scope.onRender = function () {
  //     console.log('onRender');
  // };
  // $scope.onOpen = function () {
  //     console.log('onOpen');
  // };
  // $scope.onClose = function () {
  //     console.log('onClose');
  // };
  // $scope.onSet = function () {
  //     console.log('onSet');
  // };
  // $scope.onStop = function () {
  //     console.log('onStop');
  // };

});