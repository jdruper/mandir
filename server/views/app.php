<div ng-app="mandirAdmin">
	<ng-include src=" '/partials/nav.html' "></ng-include>	
	<ng-view></ng-view>
	<!--<div ng-controller="messageCtrl">
		<nav ng-show="message!=''" class="navbar navbar-default navbar-fixed-bottom" role="">
	  			<div class="container">
	    			<p class="navbar-text">{{message}}</p>
	  			</div>
		</nav>
	</div>-->
</div>