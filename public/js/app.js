var aplicacion = angular.module("aplicacion", [ "aplicacion.service", "aplicacion.controller", "aplicacionList.controller", "angularFileUpload" ]);

aplicacionController = angular.module("aplicacion.controller", [ "aplicacion.service" ]), 
aplicacionController.controller("aplicacionCtrl", [ "$scope", "$routeParams", "$location", "$window", "$upload", "aplicacionStorage", function(a, b, c, d, e, f) {
    a.isUploading = !1, a.mensaje = "", a.aplicacion = b.id ? f.get({
        id: b.id
    }, function() {}) : new f(), a.doSave = function() {
        a.saving = !0, a.aplicacion.$save(function() {
            a.saving = !1, c.path("/aplicaciones");
        });
    }, a.doRemove = function() {
        a.aplicacion.$remove(function() {
            c.path("/aplicaciones");
        });
    }, a.onFileSelect = function(b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            a.upload = e.upload({
                url: "server/lib/Common/upload.php",
                data: {
                    myObj: a.imagen_url
                },
                file: d
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
aplicacionListController.controller("aplicacionListCtrl", [ "$scope", "$rootScope", "$routeParams", "aplicacionList", function(a, b, c, d) {
    b.mensaje = "", a.aplicaciones = d.query({}, function() {}), a.estado = "Aprobado";
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

var mandirAdminApp = angular.module("mandirAdmin", [ "ngRoute", "aplicacion", "authentication", "tarea", "operacion", "perfil", "ui.bootstrap", "directives" ]);

mandirAdminApp.factory("authInterceptor", [ "$rootScope", "$q", "$window", function(a, b, c) {
    return {
        request: function(a) {
            return a.headers = a.headers || {}, c.sessionStorage.token && (a.headers.Authorization = c.sessionStorage.token), 
            a;
        },
        response: function(a) {
            return 401 === a.status && (c.location.href = "http://yoga-mandir.com/certificados/login"), 
            a || b.when(a);
        }
    };
} ]), mandirAdminApp.config([ "$routeProvider", "$httpProvider", function(a, b) {
    a.when("/", {
        templateUrl: "partials/index.html",
        controller: "perfilListCtrl",
        isFree: !0
    }).when("/login", {
        templateUrl: "partials/login.html",
        controller: "authenticationCtrl",
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
    }).when("/tareas", {
        templateUrl: "partials/tarea/list.html",
        controller: "tareaListCtrl",
        isFree: !1
    }).when("/tarea/create", {
        templateUrl: "partials/tarea/create.html",
        controller: "tareaCtrl",
        isFree: !1
    }).when("/tarea/:id", {
        templateUrl: "partials/tarea/detail.html",
        controller: "tareaCtrl",
        isFree: !1
    }).when("/tarea/:id/edit", {
        templateUrl: "partials/tarea/edit.html",
        controller: "tareaCtrl",
        isFree: !1
    }).when("/operaciones", {
        templateUrl: "partials/operacion/list.html",
        controller: "operacionListCtrl",
        isFree: !1
    }).when("/perfil/:id", {
        templateUrl: "partials/perfil/detail.html",
        controller: "perfilCtrl",
        isFree: !1
    }).when("/perfil/:id/edit", {
        templateUrl: "partials/perfil/edit.html",
        controller: "perfilCtrl",
        isFree: !1
    }), b.interceptors.push("authInterceptor");
} ]);

var authentication = angular.module("authentication", [ "authentication.service", "authentication.controller", "login.controller" ]);

authenticationController = angular.module("authentication.controller", [ "authentication.service" ]), 
authenticationController.controller("authenticationCtrl", [ "$scope", "$routeParams", "$location", "$window", "UserService", "authenticationStorage", function(a, b, c, d, e, f) {
    a.user = new f(), a.mensaje = "", a.username = e.getUser().username || d.sessionStorage.username, 
    a.img_url = d.sessionStorage.img_url || "img/avatar/avatar.jpg", d.sessionStorage.token || a.user.$logout(function() {
        d.location.href = "http://yoga-mandir.com/certificados/";
    }), a.logout = function() {
        a.user.$logout(function() {
            d.location.href = "http://yoga-mandir.com/certificados/";
        });
    }, a.isActive = function(a) {
        return a === c.path();
    };
} ]), authenticationService = angular.module("authentication.service", [ "ngResource" ]), 
authenticationService.factory("authenticationStorage", [ "$resource", function(a) {
    return a("login", null, {
        authorize: {
            method: "POST"
        },
        logout: {
            method: "PUT"
        },
        get_users: {
            method: "GET",
            isArray: !0
        }
    });
} ]), authenticationService.service("UserService", [ function() {
    var a = this;
    this.user = {}, this.setUsername = function(b) {
        a.user.username = b;
    }, this.setUserId = function(b) {
        a.user.user_id = b;
    }, this.setRoleId = function(b) {
        a.user.role_id = b;
    }, this.setLoggedIn = function(b) {
        a.user.isLogged = b;
    }, this.getUser = function() {
        return a.user;
    };
} ]), authenticationController = angular.module("login.controller", [ "authentication.service" ]), 
authenticationController.controller("loginCtrl", [ "$scope", "$routeParams", "$location", "$window", "UserService", "authenticationStorage", function(a, b, c, d, e, f) {
    a.user = new f(), a.mensaje = "", a.login = function() {
        a.user.$authorize(function(b) {
            console.log(b), null != b.auth ? (e.setLoggedIn(!0), e.setUsername(b.username), 
            e.setUserId(b.userid), e.setRoleId(b.roleid), d.sessionStorage.token = b.auth, d.sessionStorage.username = b.username, 
            d.sessionStorage.roleid = b.roleid, d.sessionStorage.loggedIn = !0, d.sessionStorage.userid = b.userid, 
            d.sessionStorage.id_perfil = b.id_perfil, d.sessionStorage.img_url = b.img_url, 
            d.location.href = "http://yoga-mandir.com/certificados/#/perfil/" + b.id_perfil + "/edit") : (a.mensaje = "Usuario o password incorrecto", 
            e.isLogged = !1, e.username = "", delete d.sessionStorage.token, delete d.sessionStorage.username, 
            delete d.sessionStorage.loggedIn, delete d.sessionStorage.roleid, delete d.sessionStorage.userid);
        });
    };
} ]), affixDirectives = angular.module("directives.affix", []), affixDirectives.directive("affixMenu", [ function() {
    return {
        restrict: "A",
        scope: {
            affixMenuData: "="
        },
        controller: "affixController",
        templateUrl: "/partials/affix/affixElement.html",
        link: function(a) {
            a.navigate = function(a) {
                $location.hash("affix" + a);
            };
        }
    };
} ]), affixDirectives.directive("scrollspy", [ function() {
    return {
        restrict: "A",
        require: "^affixContent",
        link: function(a, b, c, d) {
            d.addScrollspy(b);
        }
    };
} ]), affixDirectives.directive("affixContent", [ "$window", function() {
    return {
        restrict: "AE",
        scope: {
            affixContentData: "="
        },
        controller: "affixController",
        templateUrl: "/partials/affix/affixContent.html",
        link: function(a, b, c, d) {
            d.initScrollspy();
        }
    };
} ]);

var directives = angular.module("directives", [ "directives.affix" ]).directive("ngConfirmClick", [ function() {
    return {
        link: function(a, b, c) {
            var d = c.ngConfirmClick || "Are you sure?", e = c.confirmedClick;
            b.bind("click", function() {
                window.confirm(d) && a.$eval(e);
            });
        }
    };
} ]).directive("pwCheck", [ function() {
    return {
        require: "ngModel",
        link: function(a, b, c, d) {
            var e = "#" + c.pwCheck, f = "#" + c.errorLbl;
            b.add(e).on("keyup", function() {
                a.$apply(function() {
                    b.val() === $(e).val() ? (b.css({
                        "border-color": "#3c763d",
                        "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
                    }), d.$setValidity("pwmatch", !0), $(f).addClass("hide"), a.passwordMatch = !0) : (b.css({
                        "border-color": "#a94442",
                        "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
                    }), d.$setValidity("pwmatch", !1), $(f).removeClass("hide"), a.passwordMatch = !1);
                });
            });
        }
    };
} ]).directive("focusTop", [ function() {
    return {
        link: function(a, b) {
            b.on("click", function() {
                a.$apply(function() {
                    a.passwordMatch ? (a.mensaje_error = "", a.doSave()) : a.mensaje_error = "Existe un error en el formulario, por favor verifique.";
                }), $(document.body).animate({
                    scrollTop: 0
                }, 750);
            });
        }
    };
} ]).directive("clickHide", [ function() {
    return {
        link: function(a, b) {
            b.on("click", function() {
                a.$apply(function() {
                    a.mensaje = "", a.mensaje_error = "";
                });
            });
        }
    };
} ]).directive("prettyPhoto", [ function() {
    return {
        link: function(a, b, c) {
            c.$observe("href", function(a) {
                "" != a && b.attr("rel", "prettyPhoto[gallery]"), c.prettyPhotoLast && $("a[rel^='prettyPhoto']").prettyPhoto({
                    deeplinking: !1,
                    theme: "light_rounded",
                    show_title: !1,
                    social_tools: "",
                    changepicturecallback: function() {
                        $(".ppt").text(""), $(".pp_expand").hide();
                    }
                });
            });
        }
    };
} ]), operacion = angular.module("operacion", [ "operacion.service", "operacion.controller", "operacionList.controller" ]);

operacionController = angular.module("operacion.controller", [ "operacion.service" ]), 
operacionController.controller("operacionCtrl", [ "$scope", "$routeParams", "$location", "operacionStorage", function(a, b, c, d) {
    a.operacion = b.id ? d.get({
        id: b.id
    }, function() {}) : new d(), a.doSave = function() {
        a.saving = !0, a.operacion.$save(function() {
            a.saving = !1, c.path("/operacion/" + a.operacion._id.$id);
        });
    }, a.doRemove = function() {
        a.operacion.$remove(function() {
            c.path("/operaciones");
        });
    };
} ]), operacionListController = angular.module("operacionList.controller", [ "operacion.service" ]), 
operacionListController.controller("operacionListCtrl", [ "$scope", "$rootScope", "$routeParams", "categoriaOperacionList", function(a, b, c, d) {
    b.mensaje = "", a.categorias = d.query({}, function() {});
} ]), operacionService = angular.module("operacion.service", [ "ngResource" ]), 
operacionService.factory("operacionStorage", [ "$resource", function(a) {
    return a("/operacion/:id", {
        id: "@_id.$id"
    }, {
        get: {
            method: "GET"
        },
        save: {
            method: "PUT"
        }
    });
} ]), operacionService.factory("categoriaOperacionList", [ "$resource", function(a) {
    return a("/categorias_operacion");
} ]);

var perfil = angular.module("perfil", [ "perfil.service", "perfil.controller", "perfilList.controller", "angularFileUpload" ]);

perfilController = angular.module("perfil.controller", [ "perfil.service" ]), perfilController.controller("perfilCtrl", [ "$scope", "$routeParams", "$location", "$window", "perfilStorage", "$upload", function(a, b, c, d, e, f) {
    a.pwmatch = !1, a.mensaje = "", a.mensaje_error = "", a.passwordMatch = !0, b.id ? a.perfil = e.get({
        id: b.id
    }, function() {
        a.perfil.img_url ? a.perfil.prettyPhoto = "prettyPhoto[gallery]" : (a.perfil.img_url = "", 
        a.perfil.prettyPhoto = ""), a.perfil.img_url_pose_1 ? a.perfil.prettyPhoto1 = "prettyPhoto[gallery]" : (a.perfil.img_url_pose_1 = "", 
        a.perfil.prettyPhoto1 = ""), a.perfil.img_url_pose_2 ? a.perfil.prettyPhoto2 = "prettyPhoto[gallery]" : (a.perfil.img_url_pose_2 = "", 
        a.perfil.prettyPhoto2 = ""), a.perfil.img_url_pose_3 ? a.perfil.prettyPhoto3 = "prettyPhoto[gallery]" : (a.perfil.img_url_pose_3 = "", 
        a.perfil.prettyPhoto3 = ""), a.perfil.certificaciones || (a.perfil.certificaciones = ""), 
        a.perfil.facebook || (a.perfil.facebook = "#"), a.perfil.sitio_web || (a.perfil.sitio_web = "#");
    }) : c.path("/perfil/" + d.sessionStorage.id_perfil + "/edit"), a.doSave = function() {
        a.saving = !0, a.perfil.$save(function() {
            a.saving = !1, a.mensaje = "Sus datos han sido guardados.";
        });
    }, a.doRemove = function() {
        a.perfil.$remove(function() {
            c.path("/perfiles");
        });
    }, a.onFileSelect = function(b, c) {
        a.isUploading = c;
        var d = b[0];
        a.upload = f.upload({
            url: "server/lib/Common/upload.php",
            file: d
        }).progress(function(b) {
            console.log("percent: " + parseInt(100 * b.loaded / b.total)), a.progress = parseInt(100 * b.loaded / b.total);
        }).success(function(b) {
            if (console.log(b), -1 != b.indexOf("exists")) a.mensaje_error = "Un archivo con el mismo nombre ya existe en nuestro sistema."; else if (-1 != b.indexOf("error")) a.mensaje_error = "Error con el archivo, intente de nuevo."; else if ("Invalid file" == b) a.mensaje_error = "El tipo de archivo es inv&aacute;lido."; else {
                console.log(b), a.mensaje = "El archivo se ha cargado. Debe guardar sus cambios.";
                var d = "http://yoga-mandir.com/certificados/archivos/" + b;
                0 == c ? a.perfil.img_url = d : a.perfil["img_url_pose_" + c] = d;
            }
            a.isUploading = -1;
        });
    };
} ]), perfilListController = angular.module("perfilList.controller", [ "perfil.service" ]), 
perfilListController.controller("perfilListCtrl", [ "$scope", "$routeParams", "perfilList", function(a, b, c) {
    a.perfiles = c.query({}, function(a) {
        $(a).each(function(a, b) {
            b.region || (b.region = ""), b.certificaciones || (b.certificaciones = "");
        });
    });
} ]), perfilService = angular.module("perfil.service", [ "ngResource" ]), perfilService.factory("perfilStorage", [ "$resource", function(a) {
    return a("perfil/:id", {
        id: "@id"
    }, {
        get: {
            method: "GET"
        },
        save: {
            method: "PUT"
        }
    });
} ]), perfilService.factory("perfilList", [ "$resource", function(a) {
    return a("perfiles");
} ]);

var tarea = angular.module("tarea", [ "tarea.service", "tarea.controller", "tareaList.controller" ]);

tareaController = angular.module("tarea.controller", [ "tarea.service", "authentication.service" ]), 
tareaController.controller("tareaCtrl", [ "$scope", "$rootScope", "$routeParams", "$location", "$window", "tareaStorage", "authenticationStorage", function(a, b, c, d, e, f, g) {
    a.estado_edit = !1, a.isAdmin = 1 == e.sessionStorage.roleid, a.user_id = e.sessionStorage.userid, 
    b.mensaje = "", c.id ? a.tarea = f.get({
        id: c.id
    }, function() {
        var c = d.search().estado;
        c && (a.estado_edit = !0, "Pendiente" == c ? (a.tarea.estado = "En Progreso", b.mensaje = "El estado de su tarea ha cambiado a En Progreso presione Guardar para mantener el cambio", 
        b.tipo_mensaje = "information") : "En Progreso" == c && (a.tarea.estado = "Finalizada", 
        b.mensaje = "El estado de su tarea ha cambiado a Finalizado agregue un comentario y presione Guardar para mantener el cambio", 
        b.tipo_mensaje = "information"));
    }) : (a.tarea = new f(), a.tarea.id_usuario_responsable = 0, a.tarea.prioridad = "Alta", 
    a.tarea.estado = "Pendiente"), a.usuarios = g.get_users(null, function() {}), a.doSave = function() {
        a.saving = !0, a.tarea.$save(function() {
            a.saving = !1, d.path("/tareas");
        });
    }, a.doRemove = function() {
        a.tarea.$remove(function() {
            d.path("/tareas");
        });
    };
} ]), tareaListController = angular.module("tareaList.controller", [ "tarea.service" ]), 
tareaListController.controller("tareaListCtrl", [ "$scope", "$rootScope", "$routeParams", "$window", "tareaList", function(a, b, c, d, e) {
    a.user_id = d.sessionStorage.userid, a.isAdmin = 1 == d.sessionStorage.roleid, a.tareas = e.query({}, function() {}), 
    a.query = "", a.tipo = {}, a.tipo_tarea = "Mis Tareas", a.tipo.id_usuario_responsable = a.user_id, 
    a.tipo.id_usuario_asigno = "", a.estado = "Pendiente", b.mensaje = "", b.tipo_mensaje = "", 
    a.setFilter = function(b) {
        a.tipo.id_usuario_responsable = "", a.tipo.id_usuario_asigno = "", a.tipo_tarea = "Todas", 
        "Responsable" === b ? (a.tipo.id_usuario_responsable = a.user_id, a.tipo_tarea = "Mis Tareas") : "Asigno" === b && (a.tipo.id_usuario_asigno = a.user_id, 
        a.tipo_tarea = "Asignadas por mi");
    };
} ]), tareaService = angular.module("tarea.service", [ "ngResource" ]), tareaService.factory("tareaStorage", [ "$resource", function(a) {
    return a("/tarea/:id", {
        id: "@id"
    }, {
        get: {
            method: "GET"
        },
        save: {
            method: "PUT"
        }
    });
} ]), tareaService.factory("tareaList", [ "$resource", function(a) {
    return a("/tareas");
} ]);