'use strict';

workoutJournalApp.factory('WorkoutJournalFactory', function($q, $http, FirebaseUrl, UserFactory) {

  //This function is called by home controller
  //performs a get that gets all of the user created workout profiles
  //based on user
  let getWorkouts = () => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/user-workouts.json?orderBy="uid"&equalTo="${UserFactory.getUser()}"`)
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  function getExercises (muscleGroup) {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/exercises.json?orderBy="muscle-group"&equalTo="${muscleGroup}"`)
      .then( (exercisesData) => {
        resolve(exercisesData);
      })
      .catch( (err) => {
        console.log("error", err);
        reject(err);
      });
    });
  }

  //Posts a workout profile object to firebase
  //called by create workout controller
  let postNewWorkout = (newWorkout) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/user-workouts.json`,
        angular.toJson(newWorkout))
      .then( (newWorkoutData) => {
        resolve(newWorkoutData);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };


  //Function is called by select exercises controller, start workout controller, and choose exercise controller
  //used to get the previously selected workout profile
  let getSingleWorkout = (workoutURL) => {
      return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/user-workouts/${workoutURL}.json`)
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  //select exercise controller, start workout controller, and view workout controller
  //gets exercises associated with the workout to be listed on the DOM
  //starts on page load
  let getSelectExercises = (workoutID) => {
      return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/planned-workouts.json?orderBy="workoutID"&equalTo="${workoutID}"`)
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  let postUserExercises = (exerciseList, workoutURL) => {
      return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/user-exercises/${workoutURL}.json`,
        angular.toJson(exerciseList))
      .then( (userExercisesData) => {
        resolve(userExercisesData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  let getWorkoutExercises = (url) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/user-exercises/${url}.json`)
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };


  let patchUserWorkout = (updatedWorkout, workoutURL) => {
    return $q( (resolve, reject) => {
      $http.patch(`${FirebaseUrl}/user-workouts/${workoutURL}.json`,
        angular.toJson(updatedWorkout))
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  let patchUserExercises = (updatedExercises, url) => {
    return $q( (resolve, reject) => {
      $http.put(`${FirebaseUrl}/user-exercises/${url}.json`,
        angular.toJson(updatedExercises))
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  //Performs a delete on the specified workout profile
  let deleteWorkout = (url) => {
    return $q( (resolve, reject) => {
        $http.delete(`${FirebaseUrl}/user-workouts/${url}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
    });
  };

  //Performs a delete on the exercises associated with the deleted workout profile
  let deleteWorkoutExercises = (url) => {
    return $q( (resolve, reject) => {
        $http.delete(`${FirebaseUrl}/user-exercises/${url}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
    });
  };


  //Called by sets controller to post an exercise's planned sets
  let postPlannedWorkout = (plannedWorkout) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/planned-workouts.json`,
        angular.toJson(plannedWorkout))
      .then( (newWorkoutData) => {
        resolve(newWorkoutData);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };


  //Called by start exercise controller
  let postFinishedExercise = (finishedWorkout, url) => {
      return $q( (resolve, reject) => {
      $http.patch(`${FirebaseUrl}/planned-workouts/${url}.json`,
        angular.toJson(finishedWorkout))
      .then( (newWorkoutData) => {
        resolve(newWorkoutData);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  //Called by start workout controller
  //Used to update the workout profile with a completed status
  let patchFinishedWorkout = (updatedWorkout, url) => {
    console.log(url);
    return $q( (resolve, reject) => {
      $http.patch(`${FirebaseUrl}/user-workouts/${url}.json`,
        angular.toJson(updatedWorkout))
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

  //start-exercise-controller calls this function to get
  //the exercise that the user is currently performing
  let getCurrentExercise = (url) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/planned-workouts/${url}.json`)
      .then( (exerciseData) => {
        resolve(exerciseData);
        console.log("factory get", exerciseData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };


  //called by view workout exercises
  //used to get results of completed exercises associated with slected 
  //workout profile
  let getCompletedExercises = (url) => {
      return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/completed-exercises.json?orderBy="workoutID"&equalTo="${url}"`)
      .then( (workoutData) => {
        resolve(workoutData);
      })
      .catch( (err) => {
        console.log("oops error");
        reject(err);
      });
    });
  };

return { getCompletedExercises, getCurrentExercise, patchFinishedWorkout, postFinishedExercise, postPlannedWorkout, getSelectExercises, getExercises, postNewWorkout, getWorkouts, getSingleWorkout, postUserExercises, getWorkoutExercises, patchUserWorkout, patchUserExercises, deleteWorkout, deleteWorkoutExercises };

});
