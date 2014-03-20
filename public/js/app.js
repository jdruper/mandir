var aplicacion = angular.module("aplicacion", [ "aplicacion.service", "aplicacion.controller", "aplicacionList.controller", "angularFileUpload" ]);

aplicacionController = angular.module("aplicacion.controller", [ "aplicacion.service" ]), 
aplicacionController.controller("aplicacionCtrl", [ "$scope", "$routeParams", "$location", "$upload", "aplicacionStorage", function(a, b, c, d, e) {
    a.isUploading = !1, a.mensaje = "", a.aplicacion = b.id ? e.get({
        id: b.id
    }, function() {}) : new e(), a.doSave = function() {
        a.saving = !0, a.aplicacion.$save(function() {
            a.saving = !1, c.path("/aplicaciones");
        });
    }, a.doRemove = function() {
        a.aplicacion.$remove(function() {
            c.path("/aplicaciones");
        });
    }, a.onFileSelect = function(b) {
        for (var c = 0; c < b.length; c++) {
            var e = b[c];
            a.upload = d.upload({
                url: "server/lib/Common/upload.php",
                data: {
                    myObj: a.imagen_url
                },
                file: e
            }).progress(function(b) {
                a.isUploading = !0, console.log("percent: " + parseInt(100 * b.loaded / b.total)), 
                a.progress = parseInt(100 * b.loaded / b.total);
            }).success(function(b) {
                console.log(b), -1 != b.indexOf("exists") ? a.mensaje = "Un archivo con el mismo nombre ya existe en nuestro sistema." : -1 != b.indexOf("error") ? a.mensaje = "Ocurri&oacute un error con el archivo, intente de nuevo." : "Invalid file" == b ? a.mensaje = "El tipo de archivo es inválido o el tamaño excede el límite permitido (100kb)." : (a.mensaje = "El archivo se ha cargado con éxito. Debe guardar sus cambios para que tegan efecto.", 
                a.aplicacion.img_url = "http://administracion.yoga-mandir.com/upload", a.aplicacion.imagen_original = b, 
                b = "thumb_" + b.replace(/ /g, "_"), a.aplicacion.imagen_thumbnail = b), a.isUploading = !1;
            });
        }
    };
} ]), aplicacionListController = angular.module("aplicacionList.controller", [ "aplicacion.service" ]), 
aplicacionListController.controller("aplicacionListCtrl", [ "$scope", "$routeParams", "aplicacionList", function(a, b, c) {
    a.aplicaciones = c.query({}, function() {});
} ]), aplicacionService = angular.module("aplicacion.service", [ "ngResource" ]), 
aplicacionService.factory("aplicacionStorage", [ "$resource", function(a) {
    return a("/aplicacion/:id", {
        id: "@id"
    }, {
        get: {
            method: "GET"
        },
        save: {
            method: "PUT"
        }
    });
} ]), aplicacionService.factory("aplicacionList", [ "$resource", function(a) {
    return a("/aplicaciones");
} ]);

var mandirAdminApp = angular.module("mandirAdmin", [ "ngRoute", "aplicacion", "authentication" ]);

mandirAdminApp.factory("authInterceptor", [ "$rootScope", "$q", "$window", function(a, b, c) {
    return {
        request: function(a) {
            return a.headers = a.headers || {}, c.sessionStorage.token && (a.headers.Authorization = c.sessionStorage.token), 
            a;
        },
        response: function(a) {
            return 401 === a.status, a || b.when(a);
        }
    };
} ]), mandirAdminApp.config([ "$routeProvider", "$httpProvider", function(a, b) {
    a.when("/", {
        templateUrl: "/partials/index.html",
        isFree: !0
    }).when("/aplicaciones", {
        templateUrl: "partials/aplicacion/list.html",
        controller: "aplicacionListCtrl",
        isFree: !1
    }).when("/aplicacion/create", {
        templateUrl: "partials/aplicacion/create.html",
        controller: "aplicacionCtrl",
        isFree: !1
    }).when("/aplicacion/:id", {
        templateUrl: "partials/aplicacion/detail.html",
        controller: "aplicacionCtrl",
        isFree: !1
    }).when("/aplicacion/:id/edit", {
        templateUrl: "partials/aplicacion/edit.html",
        controller: "aplicacionCtrl",
        isFree: !1
    }).when("/login", {
        templateUrl: "/partials/login.html",
        controller: "authenticationCtrl",
        isFree: !0
    }), b.interceptors.push("authInterceptor");
} ]);

var authentication = angular.module("authentication", [ "authentication.service", "authentication.controller" ]);

authenticationController = angular.module("authentication.controller", [ "authentication.service" ]), 
authenticationController.controller("authenticationCtrl", [ "$scope", "$routeParams", "$location", "$window", "UserService", "authenticationStorage", function(a, b, c, d, e, f) {
    a.user = new f(), a.mensaje = "", a.username = e.getUser().username || d.sessionStorage.username || "", 
    a.login = function() {
        a.user.$authorize(function(b) {
            null != b.auth ? (e.setLoggedIn(!0), e.setUsername(b.username), d.sessionStorage.token = b.auth, 
            d.sessionStorage.username = b.username, d.sessionStorage.roleid = b.roleid, d.sessionStorage.loggedIn = !0, 
            d.location.href = "http://test.yoga-mandir.com") : (a.mensaje = "Usuario o password incorrecto", 
            e.isLogged = !1, e.username = "", delete d.sessionStorage.token, delete d.sessionStorage.username, 
            delete d.sessionStorage.loggedIn, delete d.sessionStorage.roleid);
        });
    }, a.logout = function() {
        a.user.$logout(function() {
            d.location.href = "http://test.yoga-mandir.com/";
        });
    };
} ]), authenticationService = angular.module("authentication.service", [ "ngResource" ]), 
authenticationService.factory("authenticationStorage", [ "$resource", function(a) {
    return a("/login", null, {
        authorize: {
            method: "POST"
        },
        logout: {
            method: "PUT"
        }
    });
} ]), authenticationService.service("UserService", [ function() {
    var a = this;
    this.user = {}, this.setUsername = function(b) {
        a.user.username = b;
    }, this.setLoggedIn = function(b) {
        a.user.isLogged = b;
    }, this.getUser = function() {
        return a.user;
    };
} ]), mandirAdminApp.directive("ngConfirmClick", [ function() {
    return {
        link: function(a, b, c) {
            var d = c.ngConfirmClick || "Are you sure?", e = c.confirmedClick;
            b.bind("click", function() {
                window.confirm(d) && a.$eval(e);
            });
        }
    };
} ]), mandirAdminApp.directive("checkUser", "$rootScope", "$location", "UserService"[function(a, b, c) {
    return {
        link: function() {
            a.$on("$routeChangeStart", function(a, b, d) {
                d.access.isFree || c.isLogged || ($window.location.href = "http://test.yoga-mandir.com/");
            });
        }
    };
}]);