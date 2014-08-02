function isTouch() {
    return $("html").hasClass("touch") ? 1 : 0;
}

function isMobile() {
    return $("html").hasClass("mobile") ? 1 : 0;
}

function isPhone() {
    return $("html").hasClass("phone") ? 1 : 0;
}

function isTablet() {
    return $("html").hasClass("tablet") ? 1 : 0;
}

function scrollTo(a, b) {
    pos = a ? $(a).offset().top : 0, $("html,body").animate({
        scrollTop: pos + (b ? b : 0)
    }, "slow");
}

function notification(a, b, c, d, e) {
    var f, g;
    switch (f = "" == d ? "" : "<h5><strong>" + d + "</strong></h5>", a) {
      case "topright":
        g = stack_topright;
        break;

      case "topleft":
        g = stack_topleft;
        break;

      case "bottomright":
        g = stack_bottomright;
        break;

      case "bottomleft":
        g = stack_bottomleft;
    }
    $.pnotify({
        title_escape: !0,
        text: '<div class="content-list content-image"><div class="list-wrapper mgtp-10 mgbt-xs-10"><div><div class="menu-icon"><i class="' + c + '"></i></div> <div class="menu-text">' + f + '<p class="lh-sm">' + e + "</p> </div></div></div></div>",
        cornerclass: "",
        type: b,
        icon: "false",
        width: "320px",
        closer_hover: !1,
        sticker: !0,
        opacity: 1,
        animation: {
            effect_in: "shake",
            effect_out: "fade"
        },
        addclass: "stack-" + a,
        stack: g
    });
}

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
            return 401 === a.status && (c.location.href = "http://test.yoga-mandir.com/login"), 
            a || b.when(a);
        }
    };
} ]), mandirAdminApp.config([ "$routeProvider", "$httpProvider", function(a, b) {
    a.when("/", {
        templateUrl: "/partials/perfil/detail.html",
        controller: "perfilCtrl",
        isFree: !0
    }).when("/login", {
        templateUrl: "/partials/login.html",
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
    }).when("/perfil/", {
        templateUrl: "partials/perfil/detail.html",
        controller: "perfilCtrl",
        isFree: !1
    }), b.interceptors.push("authInterceptor");
} ]);

var authentication = angular.module("authentication", [ "authentication.service", "authentication.controller" ]);

authenticationController = angular.module("authentication.controller", [ "authentication.service" ]), 
authenticationController.controller("authenticationCtrl", [ "$scope", "$routeParams", "$location", "$window", "UserService", "authenticationStorage", function(a, b, c, d, e, f) {
    a.user = new f(), a.mensaje = "", a.username = e.getUser().username || d.sessionStorage.username || "", 
    a.login = function() {
        a.user.$authorize(function(b) {
            null != b.auth ? (e.setLoggedIn(!0), e.setUsername(b.username), e.setUserId(b.userid), 
            e.setRoleId(b.roleid), d.sessionStorage.token = b.auth, d.sessionStorage.username = b.username, 
            d.sessionStorage.roleid = b.roleid, d.sessionStorage.loggedIn = !0, d.sessionStorage.userid = b.userid, 
            d.location.href = "http://profesores.yoga-mandir.com") : (a.mensaje = "Usuario o password incorrecto", 
            e.isLogged = !1, e.username = "", delete d.sessionStorage.token, delete d.sessionStorage.username, 
            delete d.sessionStorage.loggedIn, delete d.sessionStorage.roleid);
        });
    }, a.logout = function() {
        a.user.$logout(function() {
            d.location.href = "http://profesores.yoga-mandir.com/";
        });
    }, a.isActive = function(a) {
        return a === c.path();
    };
} ]), authenticationService = angular.module("authentication.service", [ "ngResource" ]), 
authenticationService.factory("authenticationStorage", [ "$resource", function(a) {
    return a("/login", null, {
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

var directives = angular.module("directives", [ "directives.affix" ]);

directives.directive("ngConfirmClick", [ function() {
    return {
        link: function(a, b, c) {
            var d = c.ngConfirmClick || "Are you sure?", e = c.confirmedClick;
            b.bind("click", function() {
                window.confirm(d) && a.$eval(e);
            });
        }
    };
} ]);

var operacion = angular.module("operacion", [ "operacion.service", "operacion.controller", "operacionList.controller" ]);

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

var perfil = angular.module("perfil", [ "perfil.service", "perfil.controller", "perfilList.controller" ]);

perfilController = angular.module("perfil.controller", [ "perfil.service" ]), perfilController.controller("perfilCtrl", [ "$scope", "$routeParams", "$location", "perfilStorage", function(a, b, c, d) {
    a.perfil = b.id ? d.get({
        id: b.id
    }, function() {}) : new d(), a.doSave = function() {
        a.saving = !0, a.perfil.$save(function() {
            a.saving = !1, c.path("/perfil/" + a.perfil._id.$id);
        });
    }, a.doRemove = function() {
        a.perfil.$remove(function() {
            c.path("/perfiles");
        });
    };
} ]), perfilListController = angular.module("perfilList.controller", [ "perfil.service" ]), 
perfilListController.controller("perfilListCtrl", [ "$scope", "$routeParams", "perfilList", function(a, b, c) {
    a.perfiles = c.query({}, function() {});
} ]), perfilService = angular.module("perfil.service", [ "ngResource" ]), perfilService.factory("perfilStorage", [ "$resource", function(a) {
    return a("/perfil/:id", {
        id: "@_id.$id"
    }, {
        get: {
            method: "GET"
        },
        save: {
            method: "PUT"
        }
    });
} ]), perfilService.factory("perfilList", [ "$resource", function(a) {
    return a("/perfiles");
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
} ]), jQuery(document).ready(function(a) {
    "use strict";
    function b() {
        a("body").hasClass("nav-medium") && a('[data-action^="nav-medium"]').addClass("active"), 
        a("body").hasClass("nav-small") && a('[data-action^="nav-small"]').addClass("active");
        var b = a("body").attr("data-active");
        a(".navbar-menu .vd_menu > ul > li#" + b).addClass("active"), a(".navbar-menu .vd_menu > ul > li#" + b + " > a").append('<span class="menu-active"><i class="icon-caret-left"></i></span>'), 
        c(), a(window).width() <= m ? e() : f(), j(), k(), d();
    }
    function c() {
        var b = a(".vd_navbar-left .navbar-tabs-menu").height() + a(".vd_navbar-left .navbar-menu").height() + a(".vd_navbar-left .navbar-spacing").height() + 8, c = a(".vd_navbar-right .navbar-tabs-menu").height() + a(".vd_navbar-right .navbar-menu").height() + a(".vd_navbar-right .navbar-spacing").height() + 8;
        a(".vd_content-wrapper, .vd_content-wrapper > .vd_container").css("min-height", b > c ? b : c);
    }
    function d() {
        a(window).width() <= l ? a(".vd_mega-menu .hover-target").removeClass("hover-target").addClass("hover-target-temp") : a(".vd_mega-menu .hover-target-temp").removeClass("hover-target-temp").addClass("hover-target");
    }
    function e() {
        return a("body").hasClass("no-responsive") ? !1 : (a("body").hasClass("nav-left-hide") || a("body").addClass("nav-left-hide"), 
        a("body").hasClass("nav-right-hide") || a("body").addClass("nav-right-hide"), a("body").removeClass("remove-navbar"), 
        a("body").removeClass("remove-header"), a("body").removeClass("fullscreen"), void i());
    }
    function f() {
        return a("body").hasClass("no-responsive") ? !1 : (a("body").hasClass("nav-left-hide") && (a("body").hasClass("nav-left-start-hide") ? a("body").addClass("nav-left-hide") : a("body").removeClass("nav-left-hide")), 
        a("body").hasClass("nav-right-hide") && (a("body").hasClass("nav-right-start-hide") ? a("body").addClass("nav-right-hide") : a("body").removeClass("nav-right-hide")), 
        a("body").removeClass("remove-navbar"), a("body").removeClass("remove-header"), 
        a("body").removeClass("fullscreen"), void i());
    }
    function g(b, c) {
        var d = "small" == c ? "medium" : "small";
        a("body").hasClass("nav-" + b + "-" + c) ? (a("body").removeClass("nav-" + b + "-" + c), 
        "small" == c && a("body").hasClass("enlarge-" + b + "-to-medium") && a("body").addClass("nav-" + b + "-medium")) : (a("body").removeClass("nav-" + b + "-" + d), 
        a("body").addClass("nav-" + b + "-" + c)), a(".vd_navbar-" + b + " .navbar-tabs-menu .menu-container").removeAttr("style"), 
        a(".vd_navbar-" + b + ' .navbar-tabs-menu [data-action^="expand-navbar-tabs-menu"] .badge').removeAttr("style");
    }
    function h(b) {
        var c = "left" == b ? "right" : "left";
        a("body").removeClass("remove-navbar"), a("body").removeClass("fullscreen"), a("body").hasClass("nav-" + b + "-hide") ? (a("body").removeClass("nav-" + b + "-hide"), 
        a("body").hasClass("no-nav-" + c) || a("body").hasClass("nav-" + c + "-hide") || !(a("body").hasClass("nav-" + b + "-start-hide") || a(window).width() < m) || a("body").addClass("nav-" + c + "-hide")) : a("body").hasClass("nav-" + c + "-hide") && a(window).width() >= m ? (a("body").removeClass("nav-" + c + "-hide"), 
        a("body").addClass("nav-" + b + "-hide")) : a("body").addClass("nav-" + b + "-hide");
    }
    function i() {
        a(".sidebar-affix .panel").css("width", (a(".vd_content-section").innerWidth() - 114) / 3 + "px"), 
        a(window).width() <= l && a(".sidebar-affix .panel").removeAttr("style");
    }
    function j() {
        if (!a("body").hasClass("nav-top-fixed") || a("body").hasClass("boxed-layout")) return !1;
        if (a(window).scrollTop() > n - o && a(window).width() >= m) {
            if (a("body").hasClass("sticky-menu-active")) return !1;
            a("body").addClass("sticky-menu-active"), a("body").hasClass("fullscreen") || a("body").hasClass("remove-header") || a("body").css("padding-top", n), 
            a("header").css({
                top: -n,
                opacity: ".5",
                transition: "none"
            }).stop(!0, !0).animate({
                top: 0,
                opacity: "1"
            }, 1e3, function() {
                a("header").removeAttr("style");
            });
        } else (a(window).scrollTop() <= 0 || a(window).width() < m) && a("body").hasClass("sticky-menu-active") && (a("body").css("padding-top", 0), 
        a("body").removeClass("sticky-menu-active"), a("body").removeAttr("style"));
    }
    function k() {
        a(window).scrollTop() > n - o ? a("#back-top").addClass("visible") : a(window).scrollTop() <= 0 && a("#back-top").removeClass("visible");
    }
    var l = 751, m = 975;
    b(), a('[data-action^="backtop"]').click(function(b) {
        b.preventDefault(), a("body,html").animate({
            scrollTop: 0
        }, 800);
    }), a('[data-rel^="tags-input"]').tagsInput({
        width: "auto"
    }), a('[data-rel^="switch"]').bootstrapSwitch(), a('[data-toggle^="tooltip"]').tooltip(), 
    a('[data-toggle^="popover"]').popover(), a('a[data-rel^="prettyPhoto"]').each(function() {
        a(this).attr("rel", a(this).data("rel"));
    }), a("a[rel^='prettyPhoto']").prettyPhoto({
        theme: "light_square"
    }), a('html.no-touch [data-rel^="scroll"]').mCustomScrollbar({
        set_height: function() {
            return a(this).css("max-height", a(this).data("scrollheight")), a(this).data("scrollheight");
        },
        mouseWheel: "auto",
        autoDraggerLength: !0,
        autoHideScrollbar: !0,
        advanced: {
            updateOnBrowserResize: !0,
            updateOnContentResize: !0
        }
    }), a('html.touch [data-rel^="scroll"]').css({
        height: function() {
            return a(this).data("scrollheight");
        },
        "max-height": function() {
            return a(this).data("scrollheight");
        },
        "overflow-y": "scroll"
    }), a(window).resize(function() {
        d();
    }), a("body").hasClass("responsive") && (a(window).setBreakpoints({
        breakpoints: [ 480, 751, 975 ]
    }), a(window).bind("exitBreakpoint751", function() {
        a(window).bind("enterBreakpoint480", function() {
            e();
        });
    }), a(window).bind("exitBreakpoint480", function() {
        a(window).bind("enterBreakpoint751", function() {
            e();
        });
    }), a(window).bind("exitBreakpoint751", function() {
        a(window).bind("enterBreakpoint975", function() {
            f();
        });
    }), a(window).bind("exitBreakpoint975", function() {
        a(window).bind("enterBreakpoint751", function() {
            e();
        });
    })), a('[data-action^="nav-left-medium"]').click(function() {
        g("left", "medium"), i();
    }), a('[data-action^="nav-left-small"]').click(function() {
        g("left", "small"), i();
    }), a('[data-action^="nav-right-medium"]').click(function() {
        g("right", "medium"), i();
    }), a('[data-action^="nav-right-small"]').click(function() {
        g("right", "small"), i();
    }), a('[data-action^="toggle-navbar-left"]').click(function() {
        h("left"), i();
    }), a('[data-action^="toggle-navbar-right"]').click(function() {
        h("right"), i();
    }), a('.navbar-tabs-menu [data-action^="expand-navbar-tabs-menu"]').click(function() {
        a(this).next().animate({
            width: "toggle",
            opacity: "toggle"
        }, 300, "swing"), a(this).find(".badge").toggle("fast");
    }), a(".vd_container").click(function() {
        a(window).width() <= m && (a("body").hasClass("nav-right-hide") ? a("body").hasClass("nav-left-hide") || (h("left"), 
        i()) : (h("right"), i()));
    }), a('[data-action^="remove-navbar"]').click(function() {
        a("body").hasClass("remove-navbar") ? (a("body").removeClass("remove-navbar"), a("body").hasClass("nav-left-start-hide") || a("body").removeClass("nav-left-hide"), 
        a("body").hasClass("nav-right-start-hide") || a("body").removeClass("nav-right-hide")) : (a("body").removeClass("fullscreen"), 
        a("body").removeClass("remove-header"), a("body").addClass("remove-navbar"), a("body").addClass("nav-left-hide"), 
        a("body").addClass("nav-right-hide"));
    }), a('[data-action^="remove-header"]').click(function() {
        a("body").hasClass("remove-header") ? a("body").removeClass("remove-header") : (a("body").removeClass("fullscreen"), 
        a("body").removeClass("remove-navbar"), a("body").hasClass("nav-left-start-hide") || a("body").removeClass("nav-left-hide"), 
        a("body").hasClass("nav-right-start-hide") || a("body").removeClass("nav-right-hide"), 
        a("body").addClass("remove-header"));
    }), a('[data-action^="fullscreen"]').click(function() {
        a("body").hasClass("fullscreen") ? (a("body").removeClass("fullscreen"), a("body").hasClass("nav-left-start-hide") || a("body").removeClass("nav-left-hide"), 
        a("body").hasClass("nav-right-start-hide") || a("body").removeClass("nav-right-hide")) : (a("body").removeClass("remove-header"), 
        a("body").removeClass("remove-navbar"), a("body").addClass("fullscreen"), a("body").addClass("nav-left-hide"), 
        a("body").addClass("nav-right-hide"));
    }), a('[data-action^="boxedtofull"]').click(function() {
        a("body").hasClass("boxed-layout") ? (a("body").removeClass("boxed-layout"), a("body").addClass("full-layout"), 
        a('[data-action^="boxedtofull"]').addClass("active")) : a("body").hasClass("full-layout") && (a("body").removeClass("full-layout"), 
        a("body").addClass("boxed-layout"), a('[data-action^="boxedtofull"]').removeClass("active"));
    }), a('[data-action^="submenu"]').click(function() {
        a("body").hasClass("submenu") ? a("body").removeClass("submenu") : (a("body").addClass("submenu"), 
        setCenterMenu());
    }), a('[data-action^="click-trigger"]').click(function(b) {
        return b.preventDefault(), a(this).parent().hasClass("hover-trigger") && a(this).siblings().hasClass("hover-target") ? 0 : ("click-target" != a(this).parent().parent().parent().data("action") && "click-target" != a(this).parent().parent().parent().parent().parent().data("action") ? a('[data-action^="click-target"]').slideUp("fast", function() {}) : (a(this).parent().siblings().children('[data-action^="click-trigger"]').removeClass("open"), 
        a(this).parent().siblings().children('[data-action^="click-target"]').slideUp("fast", function() {})), 
        a(this).hasClass("open") ? (a(this).removeClass("open"), a(this).parent().children('[data-action^="click-target"]').slideUp("fast", function() {})) : ("click-target" != a(this).parent().parent().parent().data("action") && a('[data-action^="click-trigger"]').removeClass("open"), 
        a(this).addClass("open"), a(this).parent().children('[data-action^="click-target"]').slideDown("fast", function() {
            a(".navbar-menu").outerHeight() < a(".navbar-menu .vd_menu").outerHeight() + a(".navbar-spacing ").outerHeight() && c();
        })), void a("body").removeClass("expand-all"));
    }), a(document).click(function(b) {
        null == a(b.target).closest('[data-action^="click-trigger"]').get(0) && null == a(b.target).closest('[data-action^="click-target"]').get(0) && null == a(b.target).closest('[data-action^="expand-all"]').get(0) && (a('[data-action^="click-target"]').hide(), 
        a('[data-action^="click-trigger"]').removeClass("open"), a("body").removeClass("expand-all"), 
        c());
    }), a('[data-action^="expand-all"]').click(function() {
        a('[data-action^="click-target"]').slideUp("fast", function() {
            c();
        }), a('[data-action^="click-trigger"]').removeClass("open"), a("body").hasClass("expand-all") ? a("body").removeClass("expand-all") : (a(this).closest(".navbar-menu").find(".vd_menu .child-menu").slideDown("fast", function() {
            c();
        }).find('[data-action^="click-trigger"]').addClass("open"), a("body").addClass("expand-all"));
    }), a(".vd_input-wrapper input").blur(function() {
        a(this).parent(".vd_input-wrapper").removeClass("focus");
    }).focus(function() {
        a(this).parent(".vd_input-wrapper").addClass("focus");
    }), a('[data-action^="minimize"]').click(function() {
        a(this).hasClass("active") ? (a(this).removeClass("active"), a(this).closest(".widget").children(".panel-body, .panel-body-list").slideDown("fast")) : (a(this).addClass("active"), 
        a(this).closest(".widget").children(".panel-body, .panel-body-list").slideUp("fast"));
    }), a('[data-action^="close"]').click(function() {
        a(this).closest(".widget").hide();
    }), a('[data-action^="refresh"]').click(function() {
        a(this).closest(".widget").block({
            message: '<h2><i class="fa fa-spinner fa-spin vd_green"></i></h2>',
            css: {
                border: "none",
                padding: "15px",
                background: "none"
            },
            overlayCSS: {
                backgroundColor: "#FFF"
            },
            timeout: 2e3
        });
    }), a('[data-action^="chat-close"]').click(function() {
        a(".vd_chat-menu").remove();
    }), a('[data-action^="notification"]').click(function(b) {
        b.preventDefault(), position = a(this).data("position"), type = a(this).data("type"), 
        icon = a(this).data("icon"), title = a(this).data("title"), message = a(this).data("message"), 
        notification(position, type, icon, title, message);
    });
    var n = a("header").height(), o = 0;
    a(window).on("scroll", function() {
        j(), k();
    }), a(window).on("resize", function() {
        j(), k();
    });
});

var stack_topleft = {
    dir1: "down",
    dir2: "right",
    push: "bottom"
}, stack_topright = {
    dir1: "down",
    dir2: "left",
    push: "bottom"
}, stack_bottomleft = {
    dir1: "up",
    dir2: "right",
    push: "bottom"
}, stack_bottomright = {
    dir1: "up",
    dir2: "left",
    push: "bottom"
};