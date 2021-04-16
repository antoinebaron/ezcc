# ezcc : Easy Cookie Consent JS for rgpd compliance

Ezcc is a script designed to get cookie consent from user on first time visiting the website.

It store the user choices in a cookie.

Choices are : 
  - No cookie at all
  - Accept all cookies
  - Choose from the list

It currently works for Google Analytics and Google adsense

No cookie is set before the user has made choice

*Even though this script is functional (at the time of writing), it is provided "as is" and without warranty of any kind*

# Details :

✅ Lang EN/FR

✅ Responsive

✅ GG Analytics

✅ GG Adsense

✅ Pause cookies before user made a choice

✅ Easy integration 


![Capture du 2021-04-16 13-29-07](https://user-images.githubusercontent.com/72351273/115018195-de41f380-9eb7-11eb-9122-e2bb3ff5fecf.png)

![Capture du 2021-04-16 13-29-41](https://user-images.githubusercontent.com/72351273/115018207-e13ce400-9eb7-11eb-98ab-a0aa68dbf9c6.png)


# Integration :


## 1/ Edit config in ezcc/ezcc.js

	var ezcc_config = {
		'lang':'en',  // en/fr
		'adsense': true, // whether you use adsense or not
		'analytics': true, // whether you use analytics or not
		'wait_until_displayed' : 400, // in milisecond
		'img_cookie_header' : true, // display image of cookie true/false
		'id_link_call_modal' : 'link_call_cookie_choice', // add this id to any link in your page to call the choices modal
		'legal_terms_url' : 'legal.html' /// link to your legal terms page
	};

## 2/ Import libs

	<!---- import ezcc css ----->
	<link rel="stylesheet" href="ezcc/css.css" />

	<!---- import jquery ----->
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

 	<!---- import ezcc js script ----->
 	<script src="ezcc/ezcc.js"></script>
  
  
## 3/ Add ezcc_handle_analytics() to the Google analytics script :

	<!-- Google Analytic tag -->

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}

	ezcc_handle_analytics(); /* !!!!!! ADD this here !!!!!! */

	gtag('js', new Date());
	gtag('config', 'G-XXXXXXXXXX');

	</script>

## 4/ That's it. 

Depending on user's choice: 

- Adsense will display personalized/non-personalized (using this method : https://support.google.com/adsense/answer/9042142?hl=en)
 
- Analytics will load or not 

# Testing :

Use your browser Developer Tools to check the cookies before and after making the different choices
  
  
  
