mandirAdminApp.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])

mandirAdminApp.directive('checkUser', '$rootScope', '$location', 'UserService'[
        function($root, $location, User){
            return {
                link: function (scope, element, attr, ctrl) {
                    $root.$on('$routeChangeStart', function(event, currRoute, prevRoute){
                        if (!prevRoute.access.isFree && !User.isLogged) {
                            $window.location.href = 'http://test.yoga-mandir.com/';
                        }                    
                    });
                }
            };
    }])