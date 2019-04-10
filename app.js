(function() {
  angular.module('ana',[]);
  angular.module('ana')
  .controller('FormCtrl', ['$scope', '$window', function($scope, $window){
    $scope.form = {};
    $scope.resetForm = function(){
      $scope.form = {
        analyticalId: '',
        residueType: null,
        reason:'',
        api:{},
        cleaning_agent:{},
        bioburden:{},
        endotoxin:{},
      };
    };
    $scope.handler = {
      addSamplingParameter: function(type){
        var residueType = $scope.form.residueType;
        $scope.form[residueType][type] = {};
      },
      removeSamplingParameter: function(type){
        var residueType = $scope.form.residueType;
        $scope.form[residueType][type] = null;
      },
      addMoc: function(type){
        var residueType = $scope.form.residueType;
        if(!$scope.form[residueType][type].moc){
          $scope.form[residueType][type].moc = [];
        }
        $scope.form[residueType][type].moc.push({});
      },
      removeMoc: function(type,index){
        var residueType = $scope.form.residueType;
        if($scope.form[residueType][type].moc && $scope.form[residueType][type].moc.length){
          $scope.form[residueType][type].moc.splice(index, 1);
        }
      },
    };
    $scope.submitForm = function(form){
      if(form.$invalid){
        return;
      }
      if($window.localStorage){
        $window.localStorage.setItem($scope.form.analyticalId, JSON.stringify($scope.form));
        alert('Method Saved Successfully');
      }
    };
    $scope.resetForm();
  }]);

  angular.module('ana')
    .directive('restrictField', function () {
      return {
          restrict: 'AE',
          scope: {
              restrictField: '='
          },
          link: function (scope) {
            // this will match spaces, tabs, line feeds etc
            // you can change this regex as you want
            var regex = /\s/g;

            scope.$watch('restrictField', function (newValue, oldValue) {
                if (newValue != oldValue && regex.test(newValue)) {
                  scope.restrictField = newValue.replace(regex, '');
                }
            });
          }
      };
    });
})();
