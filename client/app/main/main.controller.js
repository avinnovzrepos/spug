'use strict';

(function() {

class MainController {

  constructor($http, $scope, API, Auth) {
    this.$scope = $scope;
    this.API = API;
    this.map = { center: { latitude: 12.8797, longitude: 121.7740 }, zoom: 5 };
    this.currUser = Auth.getCurrentUser();
    this.testMarkers = [];
  }

  $onInit() {
    const setMarkers = (data) => {
      data.map((val, index) => {
        console.log(val);
        this.testMarkers.push({
          latitude: val.location.coordinates[1],
          longitude: val.location.coordinates[0],
          id: val._id,
          title: val.name,
          description: val.description,
          show: false
        });
        this.$scope.$evalAsync();
      });
    };

    this.API.doGet('plants', setMarkers, { exclude: this.currUser.plant._id });
  }

  onClick(marker, eventName, model) {
    model.show = !model.show;
  };
}

angular.module('spugApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'main'
  });

})();
