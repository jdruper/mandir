<div ng-app="mandirAdmin">
	<ng-include src=" 'partials/nav.html' "></ng-include>	
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