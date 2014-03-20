<!DOCTYPE html>
<html ng-app="mandirAdmin">
	<head>
		<title>Mandir Administraci&oacute;n</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="/css/vendor.css" rel="stylesheet" media="screen">
		<link href="/css/styles.css" rel="stylesheet" media="screen">
	</head>
	<body ng-controller="authenticationCtrl">
		<div>
			<div class="container">		
			<div class="row">
				&nbsp;
			</div>
			<div class="row">
		      <form class="form-signin" role="form">
		        <h2 class="form-signin-heading">Ingreso al Sistema</h2>
		        <input type="text" class="form-control" ng-model="user.username" name="username" placeholder="Usuario o Correo Electr&oacute;nico" required autofocus>
		        <input type="password" class="form-control" ng-model="user.password" name="password" placeholder="Contrase&ntilde;a" required>
		        <label class="checkbox">
		          <input type="checkbox" ng-model="user.remember_me" value="remember-me"> Recu&eacute;rdeme
		        </label>
		        <button id="btnSignin" type="submit" ng-click="login()" class="btn-default btn-lg btn-primary btn-block">Ingresar</button>
	    	  </form>
	    	</div>
			</div> <!-- /container -->    
		</div>
		<nav ng-cloak ng-show="mensaje!=''" class="ng-cloak navbar navbar-default navbar-fixed-bottom nav-error" role="">
  			<div class="container">
    			<p class="white-font navbar-text"><span class="glyphicon glyphicon-warning-sign"></span> {{mensaje}}</p>
  			</div>
		</nav>
		<script type="text/javascript" src="/js/vendor.js"></script>
		<script type="text/javascript" src="/js/app.js"></script>
	</body>
</html>
