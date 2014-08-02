<?php 

/*  GENERAL SETTING  */

	$author = 'Jose Beita'; // for author meta data: <meta name="author" content="$author; ">
	$website_name = 'Yoga Mandir'; // for closing title every page: <title>$title;  | $website_name;</title> 
	$footer_message = 'Copyright &copy;2014 Yoga Mandir'; // Set Copyright message on footer
	$logo_path = 'img/logo.png';	
	$background = 'background-5'; // '' = none, or 'background-login', 'vd_bg-grey', 'background-1' until 'background-8' or create your own background css	



/*  LAYOUT SETTING  */	

	$responsive = 1; // 1= Responsive, 0 = Non Responsive 
	$width_non_responsive = 1170; // Width for middle or boxed layout with non responsive ( if $responsive set to 0)
	$layout = 'boxed-layout'; // 'full-layout', 'middle-layout', 'boxed-layout'	
	$navbar_top_fixed = 1;	 // 1 = Top Navigation bar follow when scroll down, 0 = normal



/*  HEADER AND FOOTER SETTING  */

	$header = 'header-empty'; // 'header-1' or 'header-2' or 'header-3' or 'header-4' ,or other 'header-*' located at templates/headers/$header.tpl.php	
	$footer = 'footer-2'; // 'footer-1' or 'footer-2' or 'footer-3' or 'footer-4' ,or other 'header-*' located at templates/footers/$footer.tpl.php	



/*  HEAD SECTION PANEL MENU SETTING  */

	$remove_navbar = 0; // Remove Navbar Toggle Button, 1 = show, 0 = hide
	$remove_header = 0; // Remove Header Toggle Button, 1 = show, 0 = hide
	$fullscreen = 0; // Full Screen Toggle Button, 1 = show, 0 = hide
	$boxedtofull = 1; // Boxed to Full Layout Toggle Button, 1 = show, 0 = hide
	


/*  LEFT SIDEBAR NAVIGATION SETTING  */	

	$navbar_left_config = 1; // 2 = Available but Start Invisible, 1 = Available Start Visible, 0 = Not available
	$navbar_left = 'navbar-tabs-profile'; // 'navbar-tabs-menu' or 'navbar-tabs-profile' or 'navbar-tabs-tab' or 'navbar-email' or 'navbar-chat' or 'navbar-no-tab'
	$navbar_left_start_width = ''; // '' = default width, 'nav-left-medium' = medium width, 'nav-left-small' = small width	
	$navbar_left_fixed = 0; // Navbar left: 1 = fixed position , 0 = normal, fixed position compatible with no footer layout
	$navbar_left_menu = 'fancycustom'; // located at templates/navbars/menu- $navbar_left_menu .tpl.php	
	$navbar_left_extra_class ='background-1';

		

/*  RIGHT SIDEBAR NAVIGATION SETTING  */
		
	$navbar_right_config = 0; // 2 = Available but Start Invisible, 1 = Available Start Visible, 0 = Not available	
	$navbar_right = 'navbar-chat'; // 'navbar-tabs-menu' or 'navbar-tabs-profile' or 'navbar-tabs-tab' or 'navbar-email' or 'navbar-chat' or 'navbar-no-tab'
	$navbar_right_start_width = ''; // '' = default width, 'nav-right-medium' = medium width, 'nav-right-small' = small width		
	$navbar_right_fixed = 0; // Condition: for right aligned navbar, $layout must be 'full-layout',  1 = fixed position , 0 = normal, compatible with no footer layout	
	$navbar_right_menu = 'default'; // located at templates/navbars/menu- $navbar_right_menu .tpl.php		
	$navbar_right_extra_class ='';	
	


/*  SIDEBAR MENU TOGGLE BUTTON SETTING  */

	$medium_nav_toggle = 1; // visibility of change sidebar menu width from large to medium button: 1= visible, 0 = none
	$small_nav_toggle = 1; // visibility of change sidebar menu width from large to small or medium to small button: 1= visible, 0 = none
	$enlarge_left_to_medium = '0'; // if small_nav_toggle clicked, enlarge left sidebar menu to: '1' = medium, '0' default/large; 
	$enlarge_right_to_medium = '0'; // if small_nav_toggle clicked, enlarge right sidebar menu to '1' = medium, '0' default/large; 
	
	

/*  EXTRA CLASS SETTING  */	

	$top_menu_extra_class = '';  // background class such as 'vd_bg-white', also 'light-top-menu', 'menu-search-style-2'	
	$logo_container_extra_class =''; // background class such as 'vd_bg-green', also 'panel-menu-style-2'	
	$bottom_extra_class = ''; // located inside footer <div class="vd_bottom $bottom_extra_class"> value: background class such as 'vd_bg-white' padding or any other class		
	$body_extra_class = ''; // 'content-style-2' : No Border Bottom on Title, 'login-layout' Make Specific layout for login, register, and forget password page, 
							// 'front-layout' : Make Specific layout for login, register, and forget password page, 'remove-navbar' : Using no sidebar at all,  
							// 'no-header' : Make Fixed Navbar to Go to Top
							// or other Additional Body Class
?>