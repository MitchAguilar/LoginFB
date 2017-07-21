$(function() {

	var app_id = '350511762049387';
	var scopes = 'public_profile,email';

	var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

	var div_session = "<div id='facebook-session'>"+
                      "<strong></strong>"+
                      "<br/><br/><br/>"+
                      "<img>"+
					  "<br/><br/><br/>"+
					  "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
					  "</div>";

	window.fbAsyncInit = function() {//inicializar el sdk de facebook

	  	FB.init({
	    	appId      : app_id,
	    	status     : true,
			cookie     : true,
	    	xfbml      : true, 
	    	version    : 'v2.9'
	  	});


	  	FB.getLoginStatus(function(response) {//obtiene el status
	    	statusChangeCallback(response, function() {});
	  	});
  	};

  	var statusChangeCallback = function(response, callback) {
  		console.log(response);
   		
    	if (response.status === 'connected') {
			  getFacebookData();
			  datPer();
    	} else {
     		callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() {
  		FB.api('/me?fields=name,email', function(response) {
	  		$('#login').after(div_session);
	  		$('#login').remove();
	  		$('#facebook-session strong').text("Bienvenido: "+response.name+"..."+response.email);
			$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
			console.log(response.id);
			console.log(response.email);
	  	});
  	}
  	var facebookLogin = function() {
  		checkLoginState(function(data) {
  			if (data.status !== 'connected') {
  				FB.login(function(response) {
  					if (response.status === 'connected')
  						getFacebookData();
  				}, {scope: scopes});
  			}
  		})
  	}

  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					$('#facebook-session').before(btn_login);
					$('#facebook-session').remove();
				})
			}
  		})

  	}



  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();

  		facebookLogin();
  	})

  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();

  		if (confirm("¿Está seguro?"))
  			facebookLogout();
  		else 
  			return false;
  	})

})