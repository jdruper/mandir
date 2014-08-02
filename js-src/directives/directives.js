var directives = angular.module('directives', ['directives.affix'])

.directive('ngConfirmClick', [
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

.directive('pwCheck', [function () {
    return {
        require: 'ngModel',        
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            var errorLbl = '#' + attrs.errorLbl;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    if(elem.val()===$(firstPassword).val()){
                        elem.css({'border-color':'#3c763d', 'box-shadow':'inset 0 1px 1px rgba(0,0,0,.075)'});                        ;
                        ctrl.$setValidity('pwmatch', true);
                        $(errorLbl).addClass('hide');                        
                        scope.passwordMatch = true;
                    }
                    else{                        
                        elem.css({'border-color':'#a94442', 'box-shadow':'inset 0 1px 1px rgba(0,0,0,.075)'});                        
                        ctrl.$setValidity('pwmatch', false);
                        $(errorLbl).removeClass('hide');
                        scope.passwordMatch = false;
                    }
                    
                });
            });
        }
    }
}])

.directive('focusTop', [
        function(){
            return {
                link: function (scope, elem, attrs, ctrl) {                    
                    //var form = elem.parents('form');
                    elem.on('click',function() {
                        scope.$apply(function(){
                            if(scope.passwordMatch){
                                scope.mensaje_error = '';
                                scope.doSave();
                            }
                            else{
                                scope.mensaje_error = 'Existe un error en el formulario, por favor verifique.';
                            }
                        });
                        $(document.body).animate({scrollTop:0},750);
                    });                
            }
        }
    }])

.directive('clickHide', [
        function(){
            return {
                link: function (scope, elem, attrs, ctrl) {                    
                    //var form = elem.parents('form');                    
                    elem.on('click',function() {
                        scope.$apply(function(){                            
                            scope.mensaje = '';
                            scope.mensaje_error = '';
                        });
                    });
                }
            };
    }])

.directive('prettyPhoto', [function(){
    return {    
        link: function (scope, elem, attrs) {
            attrs.$observe('href', function(value) {
                if(value != ''){
                    elem.attr('rel','prettyPhoto[gallery]');
                }
                if(attrs.prettyPhotoLast){
                    $("a[rel^='prettyPhoto']").prettyPhoto({deeplinking:false, 
                                                          theme:'light_rounded',
                                                          show_title:false,
                                                          social_tools:'',                                                   
                                                          changepicturecallback: function(){
                                                             $('.ppt').text('');
                                                             $('.pp_expand').hide();
                                                          }});
                }

            });        
            
        }
    }

}]);
