//file used in Blankspace.vue

export const computedAnswerFile = {

    /*
    |--------------------------------------------------------------------------
    | Scroll function // that.scrollResults("#captchaSet"); 
    |--------------------------------------------------------------------------
    |
    |
    */

	scrollResults: function(divName, parent){ //arg(DivID, levels to go up from DivID)
			    
	    //if 2nd arg is not provided while calling the function with one arg
		if (typeof(parent)==='undefined') {
		
            $('html, body').animate({
                scrollTop: $(divName).offset().top
                 //scrollTop: $('.your-class').offset().top
            }, 'slow'); 
		        
		} else {
			//if 2nd argument is provided
			let stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
			$('html, body').animate({
                scrollTop: eval(stringX)         //eval is must-have, crashes without it
            }, 'slow'); 
		}
	}
			
			
};