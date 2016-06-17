(function(angular, undefined) {
'use strict';

angular.module('spugApp.constants', [])

.constant('appConfig', {userRoles:['manager','warehouse','admin','superadmin']})

;
})(angular);