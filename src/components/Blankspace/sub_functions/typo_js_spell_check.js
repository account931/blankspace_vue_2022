//this file used in Blankspace.vue to be run as an external functions. Contains logic for checking textarea input with Typo-JS library. 
//Include  functions: 
// 1st {run_typo_js_spellCheckLibrary()}     =>  finds misspelled words, form/create the text with misspelled suggestions dropdowns (highlited with red) and manually opens BS modal window where a user can fix the errors
// 2nd {fix_MisspelledWords_In_ModalWindow()} => When user clicks "Fix changes" in modal window with options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop


export const typoJs_spellCheck_external = {



    /*
    |--------------------------------------------------------------------------
    | Typo JS core functionality is here, works on btn "Typo Spell Check" Click, Check the textarea input by Typo-js and suggests correct variants in dropdowns
	| On click finds misspelled words, form/create the text with misspelled suggestions dropdowns (highlited with red) and manually opens BS modal window where a user can fix the errors
	| Additionally displays misspelled words above the textarea and button to open modal window (unless they fixed, then this info disappear)
	| 
    |--------------------------------------------------------------------------
    |
    |
    */

	run_typo_js_spellCheckLibrary: function(){ 
			    
	 
	},
	
	
	
	
	
	
	
	
	
	
	
    /*
    |--------------------------------------------------------------------------
    | When user clicks "Fix changes" in modal window with options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
    | Modal window either pops up on executing{function run_typo_js_spellCheckLibrary()} or on manual clicking the button "Open to fix" (for example user ran {function run_typo_js_spellCheckLibrary()} but closes the modal without fixing the errors)
    | @param that is passed {this} context (from /Blankspace/Blankspace.vue)
	|--------------------------------------------------------------------------
    |
    |
    */

	fix_MisspelledWords_In_ModalWindow_External: function(that){  //arg {that} is this
			    
        //alert('fixing now');
		let r = "";  //just for alert string
		console.log("this.arrayOfMisspelledWords:" + that.arrayOfMisspelledWords);
		console.log("this.typoJSSpellCheck_full: " + that.typoJSSpellCheck_full);
			
			
			
			
		let textWithoutTags = that.typoJSSpellCheck_full.replace(/<[^>]*>?/gm, ''); //remove all html tags from text in modal window, as it includes <select><option> suggestion1 </option> <option> suggestion2 </option> <select>
		console.log(textWithoutTags);
			
		let n = textWithoutTags.replace( /\s\s+/g, ' ' );     /* remove all double spaces in text, otherwise produces incorrect result */
		n =  n.trim(); // stripped of whitespace characters from beginning and end of a string, otherwise produces incorrect result
			
		let arrayTextWithoutTags = n.split(' ');  //.split('\n');  //convert modal window text (string) to array
		console.log("arrayTextWithoutTags:" + arrayTextWithoutTags);
			
			
		//copy textarea input to a new var for further manipulation without affecting textarea input   !!!!!!!!!!!!!!!!!!!!!!!
		let userInputText = that.userInput; 
		//userInputText     = userInputText.replace( /\s\s+/g, ' ' );     /* remove all double spaces in text*/
		userInputText     = userInputText.split(' ');  //.split('\n')  //textarea input to array
			
		console.log("userInputText:" + userInputText);
		
			
			
			
			
		//finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
		for(let i = 0; i < that.arrayOfMisspelledWords.length; i++){
			let searchWord  = that.arrayOfMisspelledWords[i]; //one current misspelled word, e.g "awakecc"
			let indexResult = userInputText.indexOf(searchWord); //index/position of found misspelled in array 'userInputText'
		    r+= "got: " + indexResult + " " ;
				
				
			//finds selected dropdown text (corrected variant) for this current [i] <select>
			let selects     = document.getElementsByTagName('select');//gets all <select> array
			let e           = selects[i];                         //gets the currect <select>
            let textSelected = e.options[e.selectedIndex].text;   //get selected text of this currect <select>, e.g "awoke"
			//let value = e.options[e.selectedIndex].value;  //gets value
			console.log("fix: " + textSelected );
			// end  finds selected (corrected variant) for this current [i] <select>
				
				
				
				
			//replace => after removing all html tags from text in modal window, specifically <select> text contains all <option> text as one string, i.e "awokerevokewake", here we replace it with one selected from dropdown(corrected variant). i.e "awoke"
			arrayTextWithoutTags[indexResult] = textSelected ;
				
				
				
		    //fix/correct text, replace an element in array {userInputText} having index {indexResult} with selected text (selected in dropdown in modal window)
		    //let fixedWordIndex = arrayTextWithoutTags   userInputText.indexOf(this.arrayOfMisspelledWords[i]);
			userInputText[indexResult] = textSelected ; // arrayTextWithoutTags[this.arrayOfMisspelledWords[i] + 1 ]; //" screw "; //this.arrayOfMisspelledWords[i];
		}
			
		alert(r);
		console.log("arrayTextWithoutTags after :" + arrayTextWithoutTags);
			
	
			
		//replace texarea user input with fixed/corrected text
		let b = userInputText.join(' '); // convert array to string
		that.userInput = b;  //assign fixed/corrected text to {this.userInput}
			
		//Clears the string with errors found (which appears above the textarea). E.g "Found misspelled: evfoke" replace with "Spelling fixed successfully"
		that.typoJSSpellCheck_cut = 'Spelling fixed successfully';	     
	},
			
			
};