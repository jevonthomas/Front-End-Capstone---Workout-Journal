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
      $http.patch(`${FirebaseUrl}/user-exercises/${url}.json`,
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

return { getExercises, postNewWorkout, getWorkouts, getSingleWorkout, postUserExercises, getWorkoutExercises, patchUserWorkout, patchUserExercises, deleteWorkout, deleteWorkoutExercises };

});
