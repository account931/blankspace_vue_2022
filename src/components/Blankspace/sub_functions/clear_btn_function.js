//this file used in Blankspace.vue to be run as an external functions

export const clearBtnFile = {

    /*
    |--------------------------------------------------------------------------
    | If user clicks "Clear" button
    |--------------------------------------------------------------------------
    |
    |
    */

	clearAll: function(that){ 
	    that.userInput            = "";
		that.fixedUserInput       = "";
		that.textAfterCorrection  = "";
		that.instructionShowFlag  = false;
		that.resultsShowFlag      = false;
		that.typoJSSpellCheck_cut = "";  //Typo-js text
	}
			
			
};