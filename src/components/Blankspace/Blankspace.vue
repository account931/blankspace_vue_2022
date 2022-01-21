<template>
    <div class="col-sm-12 col-xs-12 blankspace">
	
	    <div id="headX" class="jumbotron text-center" style =' background-color: #2ba6cb;'> <!--#2ba6cb;-->
            <h1 id="h1Text"> <span id="textChange"> Double blankspace removal</span> <span class="glyphicon glyphicon glyphicon-link myclip"></span>  </h1>
            <p class="header_p">finds, highlights and fixes all double blankspaces, consecutive duplicates and more</p> 
        </div>


        <div class="item contact padding-top-0 padding-bottom-0" id="contact1">
            <div class="wrapper grey">
    		    <div class="container">

 
 
 
                    <!--------- Show misspelled words by Typo-JS ---------------->
                    <div v-html="this.typoJSSpellCheck_cut" class="misspelled"></div>
					<!--------- Show misspelled words by Typo-JS ---------------->
					
					
					
				    
                    <!--------------------------------------------------- Textarea form  Start------------------------------------------------->
    			    <div class="col-sm-12 col-xs-12">	
    	                <form role="form">  	
    			            <div class="form-group">
    				            <textarea  v-model="userInput"  class="form-control" rows="6" placeholder="Your text here.."  required spellcheck="true"></textarea>
    		                </div>
								
                        </form>
    			    </div>	
                    <!--------------------------------------------------- Textarea form END------------------------------------------------->
    			
				
				
				
				
				    
				
				
    				<!--------------------------- Checkboxes to add additional functions to text fixing process ------------------------------------>
					<div class="row check-options">
					
                    <!-- Checkbox to include checking underscores, i.e for misplaced ad pins -->
					<div class="col-sm-3 col-xs-12">
					    <input type="checkbox" id="checkbox" name="checkbox" class="checkbox-x" v-model="ifUnderscoreOnFlag" v-on:click="toogleMisplacedAdPinsOn">
                        <label id="following" for="checkbox"> {{ this.ifUnderscoreOnFlag ? "check underscores on" : "check underscores" }} </label>
					</div>
					
					<!-- Checkbox to include checking some waze specifics, i.e "Please know that, Help Center". No correction, just notifications-->
					<div class="col-sm-3 col-xs-12">
					    <input type="checkbox" id="support" class="checkbox-x" v-model="ifWazeSpecificsOnFlag" v-on:click="toggleWazeSpecifics">
                        <label id="following" for="support"> {{ this.ifWazeSpecificsOnFlag ? "waze specifics on (notify only)" : "waze specifics" }} </label>
					</div>
					
					<!-- Checkbox to include/exclude Support footer -->
					<div class="col-sm-2 col-xs-12">
					    <input type="checkbox" id="support" class="checkbox-x" v-model="ifSupportOnFlag" v-on:click="toogleSupport">
                        <label id="following" for="support"> {{ this.ifSupportOnFlag ? "support footer on" : "support footer" }} </label>
					</div>
					
				    </div>
					
                    <!--------------------------- End Checkboxes to add additional functions to text fixing process ------------------------------------>










                    <!-------------------------------------------------------START BUTTONS---------------------------------------->
			        <div class="col-md-8 buttons-set">  
    				    <button id="splitButton"       type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="proccessTextCore">  Run a check </button>
                        <button id="clearButton"       type="button" class="btn btn-danger btn-embossed btn-lg btn-wide bt-mobile-mine"   v-on:click="clear">             &nbsp;Reset&nbsp;       </button >
					    <button id="examplebutton"     type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="setExample">        Example     </button>
                        <button id="instructionButton" type="button" class="btn btn-success btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="setInstructions">   {{ this.instructionShowFlag ? "Hide instructions" : "Show instructions"  }} </button>
                        <!--<button id="cr_footer" type="button" class="btn btn-success btn-embossed btn-lg btn-wide">CR Footer(N/A)</button>-->
    		            <button type="button" class="btn btn-success btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="run_typo_js_spellCheckLibrary">            {{ this.typoJSCheckFlag      ? "Checking..."      : "Typo JS Spell Check" }} </button>

					</div>
                    <!-------------------------------------------------------START BUTTONS---------------------------------------->




                    <!------------------------------------------ INSTRUCTIONS SECTION ------------------------------->
                    <!--------- Draw the Instructions from sub-component './sub_components/instructions.vue' ------------> 
			        <draw-instrcutions-field :cssVisibilityFlag ="this.instructionShowFlag"> </draw-instrcutions-field>   <!-- Passing props -->
                    <!----------------------------------------- END INSTRUCTIONS SECTION---------------------->




					
			        <!-------------------------------- RESULTS SECTION (fixed/edited/corrected text) ----------------------------------------->
			        <transition name="bounce">  <!--- Animation wrapper, var 1 name="fade" ------>
				        <div v-if="this.resultsShowFlag" class="col-sm-12 col-xs-12">
								
				            <!-- "No correction was performed" vs "Text after correction" -->
				            <div class="col-sm-12 col-xs-12 red margin-top text-bigger"> 
						        {{ this.textAfterCorrection }} 
						    </div>              
				
				            <!-- Fixed/Corrected text -->
			                <div v-html="this.fixedUserInput" class="col-sm-12 col-xs-12 resultFinal" id="fixedText">       <!--  v-html to display unescaped HTML (with html tages -->
				               {{ /* this.fixedUserInput */ }}
				            </div> 
						
						
						    <!-- Button "Copy text" -->
						    <div class="col-sm-12 col-xs-12">  
						        <button class="btn" v-on:click="copyTextFunction"> 
						           {{ copiedFlag ? "Copied successfully" : "Copy corrected text" }}
						        </button> 
						    </div> 
				
				
				            <!-- Quantity of found errors -->
				            <div class="col-sm-12 col-xs-12 red errors-div red text-bigger"> Found Errors: <span class="badge red-bg"> {{ this.foundErrorsCount }} </span> </div>
						
						    <!-- Button/Div to show/hide detailed error list -->
						    <div v-on:click="showDetailedErrors" class="cursor-x"> 
						        {{ showDetailedErrorsFlag ? "hide detailed error list >>" : "show detailed error list >>" }}  
						    </div> 
						
						    <!-- Button/Div to show/hide highlighted errors -->
						    <div v-on:click="showHighLightedErrors" class="cursor-x"> <!-- Button to show/hide highlighted errors -->
    						    {{ showHighLightErrorsFlag ? "hide highlighted errors " : "show highlighted errors " }} >> </i>   
						    </div>  <!-- Button to show/hide highlighted errors -->
						
						 
						    <!-- Detailed ist of errors -->
						    <transition name="bounce">
						        <div v-if="this.showDetailedErrorsFlag" v-html="this.detailedListOfErrors" class="col-sm-12 col-xs-12 hightLighted"> </div>    <!--  v-html to display unescaped HTML (with html tages -->
						    </transition> 
						 
				            <!-- Text with red highlighted text -->
						    <transition name="bounce"> 
				                <div v-if="this.showHighLightErrorsFlag" v-html="this.textHighlightedErrors" class="col-sm-12 col-xs-12 hightLighted"></div>   <!--  v-html to display unescaped HTML (with html tages -->
				            </transition>
				        </div>
				    </transition>  
				    <!--------------------------------- END RESULTS SECTION (fixed text)-------------------------------------->
	                          

    		    </div><!-- /.container -->
    	    </div><!-- /.wrapper -->

 
		    <!----- Footer from sub-component './sub_components/footer.vue' ---->
		    <draw-footer-field/>
		    <!-- END Footer from sub-component './sub_components/footer.vue' ---->
				
    	
        </div> <!-- /.item -->
			
    
	
	
	
	    <!-- Modal window contains Typo-JS highlighted spell errors in text -->
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <h4 class="modal-title">Fix misspelled words</h4>
                    </div>
                    <div class="modal-body">
                        <p>See errors and fix them.</p>
						
						<!-- contains whole textarea input with highlighted misspelled words (by Typo-js) -->
						<div v-html="this.typoJSSpellCheck_full" class="col-sm-12 col-xs-12"></div>       <!--  v-html to display unescaped HTML (with html tages -->
						
                    </div>
                    <div class="modal-footer">
					   <button v-on:click="fixModalChanges" type="button" class="btn btn-default" data-dismiss="modal" >Fix changes</button>
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal window contains Typo-JS highlighted spell errors in text -->
		
		
		
  </div> <!-- end class="blankspace" -->
</template>

<script>
let Typo = require("typo-js/typo.js"); //Use/require "typo-js" JS Library for check spell //https://github.com/cfinke/Typo.js

//import function from other external file
import {computedAnswerFile} from './sub_functions/scroll_function.js';  //name in {} i.e 'computedAnswerFile' must be cooherent to name in "export const computedAnswerFile" in '/sub_functions/computedAnswer.js'
import {copyExternalFunction} from './sub_functions/copy_function.js';

//using other sub-component, in this case a component to draw the game Field
import instructionField from './sub_components/instructions.vue';  //import file from same level folder
import footerField from './sub_components/footer.vue';             //import file from same level folder

export default {
    name: 'Blankspace',
	
	//using other sub-component, e.g sub-component to draw game field
    components: {
      'draw-instrcutions-field': instructionField,
	  'draw-footer-field'      : footerField 
    },
	
    data () {
        return {
            msg                    : 'Welcome to Blankspace App',
			userInput              : '',     //textarea input
			fixedUserInput         : '',     //fixed/corrected textarea input
			instructionShowFlag    : false,  //CSS flag to show/hide instructions
			resultsShowFlag        : false,  //CSS to show/hide core results
			showDetailedErrorsFlag : false,  //CSS to show/hide detailed list with errors
			showHighLightErrorsFlag: false,  //CSS to show/hide highlited red text
			copiedFlag             : false,  //CSS to change text "Copy" / "Copied"
			typoJSCheckFlag        : false,   //CSS to change text "Typo Js Check spell" / "Checking"
			
			ifUnderscoreOnFlag     : false,  //checkbox flag to decide if text editing will include checking/removing underscore (_, e.g for misplaced ad pins)
			ifSupportOnFlag        : false,  //checkbox flag to decide if edited/fixed text will contain support footer
			ifWazeSpecificsOnFlag  : false,  //checkbox flag to decide if edited/fixed text will contain checking for some waze specifics, i.e "Please know that, Help Center"
			
			foundErrorsCount       : null,   //amount of errors found (int)
			textAfterCorrection    :'',      //"No correction was performed" vs "Text after correction"
			detailedListOfErrors   :'',      //detailed list of errors found
			textHighlightedErrors  :'', 
			
			//regExp
			//doubleSpaces: new RegExp(/\s\s+/g),   /*double spaces*
			typoJSSpellCheck_cut  :'Spell errors will be here (click "typo spell check") ..', //string contains list of misspelled words (by Typo-js)
			typoJSSpellCheck_full :'',                           //string contains whole textarea input with highlighted misspelled words (by Typo-js)
			arrayOfMisspelledWords:[],                           //array contains list of misspelled words (by Typo-js)
        }
    },
  
    computed: {
		checkText() {
			return this.userInput;
		},
			
	},
		
	//before mount
    beforeMount() {
	     
		//this.$store.dispatch('getCaptchaSet'); //trigger ajax function getCaptchaSet(), which is executed in Vuex store to REST Endpoint => /public/post/get_all	
	},
		
	mounted(){ 
	},
		
		
		
		
		
	methods: {
		    
        /*
        |--------------------------------------------------------------------------
        | If image url is invalid or broken or image physically not available in folder, then use 'images/image-corrupted.jpg"
        |--------------------------------------------------------------------------
        |
        |
        */
		imageUrlAlt(event) {
            event.target.src = "images/image-corrupted.jpg"
        },
		
		
		
        /*
        |--------------------------------------------------------------------------
        | If user clicks core button to process the text
        |--------------------------------------------------------------------------
        |
        |
        */		
		proccessTextCore(){
		    
		
			
		    //regExp to use -------
		    //let doubleSpaces   = /\s\s+/g;           /*double spaces*   //new RegExp(/\s\s+/, "g");   
			//let spaceComma     = / \,+/g;            /*space+comma*/
			//let spaceDot       = / \.+/g;            /*space+dot*/
			//let wordsDuplicate = /\b(\w+)\s+\1\b/g;  /*word duplicate*/
			//End regExp to use ----
			
			this.resultsShowFlag         = false;
			this.showDetailedErrorsFlag  = false; //always hide detailed error list 
			this.showHighLightErrorsFlag = false; //always hide HighLighted Errors text
			this.copiedFlag              = false;
			
			
			//if no user printed no input
			if(this.userInput == ""){
			
			    //VUE Sweet alert 2, ordinary sweetAlert does not work in Vue,  have to use vue-sweetalert2
                this.$swal.fire({  //or this.$swal  or Vue.swal
                    html:true, 
                    title: 'Stopped! Empty input!',
                    text: "You are able to revert this!",
                    icon: 'error',
                    //showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK, I"ll try harder!',
                    cancelButtonText: "No, cancel it!",
					keydownListenerCapture: false, //ignore esc button to close the pop
					allowOutsideClick: false       //don't allow outside click to close the pop-up
                });
				return false;
			}
			
		    //alert("OK");
			this.instructionShowFlag = false; //hide instructions if shown
			this.fixedUserInput      = "";   //clear prev fixed/edited input if any
			this.textAfterCorrection = "";   //clear prev if any
			
			let  arrayX2 = this.userInput.split('\n');
			
			for(let j = 0; j < arrayX2.length; j++) {  

                let tempTextLine = arrayX2[j]
	               .replace( /\s\s+/g, ' ' )                              /*double spaces*/
			       .replace(/ \,+/g, ',' )  //.replace(spaceComma, ',' )  /*space+comma*/
			       .replace( / \.+/g, '.' )                               /*space+dot*/
			       .replace( /\b(\w+)\s+\1\b/g, '\$1' )                   /*word duplicate*/
			       .replace( /\,\,+/g, ',' )                              /*double commas ,,*/
			       .replace( /\.\.+/g, '.' )                              /*double dots ..*/  
				   /* .replace(/\,(.)/g, ', \$1' )  */                         /*comma followed by char no space!!!!PROBLEM HERE*/ 
			     + '</br>'; 
				 
				//case if checkbox "check underscores" is ON, then include removing/replacing undescores as well (used for misplaces ad pins) 
                if(this.ifUnderscoreOnFlag){
				    tempTextLine = tempTextLine.replace(/_/gi, ' ' );   /* underscore _ */ 
			    }                          
				 
                //add up fixed/edited/corrected text
                this.fixedUserInput = this.fixedUserInput  + tempTextLine ;
            } //end for
			
			
	
			//case if checkbox "support footer on" is ON, then include Support footer to fixed/edited text
            if(this.ifSupportOnFlag){
				this.fixedUserInput+= "</br>Best regards,</br>Waze Support team";
			}      
			
			
			this.countAllFoundErrors(); //run additional function to count all found errors
			this.highlightErrors();     //run additional function to highlight errors in red
			
			let that = this;
			
			//Promise -> scroll only after the Div (".resultFinal") is in DOM, otherwise an error, tries to scroll to ".resultFinal", whule it is not in DOM
			new Promise(function(resolveX, rejectMe) {
			 
			    //add some delay before div will appear for better UI/UX
			    const myTimeout = setTimeout(function(){ 
				    that.resultsShowFlag = true; 
					resolveX(); 
				}, 700);
			})
			.then(
			    responseZZ => {  
			       //alert(77);
			       computedAnswerFile.scrollResults(".resultFinal"); //Call the function from external file (/sub_functions/computedAnswer.js)
				   //let z = b/0; //to trigger error manually to test catch section
			    }
			) 
             //catch
             .catch(errorX => {  //this name {errorX} must be the same as in {alert("Rejected: " + errorX))}
                    // вторая функция - запустится при вызове reject
                    //alert("Rejected: " + errorX); // errorX is a rejectMe argument
					
					this.$swal('Error happened  ' + errorX);
					
			        
            });
			//End Promise ->
        },





        /*
        |--------------------------------------------------------------------------
        | Count all errors found in text (double space etc)
        |--------------------------------------------------------------------------
        |
        |
        */		
		countAllFoundErrors(){
		
		    let numb                 = (this.userInput.match(/  +/g) || []).length;            //count doublespaces
            let numbComma            = (this.userInput.match(/ \,+/g) || []).length;           //count space+comma
            let numbDot              = (this.userInput.match(/ \.+/g) || []).length;           //count space+dot
            let doubleWords          = (this.userInput.match(/\b(\w+)\s+\1\b/g) || []).length; //count all consecutive duplicate words
            let doubleCommas         = (this.userInput.match(/(\,\,+)/g  ) || []).length;      //count all consecutive duplicate commas (i.e ",,")
            let doubleDots           = (this.userInput.match(/(\.\.+)/g  ) || []).length;      //count all consecutive duplicate dots (i.e "..")
            let commaCharNoSpace     = (this.userInput.match(/\,(.)/g    ) || []).length;     // count comma followed by NO SPACE (i.e ",char")  //work here!!!!!!!     //comma followed by char no space (i.e "not,you")
           
			
            //Rex exp for misplaced ad pins
            let RegExp_underscore = /_/gi; // construct Regular expression
            let Underscore_ErrCount = (this.userInput.match(RegExp_underscore) || []).length; // count undescores (i.e "_")
  
  
            
			//case if checkbox "waze specifics" is ON, then include checking for some waze specifics  i.e "Please know that, Help Center". Notifications only (swal).
            if(this.ifWazeSpecificsOnFlag){
			
                //start Help Center issue---
			    
                let hrefUrlBlankSpace = (this.userInput.match(/Help Center/gi) || []).length; // checking Help Center space; if blankspace is linked. Can't design it normally!!! 
                if(hrefUrlBlankSpace > 0){
                     this.$swal('Help Center reference is detected!!!');
		        }
                // END Help Center issue-----[

   
                //Please know that(if that is missing)!!!!!!!!!!!!!!!!!!!!!!
		        let RegExp_PlsKnow  = /please (know||note) (?!that)\w*/gi;  //if set "\s*" after "(know||note)'->ERR //Reg Expression itself  http://www.regextester.com/15 //please (know||note) [^t][^h][^a][^t]*\w* /gi;
	            let PlsKnowErrCount = (this.userInput.match(RegExp_PlsKnow ) || []).length; //count "please know"
	            if(this.userInput.match(RegExp_PlsKnow)) { ///if at least 1 result
			        //alert('Missing "that" Error => ' + PlsKnowErrCount);
					this.$swal('Missing "that" error is detected! Found: ' + PlsKnowErrCount + ' issue');
			    } 
                //END Please know that(if that is missing)!!!!!!!!!!!!!!!!!!!!!!
            }
			//end //case if checkbox "waze specifics" is ON, then include checking for some waze specifics  i.e "Please know that, Help Center". Notifications only (swal).

  
            //let RegExp_commaNoSpaceChar=/\,([^ ])/g; // reg exp for (word ,word)
            //
            //let dotCharNoSpace =(this.userInput.match(/\.(.)/g) || []).length; // count dot followed by NO SPACE (.char)//NOT IMPLEMENTED



            // count all counts Errors all together (they are +-ed)
            let AllErrorsCount = numb + numbComma + numbDot+doubleWords + doubleCommas + doubleDots /* +  commaCharNoSpace */ /*+PlsKnowErrCount*/   /* +Underscore_ErrCount */;  //
			
			    
				
			//specify detailedListOfErrors
			this.detailedListOfErrors = "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double Spaces => "                       + numb             + "</p>" + 
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Char followed by comma with space => "   + numbComma        + "</p>" + 
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Dots followed => "                       + numbDot          + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Consecutive duplicates => "              + doubleWords      + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double commas => "                       + doubleCommas     + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double dots => "                         + doubleDots       + "</p>";
				                        /* "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Comma followed by char no space =>"      + commaCharNoSpace + "</p>"; */
			                             /* ';</br> Underscore => ' + Underscore_ErrCount  +  */   //gone to if() condition below
			
			
			//case if checkbox "check underscores" is ON, then include undescores to mistakes count (used for misplaces ad pins)
            if(this.ifUnderscoreOnFlag){
			    AllErrorsCount = AllErrorsCount + Underscore_ErrCount;
				this.detailedListOfErrors = this.detailedListOfErrors + 
				     "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Underscores => "  + Underscore_ErrCount   + "</p>";;
			}
			
			this.foundErrorsCount = AllErrorsCount; //amount of found errors
			(AllErrorsCount == 0) ? this.textAfterCorrection = "No correction was performed" : this.textAfterCorrection = "Text after correction";
			

		}, 
		
		
		
		
		
		/*
        |--------------------------------------------------------------------------
        | Function to highlight Errors in text
        |--------------------------------------------------------------------------
        |
        |
        */
		highlightErrors(){
		    //let intro = "<p> See errors </p>"; 
			let intro;
			(this.foundErrorsCount == 0) ? intro = "<p> No errors found </p>" :  intro = "<p> See errors </p>";
			
			let finalText = '';
		    let  arrayX2 = this.userInput.split('\n');
			for(let j = 0; j < arrayX2.length; j++) {  
			    let resHighlight = arrayX2[j] /*->double spaces*/
	                .replace(/  +/g, "&nbsp;<span style='background:red;'> __ </span>&nbsp;")                 /* double blankspace */
					.replace(/ \,+/g, "&nbsp;<span style='background:red;'> __, </span>&nbsp;")               /* space+comma       */
					.replace(/ \.+/g, "&nbsp;<span style='background:red;'> __. </span>&nbsp;")               /* space+dot         */
	                .replace(/\b(\w+)\s+\1\b/g, "&nbsp;<span style='background:red;'> \$1 \$1 </span>&nbsp;") /* dublicate         */
		            .replace(/\,\,+/g, "&nbsp;<span style='background:red;'> ,, </span>&nbsp;")               /* double,,          */
		            .replace(/\.\.+/g, "&nbsp;<span style='background:red;'> .. </span>&nbsp;")               /* double..          */
                    /* .replace(/\,(.)/g, "&nbsp;&nbsp;<span style='background:red;'>_ ,</span>&nbsp;") */        /* comma char no space(,word) */ 
                                                            				   
	               + "</br>";
	   
	   
	            //case if checkbox "check underscores" is ON, include undescores to highlighted text (used for misplaces ad pins)
                if(this.ifUnderscoreOnFlag){
				    resHighlight =  resHighlight.replace(/_/gi, "&nbsp;<span style='background:red;'> _ </span>&nbsp;");   /*underscore_*/  //!!!!problem here -> why not RegExp_commaNoSpaceChar  /*underscore Rex exp for misplaced ad pins*/
			    }
			
			
	            //add up finalText
	            finalText = finalText + resHighlight;
				
			}
			this.textHighlightedErrors = intro  + finalText;
		
		},
		
		
		
		
		
        /*
        |--------------------------------------------------------------------------
        | If user clicks "Clear"
        |--------------------------------------------------------------------------
        |
        |
        */		
		clear(){
		    this.userInput           = "";
			this.fixedUserInput      = "";
			this.textAfterCorrection = "";
			this.instructionShowFlag = false;
			this.resultsShowFlag     = false;
			this.typoJSSpellCheck_cut           = "";  //Typo-js text
        },
        
		//function to show/hide instructions
        setInstructions(){
		    this.instructionShowFlag = !this.instructionShowFlag; //switch state to change class.
			const myTimeout = setTimeout(function(){ 
				computedAnswerFile.scrollResults("#hiddenInstructions"); //Call the function from external file (/sub_functions/computedAnswer.js)
		    }, 700);

        },
		
		//function set example
		setExample(){
		    this.userInput = "Lilly awoke  in an evening dress and opera cloak. \n In her hand were five playing cards. \n They were were, the queen  of spades, four of clubs, \n nine of clubs , three of hearts, nine of hearts.";
		},
		
		//function to switch CSS to show/hide detailed error list
		showDetailedErrors(){
		    this.showDetailedErrorsFlag  = !this.showDetailedErrorsFlag; //switch state to change class.
			this.showHighLightErrorsFlag = false; //always hide HighLighted Errors text
			
			//Call the function from external file (/sub_functions/computedAnswer.js). Problem with DOM visibility
			const myTimeout = setTimeout(function(){ computedAnswerFile.scrollResults(".hightLighted"); }, 700);
		},
		
		  
		//function to switch CSS to show/hide HighLighted Errors text
		showHighLightedErrors(){
		    this.showHighLightErrorsFlag = !this.showHighLightErrorsFlag; //switch state to change class.
			this.showDetailedErrorsFlag  = false; //always hide detailed error list 
			
			//Call the function from external file (/sub_functions/computedAnswer.js). Problem with DOM visibility
			const myTimeout = setTimeout(function(){ computedAnswerFile.scrollResults(".hightLighted"); }, 700);

        },
		
		// function to copy text via external function
		copyTextFunction(){ 
		    copyExternalFunction.copyTextToClipBoard(this); //calling external file function, (this) arg is a must, otherwise crash	
		},
		
		
		
		//on checkbox change enable/disable checking undescored (used for misplaced ad pins)
		toogleMisplacedAdPinsOn(){
		    this.ifUnderscoreOnFlag  = !this.ifUnderscoreOnFlag; //switch state to change text and enable/disable checking misplaced Ad Pins.
		},
		

		//on checkbox change enable/disable adding Support footer to edited/fixed tex 
		toogleSupport(){
		    this.ifSupportOnFlag  = !this.ifSupportOnFlag; //switch state to change text and enable/disable adding support footer
		},
		
		//on checkbox change enable/disable checking if edited/fixed text will contain checking for some waze specifics, i.e "Please know that, Help Center"
		toggleWazeSpecifics(){
		    this.ifWazeSpecificsOnFlag  = !this.ifWazeSpecificsOnFlag; //switch state to change text and enable/disable
		},
		
		
		
		
		
		/*
        |--------------------------------------------------------------------------
        | Typo JS functions, works on btn Click, finds misspelled words, display them above the textarea and prompts user to open modal window where he can fix the errors
        |--------------------------------------------------------------------------
        |
        |
        */
		run_typo_js_spellCheckLibrary(){
		    //Typo-js Library (spell check)-------
			
			//if no user printed no input
			if(this.userInput == ""){
			    this.$swal('Input is empty');
				return false;
			}
			
			
			//let that = this;
			this.typoJSCheckFlag = true; //CSS flag for button text
			
			this.arrayOfMisspelledWords = [];// reset the array of misspelled words
			
			
			let foundMisspelledWords  = "Found misspelled: ";  //list of misspelled words 
			let all_text              = "";                    // contains whole textarea input with highlighted misspelled words (by Typo-js)
			let spellErrorFound       = false;
			
			//decide which url to use, switching ajax url when running on  http://localhost:8080/ (hot reload) or OpenServer Hosting
			let dynamicPath; //path for 
	        let localhost8080     = "/static/dictionaries";
            let localhostOpServer = "../static/dictionaries"; 
			let realServerProdURL = "static/dictionaries";
	     
		  
	        //if finds "/localhost:8080/" in current url. Url for case when app is runing in (npm run dev) hot reload
	        if(window.location.href.match(/localhost:8080/)){   
		        dynamicPath = localhost8080 ; 
			}
			
	        //if finds "/localhost/" in current url. Url for case when app is runing in OpenServer 
	        if(window.location.href.match(/localhost/)){    
		       dynamicPath = localhostOpServer ;
	        } else {
			    //case when app is runing in real web-host. Library must be in the same root with index.html
			    dynamicPath = realServerProdURL; 
			}
			
			//alert("Path is " + dynamicPath);
			
			//Check if path to dictionary exists
			if(this.checkFileExist(dynamicPath)){  //  "/static/dictionaries"
			    alert("Dictionary load is OK");
			} else {
			    alert("Dictionary is not found");
			    return false;
			}
			
			
			
			
          
	
				
		   
			//Check the textarea input by Typo-js
			let dictionary = new Typo("en_US", false, false, { dictionaryPath: dynamicPath });     //{ dictionaryPath: "/static/dictionaries" }
			
            let  arrayX2 = this.userInput.split('\n'); //split textarea input (string) to array by ('\n'). E.g "Lilly awoke  in an evening dress and opera cloak."
			
			for(let i = 0; i < arrayX2.length; i++) {  
			    
				let  arrayX3 =  arrayX2[i].split(' ');  //split every line by separate words. E.g "opera"
			    for(let j = 0; j < arrayX3.length; j++) {
				
				    //alert(arrayX3[j]); //one single word, e.g "opera"
					//!!! let currWord = arrayX3[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //removes any punctuations mark from string, as any presnet followed by word, Typo-JS gives incorrect check, i.e "opera." checked as wrong
			        
					let currWord         = arrayX3[j]; //i.e one word from textarea to check, if it contains punctuantion, it is also included e.g "awoke,"
					let currWordPurified = arrayX3[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //i.e one word from textarea to check, but if it contains any punctuantion, we remove it //removes any punctuations mark from string, as any presnet followed by word, Typo-JS gives incorrect check, i.e "opera." checked as wrong
				    
					let is_spelled_correctly = dictionary.check(currWordPurified); //check the one current word by Typo-JS Library
					
					if(is_spelled_correctly){ //if spelling OK (by Typo-JS Library), can return boolean true or false
					    //foundMisspelledWords = foundMisspelledWords + "  " + arrayX3[j];
						all_text = all_text + "  " + arrayX3[j];
                    
                    //if spelling is wrong (by Typo-JS Library)				
					} else {
					
					    //add misspelled word to array
						this.arrayOfMisspelledWords.push(currWord);
					    
					    //get suggestions for misspelled word (by typo-js)
					    let array_of_suggestions = dictionary.suggest(currWordPurified); //to get suggested corrections word variants for a misspelled word by Typo-JS Library. E.g if it "wodke", the suggestions will be ["woke", "awoke']
						console.log(array_of_suggestions);
						/*
						let tooltipText = "";
						for(let i =  0; i < array_of_suggestions.length; i++){
						    tooltipText+= array_of_suggestions[i] + " \n ";
						}*/
						
						//create checkbox/select/option with misspelled word suggestions.  E.g if it "wodke", the suggestions will be ["woke", "awoke']
						let checkBox = "<select v-on:change='onSelectOption(e)'  class='suggests'> <option value='" + currWordPurified + "' selected>" + currWordPurified + "</option>"; //onchange='onSelectOption(this.value)'   @change='onSelectOption($event)' 
						for(let i =  0; i < array_of_suggestions.length; i++){
						    checkBox+= "<option value='" + array_of_suggestions[i] + "'>" + array_of_suggestions[i] + "</option>";
						}
						checkBox+= "</select>";
						
  
						
						//end get suggestions for misspelled word (by typo-js)
						
					    foundMisspelledWords = foundMisspelledWords +  " <span style='color:red;'>" + arrayX3[j] + "</span> "; //to end the list of misspelled words
						all_text+= " <span style='color:red;'>" + checkBox + "</span> ";           //contains whole textarea input with highlighted misspelled words and suggestions dropdown (by Typo-js)

						//all_text+= " <span style='color:red;' title='" + tooltipText + "'>" + arrayX3[j] + "</span> ";           //contains whole textarea input with highlighted misspelled words (by Typo-js)
						//all_text+= " <el-tooltip class='item' effect='dark' content='" + tooltipText + "' placement='top'><el-button> topfff </el-button></el-tooltip>";

						spellErrorFound = true;
					}
					
			        //console.log(is_spelled_correctly); //true/false
					
					
				}
			}
			
			 //CSS flag to change button text
			let that = this;
			setTimeout(function(){ that.typoJSCheckFlag = false; }, 2700);
			
			this.typoJSSpellCheck_cut  = foundMisspelledWords;
			this.typoJSSpellCheck_full = all_text;
			//this.userInput = foundMisspelledWords;
			
			if(spellErrorFound){
				this.$swal('Spelling error found');
				
                this.typoJSSpellCheck_cut+= '</br> <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal">Open to fix</button>'; //<!-- Trigger the modal with a button -->
			} else {
			    this.$swal('No spelling error found');
			    this.typoJSSpellCheck_cut = "No spelling errors found";
			}
		     
		},
		
		
		
		
		
		
		//function to check if path exists, used to check before load the Dictionary for Typo-js
		checkFileExist(urlToFile) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', urlToFile, false);
            xhr.send();
     
            if (xhr.status == "404") {
                return false;
            } else {
                return true;
            }
        },
		
		
		// Does not work (on change <select><option>). NOT USED
		onSelectOption:function(e){
		   alert(9);
		},
		
		
		
		
		
		
		
		
		/*
        |--------------------------------------------------------------------------
        | When user clicks "Fix changes" in modal window with options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
	    | Check the textarea input by Typo-js and suggests correct variants in dropdowns
        |--------------------------------------------------------------------------
        |
        |
        */
		fixModalChanges(){
		    alert('fixing now');
			let r = "";  //just for alert string
			console.log("this.arrayOfMisspelledWords:" + this.arrayOfMisspelledWords);
			console.log("this.typoJSSpellCheck_full: " + this.typoJSSpellCheck_full);
			
			
			
			
			let textWithoutTags = this.typoJSSpellCheck_full.replace(/<[^>]*>?/gm, ''); //remove all html tags from text in modal window, as it includes <select><option> suggestion1 </option> <option> suggestion2 </option> <select>
			console.log(textWithoutTags);
			
			let n = textWithoutTags.replace( /\s\s+/g, ' ' );     /* remove all double spaces in text, otherwise produces incorrect result */
			n =  n.trim(); // stripped of whitespace characters from beginning and end of a string, otherwise produces incorrect result
			
			let arrayTextWithoutTags = n.split(' ');  //.split('\n');  //convert modal window text (string) to array
			console.log("arrayTextWithoutTags:" + arrayTextWithoutTags);
			
			
			//copy textarea input to a new var for further manipulation without affecting textarea input   !!!!!!!!!!!!!!!!!!!!!!!
			let userInputText = this.userInput; 
			userInputText     = userInputText.replace( /\s\s+/g, ' ' );     /* remove all double spaces in text*/
			userInputText     = userInputText.split(' ');  //.split('\n')  //textarea input to array
			
			console.log("userInputText:" + userInputText);
		
			
			
			
			
			//finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
			for(let i = 0; i < this.arrayOfMisspelledWords.length; i++){
			    let searchWord  = this.arrayOfMisspelledWords[i]; //one current misspelled word, e.g "awakecc"
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
			this.userInput = b;  //assign fixed/corrected text to {this.userInput}
			
			//Clears the string with errors found (which appears above the textarea). E.g "Found misspelled: evfoke" replace with "Spelling fixed successfully"
			this.typoJSSpellCheck_cut = 'Spelling fixed successfully';
		},
		
    }		
}
</script>









<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li             {display: inline-block;margin: 0 10px;}
a              {color: #42b983;}
.resultFinal   {border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.hightLighted  {border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.red           {color: red;}
.margin-zz     {margin: 0 !important; color:red !important; text-align:left; }

.errors-div    {margin-top:2em;}
.margin-top    {margin-top:2em;}
.cursor-x      {}
.cursor-x:hover{text-decoration: underlined; color:red; cursor:pointer;}
.text-bigger   {font-size: 1.2em;}
.red-bg        {background-color:red;}
.footer        {margin-top: 26em;}
.buttons-set   {margin-top:3em;}
.misspelled    {margin-bottom: 0.2em;}

/*  mobile */
@media screen and (max-width: 460px) {   
    .check-options { font-size: 0.8em;}
	.buttons-set   {margin-top: 1em;}
}

/* ----------------  Vue animation ----- */

    /*--- Animation Var 1 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 6.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    /*--- Animation Var 2 */	
    .bounce-enter-active {
       animation: bounce-in 0.5s; /* fade in time */
    }
    .bounce-leave-active {
      animation: bounce-in 1.5s reverse;
    }
    @keyframes bounce-in {
       0%   { transform: scale(0); }
       50% { -webkit-transform : rotate(480deg) scale(0.3); /* Chrome, Opera 15+, Safari 3.1+ */  transform: rotate(490deg) scale(0.2); /* Firefox 16+, IE 10+, Opera */ }     /* transform: scale(1.5); */
       100% { transform: scale(1); }
    }
	
/* -------------- End  Vue animation ----------*/

</style>
