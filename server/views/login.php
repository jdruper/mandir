<!DOCTYPE html>
<html ng-app="mandirAdmin">
	<head>
		<title>Mandir Administraci&oacute;n</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" href="img/favicon.ico">

		<link href="css/vendor.css" rel="stylesheet" >
		<link href="css/styles.css" rel="stylesheet" >

    <script type="text/javascript" src="js/modernizr.js"></script> 
      <script type="text/javascript" src="js/mobile-detect.min.js"></script> 
      <script type="text/javascript" src="js/mobile-detect-modernizr.js"></script> 
	</head>
  <body ng-controller="loginCtrl" id="pages" class="full-layout no-nav-left no-nav-right  nav-top-fixed background-login responsive remove-navbar login-layout clearfix" data-active="pages "  data-smooth-scrolling="1">     
<div class="vd_body">	
		<div class="content">
  <div class="container">     
    <!-- Middle Content Start -->
    <div class="vd_content-wrapper">
      <div class="vd_container">
        <div class="vd_content clearfix">
          <div class="vd_content-section clearfix">
            <div class="vd_login-page"> 
              <div class="heading clearfix">
                <div class="logo">
                  <h2 class="mgbt-xs-5"><img src="img/logo_yogamandir2.png" alt="logo"></h2>
                </div>
                <h4 class="text-center font-semibold vd_grey">INGRESE A SU CUENTA</h4>
              </div>
              <div class="panel widget">
                <div class="panel-body">
                  <div class="login-icon entypo-icon"> <i class="icon-key"></i> </div>
                  <form class="form-horizontal" id="login-form" role="form">
                  <div class="alert alert-danger vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-exclamation-circle vd_red"></i></span><strong>Oh snap!</strong> Change a few things up and try submitting again. </div>
                  <div class="alert alert-success vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-check-circle vd_green"></i></span><strong>Well done!</strong>. </div>                  
                    <div class="form-group  mgbt-xs-20">
                      <div class="col-md-12">
                        <div class="label-wrapper sr-only">
                          <label class="control-label" for="email">Correo Electr&oacute;nico</label>
                        </div>
                        <div class="vd_input-wrapper" id="email-input-wrapper"> <span class="menu-icon"> <i class="fa fa-envelope"></i> </span>
                          <input type="text" ng-model="user.username" placeholder="Correo Electr&oacute;nico" id="email" name="email" class="required" required>
                        </div>
                        <div class="label-wrapper">
                          <label class="control-label sr-only" for="password">Contrase&ntilde;a</label>
                        </div>
                        <div class="vd_input-wrapper" id="password-input-wrapper" > <span class="menu-icon"> <i class="fa fa-lock"></i> </span>
                          <input type="password" ng-model="user.password" placeholder="Contrase&ntilde;a" id="password" name="password" class="required" required>
                        </div>
                      </div>
                    </div>
                    <div id="vd_login-error" ng-cloak ng-show="mensaje!=''" class="ng-cloak alert alert-danger"><i class="fa fa-exclamation-circle fa-fw"></i> {{mensaje}} </div>
                    <div class="form-group">
                      <div class="col-md-12 text-center mgbt-xs-5">
                        <button ng-click="login()" class="btn vd_bg-green vd_white width-100" type="submit" id="login-submit">Ingresar</button>
                      </div>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-xs-6">
                            <div class="vd_checkbox">
                              <input type="checkbox" ng-model="user.remember_me" id="checkbox-1" value="1">
                              <label for="checkbox-1">Recordarme</label>
                            </div>
                          </div>
                          <div class="col-xs-6 text-right">
                            <div class=""> <a ng-click="open()" href="#">&iquest;Olvid&oacute; su contrase&ntilde;a? </a> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Panel Widget -->
              <div class="register-panel text-center font-semibold"> <a href="#">SOLICITAR UNA CUENTA<span class="menu-icon"><i class="fa fa-angle-double-right fa-fw"></i></span></a> </div>
            </div>
            <!-- vd_login-page --> 
            
          </div>
          <!-- .vd_content-section --> 
          
        </div>
        <!-- .vd_content --> 
      </div>
      <!-- .vd_container --> 
    </div>
    <!-- .vd_content-wrapper --> 
    
    <!-- Middle Content End --> 
    
  </div>
  <!-- .container --> 
</div>
<!-- .content -->
<!-- <a id="back-top" href="#" data-action="backtop" class="vd_back-top visible"> <i class="fa  fa-angle-up"> </i> </a> -->

</div>
<!-- .vd_body END  -->
		<script type="text/javascript" src="js/vendor.js"></script>
		<script type="text/javascript" src="js/app.js"></script>

    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-10945118-1', 'auto');
  ga('send', 'pageview');

</script>
	</body>
</html>
