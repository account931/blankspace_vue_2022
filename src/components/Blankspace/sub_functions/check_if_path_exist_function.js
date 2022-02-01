//this file used in Blankspace.vue as an external functions (and is passed as param to sub-function)

export const checkPathFile = {

    /*
    |---------------------------------------------------------------------------------------------------------------------
    | Function to check if path exists, used to check before load the Dictionary for Typo-js (if Dictionary path is OK)
	| @param urlToFile
    |--------------------------------------------------------------------------------------------------------------------
    |
    |
    */

	checkFileExist_External: function(urlToFile){ 
	    var xhr = new XMLHttpRequest();
     
		/*
		xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("State: " + xhr.readyState + " and Status: " + xhr.status  + " and Response: " + xhr.responseXML);
            } else {
				alert("Not sent yet");
			} 
        } */

        xhr.open('GET', urlToFile, false);
        xhr.send();
		
		//LAME FIX
        //If file not found
        if (xhr.status == "404" ) {     //|| xhr.responseXML == null
            return false;
			
		//if file is found and OK
        } else {
			//get the first 1 line (if u opened "/en_US/en_US.aff", they must be SET ISO8859-1)
			//console.log(xhr.responseText); //get the whole response, which must be the content of "/en_US/en_US.aff"
			let checkWord = xhr.responseText.split("\n")[0] ; //get the first 1 line, if OK it must be "SET ISO8859-1"
			//alert(checkWord);
			
			if(checkWord == "SET ISO8859-1" ){
				return true;
			} else {
				return false;
			}
            
        }
	}
			
			
};