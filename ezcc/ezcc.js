//https://github.com/antoinebaron-io/ezcc

var ezcc_config = {
	'lang':'en',
	'adsense': true,
	'analytics': true,
	'wait_until_displayed' : 400,
	'img_cookie_header' : true,
	'id_link_call_modal' : 'link_call_cookie_choice',
	'legal_terms_url' : 'page.html'
};




////// before anything else pause adsense
///https://support.google.com/adsense/answer/9042142?hl=en
if(ezcc_config.adsense==true){

	//first check cookie
	var ezcc_cookie = ezcc_getCookie('ezcc');
	if(ezcc_cookie!=null){

		///if cookie exist but adsense not alowed
		if(!ezcc_cookie.includes("[adsense]")){

			(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
			(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;

			//console.log('cookie exist but adsense not allowed');

		}else{

			(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
			(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;

			//console.log('cookie exist adsense allowed');

		}

	}else{ ///if not cookie yet

		///pause
		(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
		(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;

		//console.log('no cookie yet');

	}

}//if(ezcc_config.adsense==true){


$(document).ready(function(){  

	///preload images
	if(ezcc_config.img_cookie_header == true ){
		preload_img('./ezcc/cookie.png');
	}
	/// switches on/off
	preload_img('./ezcc/switch.png');


	///console.log(ezcc_getCookie('ezcc'));

	///if no cookie yet load modal
	if(ezcc_getCookie('ezcc')==null){

		ezcc_load();
	}


	///set the reset link
	var goToUserChoice = false;
	if(ezcc_config.id_link_call_modal!=''){

		$( "#" + ezcc_config.id_link_call_modal ).click(function(e){

				e.preventDefault();
				/// show modal
				ezcc_load(false);
				/// go to user choice page
				goToUserChoice = true;
				
		})
	}


	///init page after user made choice
	function ezcc_init_page(){


		var ezcc_cookie = ezcc_getCookie('ezcc');
		//console.log('loading page with config : '+ezcc_cookie);


		/////adsense
		if(ezcc_config.adsense==true){

			///if adsense not allowed
			if(!ezcc_cookie.includes("[adsense]")){

				(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
				(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;

				//console.log('adsense not allowed');

			}else{ ///adsense allowed

				(adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;
				(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;

				//console.log('adsense allowed');
			}
		}

		/////analytics
		if(ezcc_config.analytics==true){

			///if analytics not allowed
			if(!ezcc_cookie.includes("[analytics]")){

				///we leave default previously set with ezcc_handle_analytics()
				///console.log('analytics not allowed');

			}else{ ///analytics allowed

				///update consent analytics
				gtag('consent', 'update', {
	  				'ad_storage': 'granted',
	  				'analytics_storage':'granted'
				});

				//console.log('analytics allowed');

			}
		}

	}//ezcc_init_page(){


	//// load modal after [ezcc_config.wait_until_displayed] seconds
	function ezcc_load(delay = true){

		var wait = 10;
		if(delay==true) var wait = ezcc_config.wait_until_displayed;
		window.setTimeout( ezcc_show_modal, wait );
	}



	////set cookie
	function ezcc_set_cookie(val){

		if(val=='all'){
			var val = '';
			if(ezcc_config.adsense == true) val += '[adsense]';
			if(ezcc_config.analytics == true) val += '[analytics]';
		}


		if(val==''){ /// set cookie with empty value means nothing is allowed

			document.cookie = 'ezcc='+val+';';

		}else{

			var CookieDate = new Date;
			CookieDate.setFullYear(CookieDate.getFullYear() +1);
			document.cookie = 'ezcc='+val+'; expires=' + CookieDate.toUTCString() + ';';
		}

		$('#ezcc').hide(); ///hide modal
		ezcc_init_page(); ///init the page with the new configuration
		
	}

	////load modal and handle user interactivity
	function ezcc_show_modal(){

		$.get( "ezcc/"+ezcc_config.lang+".html?t="+Date.now(), function( data ) {

			$( "#ezcc" ).html( data );

			//// set choices display depending on config
			if(ezcc_config.adsense==true) {$('#ezcc_adsense').css('display', 'flex');}
			if(ezcc_config.analytics==true) {$('#ezcc_analytics').css('display', 'flex');}

			///display img cookie header
			if(ezcc_config.img_cookie_header == true ){
				$('#img_cookie').addClass('show');
			}

			///if we come from the link
			if(goToUserChoice == true){
				/// go to user choice page
				$( "#ezcc_mod1" ).hide();
				$( "#ezcc_mod2" ).show();
				goToUserChoice=false;
			}


			/// link to legal term
			$('#ezcc_legalterms').attr('href', ezcc_config.legal_terms_url);

			////show overlay
			$( ".ezcc_overlay" ).animate({ opacity: 0.5, }, 300);
			
			///calculate bottom position for the modal
			let modal_height = $( ".ezcc_modal" ).height();
			let windows_height = $( window ).height();
			let target_bottom = (windows_height-modal_height)/2;

			///display modal
			
			$( ".ezcc_modal" ).animate({
				bottom: target_bottom +"px",
			}, 300, function() {
				$( this).css('bottom', '0');
			  	$( this).css('position', 'relative');
			  	$('#ezcc').show();
			});

			///// bt1 : no cookie at all
			$( "#bt1" ).click(function(e){ e.preventDefault(); ezcc_set_cookie('');})
			
			///// bt2 : choose
			$( "#bt2" ).click(function(e){

				e.preventDefault();
				/// go to user choice page
				$( "#ezcc_mod1" ).hide();
				$( "#ezcc_mod2" ).show();

			})
			
			///// bt3 : all cookies
			$( "#bt3" ).click(function(e){ e.preventDefault(); ezcc_set_cookie('all'); })


			//// bt4 : back to modal1
			$( "#bt4" ).click(function(e){

				e.preventDefault();
				///go back to main page
				$( "#ezcc_mod1" ).show();
				$( "#ezcc_mod2" ).hide();

			})

			//// bt5 : all cookies
			$( "#bt5" ).click(function(e){ e.preventDefault(); ezcc_set_cookie('all'); })


			//// bt6 : validate choices
			$( "#bt6" ).click(function(e){

				e.preventDefault();
				
				///get choices
				var consent_choices = '';
				if($( "#switchAnalytics" ).hasClass('on')){
					consent_choices += "[analytics]";
				}
				if($( "#switchAdsense" ).hasClass('on')){
					consent_choices += "[adsense]";
				}

				///set choices
				ezcc_set_cookie(consent_choices);

			})

			//// switchAnalytics on/off
			$( "#switchAnalytics" ).click(function(e){ e.preventDefault(); ezcc_activate_swicth("switchAnalytics"); })

			//// switchAdsense on/off
			$( "#switchAdsense" ).click(function(e){ e.preventDefault(); ezcc_activate_swicth("switchAdsense"); })

		});
	}


	////handle on/off switches 
	function ezcc_activate_swicth(switch_id){

		if($('#'+switch_id).hasClass('off')){

			$('#'+switch_id).removeClass('off');
			$('#'+switch_id).addClass('on');

		}else if($('#'+switch_id).hasClass('on')){

			$('#'+switch_id).removeClass('on');
			$('#'+switch_id).addClass('off');

		}

	}


	function preload_img(image) {

		$('<img src="'+image+'"/>').appendTo('body').css('display','none');
	}


});

///function to read cookies
function ezcc_getCookie(name){
	if(document.cookie.length == 0)
		return null;
	var regSepCookie = new RegExp('(; )', 'g');
	var cookies = document.cookie.split(regSepCookie);

	for(var i = 0; i < cookies.length; i++){
		var regInfo = new RegExp('=', 'g');
	    var infos = cookies[i].split(regInfo);
	    if(infos[0] == name){
	    	return decodeURI(infos[1]);
	    }
	}
	return null;
}

////handle analytics on first load
function ezcc_handle_analytics(){

	//first check cookie
	var ezcc_cookie = ezcc_getCookie('ezcc');
	if(ezcc_cookie!=null){

		///if cookie exist but analytics not allowed
		if(!ezcc_cookie.includes("[analytics]")){

			
			gtag('consent', 'default', {
				'ad_storage': 'denied',
				'analytics_storage': 'denied'
			});

			//console.log('cookie exist but analytics not allowed');

		}else{

			/// no update here, analytics can run
			//console.log('cookie exist analytics allowed');

		}

	}else{ ///if not cookie yet

		///pause
		gtag('consent', 'default', {
			'ad_storage': 'denied',
			'analytics_storage': 'denied'
		});

		///console.log('no cookie yet');

	}


}




