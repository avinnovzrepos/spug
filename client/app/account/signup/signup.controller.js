'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, API, $state) {
    this.Auth = Auth;
    this.API = API;
    this.$state = $state;
    this.plantList = [];

    const setPlants = (plants) => {
      this.plantList = plants;
    }

    this.API.doGet('plants', setPlants);
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.user.role = 'plant';
      this.Auth.createUser(this.user)
      .then(() => {
        // Account created, redirect to home
        this.$state.go('admin');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('spugApp')
  .controller('SignupController', SignupController);
