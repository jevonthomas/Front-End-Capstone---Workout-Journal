'use strict';

workoutJournalApp.factory('WorkoutJournalFactory', function($q, $http, FirebaseUrl, UserFactory) {

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

  //select exercise controller
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

  let postFinishedExercise = (finishedWorkout) => {
      return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/completed-exercises.json`,
        angular.toJson(finishedWorkout))
      .then( (newWorkoutData) => {
        resolve(newWorkoutData);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

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


return { getCurrentExercise, patchFinishedWorkout, postFinishedExercise, postPlannedWorkout, getSelectExercises, getExercises, postNewWorkout, getWorkouts, getSingleWorkout, postUserExercises, getWorkoutExercises, patchUserWorkout, patchUserExercises, deleteWorkout, deleteWorkoutExercises };

});
