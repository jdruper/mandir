affixDirectives = angular.module('directives.affix', []);

// affixDirectives.controller('affixController', ['$scope','$attrs', '$location','$window', function($scope, $attrs, $location, $window){

//     var self = this, currentClass = 'current';

//     this.init = function(element) {
//         self.$element = element;            
//         $scope.affixElements = [];    
//         //$scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : false;      
//     };

//     this.addScrollspy = function(element) {
//       $scope.affixElements.push(element);
//     }
// ;
//     this.navigate = function(id){
//       $location.hash('affix'+id);
//     };

//     this.initScrollspy = function(){
//       $($window).scroll(function() {
//         var highlightSpy, pos, spy, _i, _len, _ref;
//         highlightSpy = null;
//         _ref = $scope.affixElements;
//         for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//           spy = _ref[_i];   
//           spy.out();
//           spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
//           if (spyElems[spy.id].length !== 0) {
//             pos = spyElems[spy.id].offset().top;
//             if ((pos - $window.scrollY) <= 0) {
//               spy.pos = pos;
//               if (highlightSpy == null) {
//                 highlightSpy = spy;
//               }
//               if (highlightSpy.pos < spy.pos) {
//                 highlightSpy = spy;
//               }
//             }
//           }
//         }
//         highlightSpy != null ? highlightSpy["in"]() : void 0;
//       });
//     }
//       // scrollSpy.addSpy({
//       //   id: attrs.spy,
//       //   in: function() {
//       //     elem.addClass(attrs.spyClass);
//       //   },
//       //   out: function() {
//       //     elem.removeClass(attrs.spyClass);
//       //   }
//       // });

// }]);//controller end

affixDirectives.directive('affixMenu', [function() {
  return {
    restrict: 'A',
    scope: { affixMenuData: '='},    
    controller: 'affixController',
    templateUrl: '/partials/affix/affixElement.html',
    
    link: function(scope, elem, attrs, affixCtrl) {      
        scope.navigate = function(id){                                                 
          $location.hash('affix'+id);     
    };
    
    }
  };
}]);

affixDirectives.directive('scrollspy', [function() {
  return {
    restrict: 'A',
    require: '^affixContent',    
    link: function(scope, elem, attrs, affixCtrl) {
        affixCtrl.addScrollspy(elem);          
    }
  };
}]);

affixDirectives.directive('affixContent', ['$window',function($window) {
  return {
    restrict: 'AE',
    scope: { affixContentData: '='},
    controller: 'affixController',    
    templateUrl: '/partials/affix/affixContent.html',
    link: function(scope, elem, attrs, affixCtrl) {      
      affixCtrl.initScrollspy();
    }
  };
}]);


