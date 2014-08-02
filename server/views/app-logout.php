<div ng-app="mandirAdmin">
	<div class="vd_body">
	<!-- Header Start -->
  	<header class="header-2" id="header">
      <div class="vd_top-menu-wrapper vd_bg-white light-top-menu">
        <div class="container">
          <div class="vd_top-nav vd_nav-width  ">
          <div class="vd_panel-header">
          	<div class="logo">
            	<a href="http://www.yoga-mandir.com" target="_self"><img alt="logo" src="img/logo_yogamandir.png"></a>
            </div>
            <!-- logo -->
            <div class="vd_panel-menu visible-sm visible-xs">
                	<span class="menu visible-xs" data-action="submenu">
	                    <i class="fa fa-bars"></i>
                    </span>                                 
            </div>                                     
            <!-- vd_panel-menu -->
          </div>
          <!-- vd_panel-header -->
            
          </div>    
          <div class="vd_container">
          	<div class="row">
            	<div class="col-sm-8 col-xs-12">
              		<!-- <div class="vd_mega-menu-wrapper horizontal-menu">
                    	<div class="vd_mega-menu">                
            				<ul class="mega-ul nav">     
    							<li class="hover-trigger mega-li"> 
        							<a href="#" class="mega-link" data-action="click-trigger"> 
            							<span class="menu-text">Go</span>  <i class="fa fa-caret-down prepend-icon"></i>
        							</a> 
						          	<div class="vd_mega-menu-content  width-xs-2  right-xs hover-target no-top" data-action="click-target">
						            <div class="child-menu"> 
						                <div class="content-list content-menu">
						                    <ul class="list-wrapper pd-lr-10">
						                        <li> <a href="front-1.html"> Front 1 </a> </li>
						                        <li> <a href="front-2.html"> Front 2</a> </li>
						                        <li> <a href="front-blog.html"> Front Blog</a> </li>  
						                        <li> <a href="front-blog-content.html"> Front Blog Content</a> </li>                         
						                        <li> <a href="index.html"> Admin Panel </a> </li>    
						                        <li> <a href="http://themeforest.net/item/vendroid-super-flexible-multipurpose-admin-theme/7717536?ref=Venmond"> Buy This Theme </a> </li>                                                        
						                    </ul>
						                </div> 
						            </div> 
						          </div>              
						    </li>              
						</ul>
						<! -- Head menu search form ends -- 
						>                     
						</div>
                    </div>                     -->
                </div>
                <div class="col-sm-4 col-xs-12">
              		<div class="vd_mega-menu-wrapper">
                    	<div class="vd_mega-menu pull-right">
            				<ul class="mega-ul">
							    <li id="top-menu-1" class="one-icon mega-li"> 
									<a href="http://yoga-mandir.com/certificados/ingresar" target="_self" class="btn vd_btn vd_bg-green">Ingresar</a>	
							    </li>
							    <!-- <li id="top-menu-2" class="one-icon mega-li"> 
									<a href="pages-register.html" class="btn vd_btn  vd_bg-green font-semibold">Register</a>	
							    </li> -->

							</ul>
							<!-- Head menu search form ends -->                         
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
        <!-- container --> 
      </div>
      <!-- vd_primary-menu-wrapper --> 

  </header>
  <!-- Header Ends --> 
	<ng-view></ng-view>
	<!-- Footer Start -->
	<footer class="footer-2"  id="footer">      
	    <div class="vd_bottom">
	        <div class="container">
	            <div class="row">
	              <div class=" col-xs-12">
	                <div class="copyright text-center">
	                  	Copyright &copy;2014 Yoga Mandir
	                </div>
	              </div>
	            </div><!-- row -->
	        </div><!-- container -->
	    </div>
	  </footer>
	<!-- Footer END -->

	</div>

	<!-- .vd_body END  -->
	<a id="back-top" href="javascript:void(0);" onclick="$(document.body).animate({scrollTop:0},750)" data-action="backtop" class="vd_back-top visible"> <i class="fa  fa-angle-up"> </i> </a>
	<!--
	<a class="back-top" href="#" id="back-top"> <i class="icon-chevron-up icon-white"> </i> </a> -->
</div>