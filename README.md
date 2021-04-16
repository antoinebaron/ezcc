# ezcc : Easy Cookie Consent JS for rgpd compliance

Ezcc is a script designed to get cookie consent from user on first time visiting the website.

It store the user choices in a cookie.

Choices are : 
  - No cookie at all
  - Accept all cookies
  - Choose from the list

It currently works for Google Analytics and Google adsense
No cookie is set before the user has made choice

# Details :

✅ Lang EN/FR

✅ Responsive

✅ GG Analytics

✅ GG Adsense

✅ Pause cookies before user made a choice

✅ Easy integration 

# Integration :


1/ edit config in ezcc/ezcc.js

	var ezcc_config = {
		'lang':'en',  // en/fr
		'adsense': true, // whether you use adsense or not
		'analytics': true, // whether you use analytics or not
		'wait_until_displayed' : 400, // in milisecond
		'img_cookie_header' : true, // display image of cookie true/false
		'id_link_call_modal' : 'link_call_cookie_choice', // add this id to any link in your page to call the choices modal
		'legal_terms_url' : 'legal.html' /// link to your legal terms page
	};

2/ import libs

	<!---- import ezcc css ----->
	<link rel="stylesheet" href="ezcc/css.css" />

	<!---- import jquery ----->
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

 	<!---- import ezcc js script ----->
 	<script src="ezcc/ezcc.js"></script>
  
  
3/ Add ezcc_handle_analytics() to the Google analytics script :

	<!-- Google Analytic tag -->


	<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}

	ezcc_handle_analytics(); /* !!!!!! ADD this here !!!!!! */

	gtag('js', new Date());
	gtag('config', 'G-XXXXXXXXXX');

	</script>

4/ That's it. Adsense will display personalized/non-personalized depending on the choice of the user 

  
  
  
