<template>
    <div class="col-sm-12 col-xs-12">
	
	    <div id="headX" class="jumbotron text-center" style =' background-color: #2ba6cb;'> <!--#2ba6cb;-->
            <h1 id="h1Text"> <span id="textChange"> Double blankspace removal</span> <span class="glyphicon glyphicon glyphicon-link myclip"></span>  </h1>
            <p class="header_p">finds, highlights and fixes all double blankspaces, consecutive duplicates and more</p> 
        </div>




        <div class="item contact padding-top-0 padding-bottom-0" id="contact1">
            <div class="wrapper grey">
    		    <div class="container">

                <p> Found Errors {{ this.foundErrorsCount }} </p>
                <div v-html="this.fixedUserInput"> </div> <!--  v-html to display unescaped HTML (with html tages). Instead of {{ this.fixedUserInput }} -->
				
				
                <!--------------------------------------------------- TextArea FORM  Start------------------------------------------------->
    			<div class="col-sm-12 col-xs-12">	
    	            <form role="form">  	
    			  		    				  	
    			        <div class="form-group">
    				        <textarea v-model="userInput" class="form-control" rows="6" placeholder="Your text here.."  required></textarea>
    		            </div>
    				  
                    </form>
    			</div>	
                <!--------------------------------------------------- TextArea FORM END------------------------------------------------->
    			
    					
    				
             



                <!-------------------------------------------------------START BUTTONS---------------------------------------->
				</br>
			    <div class="col-md-8" style="margin-top:33px;">  
    				<button id="splitButton"       type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="proccessTextCore">  Run a check </button>
                    <button id="clearButton"       type="button" class="btn btn-danger btn-embossed btn-lg btn-wide bt-mobile-mine"   v-on:click="clear">             Reset       </button >
					<button id="examplebutton"     type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="setExample">        Example     </button>
                    <button id="instructionButton" type="button" class="btn btn-success btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="instructions">      Instruction </button>
                    <button id="cr_footer" type="button" class="btn btn-success btn-embossed btn-lg btn-wide">CR Footer</button>
    		    </div>
                <!-------------------------------------------------------START BUTTONS---------------------------------------->







                <!------------------------------------------ INSTRUCTIONS SECTION ------------------------------->
                </br>
				<transition name="bounce">  <!--- Animation wrapper, var 1 name="fade" ------>
				<div v-if="this.instructionShowFlag" class="col-md-8 jumbotron"  id="hiddenInstructions" style="margin-top:2%;"> 
                    <!-- INSTRUCTIONS -->
                    <p>
                        <!--RU-->
                        </br></br>
                        <!--<a href='#' target="_blank" style="font-size:18px; "/>View Video Instructions</a>-->
                        </br>

                        <!-- END RU-->

                        </br>How to remove underscores:
                        </br>1.Paste the text you'd like to fix.
                        </br>2.Click "Run a check" button and get corrected text.
                        </br>3.Click "Copy" button to copy corrected text.
                        </br>Click <span style="color:red;">"Errors" </span> to see Errors summary or click "show more details" to view errors in original text.



                        <!--</br>This application performs a check, finds, highlights and fixes all double blankspaces, blankspace + comma, blankspace + full stop.-->
                        </br></br>Additionally, it fixes consecutive duplicates, double commas, double dots, cases when word is preceeded by comma without no space and more, see full list below.
                        </br>List:
                        <!--</br>1.Removes underscore <span style="color:red;"> *</span>-->
                        </br>1.Double blankspaces.
                        </br>2.Character followed by comma with space (i.e "word ,")
                        </br>3.Character followed by dot with space (i.e  "word .")
                        </br>4.Consecutive duplicates (i.e "to to")
                        </br>5.Accidentally placed two repetitive commas (i.e  ",,")
                        </br>6.Accidentally placed two repetitive dots (i.e  "..")
                        </br>7.Character preceeded by comma without space (i.e ",word") - > <span style="color:red;"> 90% implemented </span>
                        </br>8.Character preceeded by dot without space (i.e ".word") - > <span style="color:red;"> being implemented</span>

                        <!--</br>10.Pls know /Help center - > <span style="color:red;"> notifications only</span>-->
                        <!--</br>11.Double paragraphs - > <span style="color:red;"> being implemented</span>-->
                        <!--</br>9.Missing dot in the end of the sentence - > <span style="color:red;"> being implemented</span>-->

                        <!--</br></br><i>Note: numbered and bulleted list option and other inner GCases formats will not be saved.</i></br></p>-->
                        <!--END  INSTRUCTIONS-->
                    </p>
                </div>
				</transition> 
                <!----------------------------------------- END INSTRUCTIONS SECTION---------------------->




                

					
			    <!-------------------------------- RESULTS SECTION (fixed/edited/corrected text) ----------------------------------------->
			    <transition name="bounce">  <!--- Animation wrapper, var 1 name="fade" ------>
				    <div v-if="this.resultsShowFlag">
								
				        
				
				        <div class="red"> {{ this.textAfterCorrection }} </div>              <!-- "No correction was performed" vs "Text after correction" -->
				
				        <!-- Fixed text -->
			            <div v-html="this.fixedUserInput" class="resultFinal col-md-8">       <!--  v-html to display unescaped HTML (with html tages -->
				           {{ this.fixedUserInput }}
				        </div> 
				
				        <!-- Quantity of found errors -->
				        <div class="errors-div red"> Found Errors {{ this.foundErrorsCount }} </div>
						<div v-on:click="showDetailedErrors"    class="cursor-x"> show detailed error list >> </div> <!-- Button to show/hide detailed error list -->
						<div v-on:click="showHighLightedErrors" class="cursor-x"> show highlighted errors >> </div>  <!-- Button to show/hide highlighted errors -->
						
						 
						<!-- Detailed ist of errors -->
						<transition name="bounce">
						<div v-if="this.showDetailedErrorsFlag" v-html="this.detailedListOfErrors" class="hightLighted"> </div>    <!--  v-html to display unescaped HTML (with html tages -->
						</transition> 
						 
				        <!-- Text with red highlighted text -->
						<transition name="bounce"> 
				        <div v-if="this.showHighLightErrorsFlag" v-html="this.textHighlightedErrors" class="hightLighted"></div>   <!--  v-html to display unescaped HTML (with html tages -->
				        </transition>
				</div>
				</transition>  
				<!--------------------------------- END RESULTS SECTION (fixed text)-------------------------------------->
					
					
					
    		                        


                <!--------------------------------- SECTION "Show errors" NOT USED???------------------------------------------------>
                </br></br>
                <div class="col-md-8">
                    <p id="highLight_errors_button" style="display:none;cursor:pointer;padding:10px;margin-top:17px;text-decoration:underline;color:red;">show more details >></p>
                    
					<div id="highLight_errors" style="display:none;padding:19px;border:1px dotted red;box-shadow: 5px 5px 25px red ;"><!-- Highlights with red double spaces-->
                    </div><!--end id="highLight_errors -->
					
                    </br></br>
                </div><!--div class="col-md-8">-->
                <!-------------------------------- END SECTION "Show errors" --------------------------------------------->


                                        

    		    </div><!-- /.container -->
    	    </div><!-- /.wrapper -->

            <div style="height:77px;">
		    </div>
				
				
		    <!----- Footer ---->
		    <div class="footer">
			    Contact: <strong>dimmm931@gmail.com</strong></br>
				{{ new Date().getFullYear() }}
			    <!-- <?php  echo date("Y"); ?>-->
		    </div>
		    <!-- END Footer ---->
				
				
    	
        </div> <!-- /.item -->
			
    </div>	
</template>

<script>
//import function from other external file
import {computedAnswerFile} from './sub_functions/scroll_function.js';  //name in {} i.e 'computedAnswerFile' must be cooherent to name in "export const computedAnswerFile" in '/sub_functions/computedAnswer.js'

export default {
    name: 'Blankspace',
    data () {
        return {
            msg                    : 'Welcome to Blankspace App',
			userInput              : '',     //textarea input
			fixedUserInput         : '',     //fixed/corrected textarea input
			instructionShowFlag    : false,  //CSS flag to show/hide instructions
			resultsShowFlag        : false,  //CSS to show/hide core results
			showDetailedErrorsFlag : false,  //CSS to show/hide detailed list with errors
			showHighLightErrorsFlag: false,  //CSS to show/hide highlited red text
			foundErrorsCount       : null,   //amount of errors found (int)
			textAfterCorrection    :'',      //"No correction was performed" vs "Text after correction"
			detailedListOfErrors   :'',      //detailed list of errors found
			textHighlightedErrors  :'', 
			
			
			//regExp
			//doubleSpaces: new RegExp(/\s\s+/g),   /*double spaces*
	  
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
			
			this.resultsShowFlag = false;
			
			
			//if no user printed no input
			if(this.userInput == ""){
			    //VUE Sweet alert 2, ordinary sweetAlert does not work in Vue,  have to use vue-sweetalert2
                this.$swal.fire({  //or this.$swal  or Vue.swal
                    html:true, 
                    title: 'Empty input',
                    text: "You are able to revert this!",
                    icon: 'error',
                    //showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK, I hace got it!',
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
			       .replace( /\,\,+/g, ',' ) /*double commas ,,*/
			       .replace( /\.\.+/g, '.' ) /*comma followed by char no space!!!!PROBLEM HERE*/  /*.replace(/\,(.)/g, ', \$1' )*/    /*double dots ..*/    
			     /* .replace( RegExp_underscore , ' ' )  */    + /*underscore _*/
			    '</br>'; 
 
            //add up fixed text
            this.fixedUserInput = this.fixedUserInput  + tempTextLine ;
            } //end for
			
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
			    }
			) 
             //catch
             .catch(errorX => {  //this name {errorX} must be the same as in {alert("Rejected: " + errorX))}
                     // вторая функция - запустится при вызове reject
                     alert("Rejected: " + errorX); // errorX is a rejectMe argument
			        
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
		
		    let numb         = (this.userInput.match(/  +/g) || []).length;            //count doublespaces
            let numbComma    = (this.userInput.match(/ \,+/g) || []).length;           //count space+comma
            let numbDot      = (this.userInput.match(/ \.+/g) || []).length;           //count space+dot
            let doubleWords  = (this.userInput.match(/\b(\w+)\s+\1\b/g) || []).length; //count all consecutive duplicate words
            let doubleCommas = (this.userInput.match(/(\,\,+)/g  ) || []).length;      //count all consecutive duplicate commas (i.e ",,")
            let doubleDots   = (this.userInput.match(/(\.\.+)/g  ) || []).length;      //count all consecutive duplicate dots (i.e "..")
  
            //Rex exp for misplaced ad pins
            let RegExp_underscore = /_/gi; // construct Regular expression
            let Underscore_ErrCount = (this.userInput.match(RegExp_underscore) || []).length; // count undescores (i.e "_")
  
            //start Help Center issue---
			/*
            let hrefUrlBlankSpace =(this.userInput.match(/Help Center/gi) || []).length; // checking Help Center space; if blankspace is linked. Can't design it normally!!! 
            if(hrefUrlBlankSpace>0){
                $("body").append("<div id='popAlert' style='position:absolute;width:8%;height:20px;top:0px;left:0px;background:red;'><center>Caution -></center></div>");
             }else{
			     $('#popAlert').remove();
		    }
			*/
            // END Help Center issue-----[

   
            //Please know that(if that is missing)!!!!!!!!!!!!!!!!!!!!!!
		    let RegExp_PlsKnow = /please (know||note) (?!that)\w*/gi;  //if set "\s*" after "(know||note)'->ERR //Reg Expression itself  http://www.regextester.com/15 //please (know||note) [^t][^h][^a][^t]*\w* /gi;
	        let PlsKnowErrCount =(this.userInput.match(RegExp_PlsKnow ) || []).length; //count "please know"
	        if(this.userInput.match(RegExp_PlsKnow)) { ///if at least 1 result
			    alert('Missing "that" Error => '+ PlsKnowErrCount);
			} 
            //END Please know that(if that is missing)!!!!!!!!!!!!!!!!!!!!!!


  
            //let RegExp_commaNoSpaceChar=/\,([^ ])/g; // reg exp for (word ,word)
            //let commaCharNoSpace =(this.userInput.match(RegExp_commaNoSpaceChar/*/\,([^ ])/g*/) || []).length; // count comma followed by NO SPACE (i.e ",char")  //work here!!!!!!!
            //let dotCharNoSpace =(this.userInput.match(/\.(.)/g) || []).length; // count dot followed by NO SPACE (.char)//NOT IMPLEMENTED



            // count all counts Errors all together (they are +-ed)
            let AllErrorsCount = numb + numbComma + numbDot+doubleWords + doubleCommas + doubleDots/*+commaCharNoSpace*/  /*+PlsKnowErrCount*/   /* +Underscore_ErrCount */;  //
		    this.foundErrorsCount = AllErrorsCount; //amount of found errors
			(AllErrorsCount == 0) ? this.textAfterCorrection = "No correction was performed" : this.textAfterCorrection = "Text after correction";
			
			//specify detailedListOfErrors
			this.detailedListOfErrors = "<p class='margin-x'> Double Spaces => "                     + numb         + "</p>" + 
				                        "<p class='margin-x'> Char followed by comma with space => " + numbComma    + "</p>" + 
				                        "<p class='margin-x'> Dots followed => "                     + numbDot      + "</p>" +
				                        "<p class='margin-x'> Consecutive duplicates => "            + doubleWords  + "</p>" +
				                        "<p class='margin-x'> Double commas => "                     + doubleCommas + "</p>" +
				                        "<p class='margin-x'> Double dots => "                       + doubleDots   + "</p>";
				                        /* ';</br> Underscore => ' + Underscore_ErrCount  +  */   //deactivated for zzz production
				                        /* '; </br>Comma+char with NO space => ' +commaCharNoSpace+*/  
			

		}, 
		
		
		
		
		//highlightErrors 
		highlightErrors(){
		    let intro = "<p> See errors </p>";
			let finalText = '';
		    let  arrayX2 = this.userInput.split('\n');
			for(let j = 0; j < arrayX2.length; j++) {  
			    let resHighlight = arrayX2[j] /*->double spaces*/
	                .replace(/  +/g, "&nbsp;<span style='background:red;'> __ </span>&nbsp;") 
					.replace(/ \,+/g, "&nbsp;<span style='background:red;'> __, </span>&nbsp;") 
					.replace(/ \.+/g, "&nbsp;<span style='background:red;'> __. </span>&nbsp;") 
	                .replace(/\b(\w+)\s+\1\b/g, "&nbsp;<span style='background:red;'> \$1 \$1 </span>&nbsp;") /*dublicate*/
		            .replace(/\,\,+/g, "&nbsp;<span style='background:red;'> ,, </span>&nbsp;")               /*double,,*/
		            .replace(/\.\.+/g, "&nbsp;<span style='background:red;'> .. </span>&nbsp;")               /*double..*/

                   /*comma char no space(,word)*/  /*.replace(/\,(.)/g, " &nbsp;&nbsp;<span style='background:red;'>_ ,</span>&nbsp;")   */      
                   /*underscore_*/   
	               .replace(/_/gi, "&nbsp;<span style='background:red;'> _ </span>&nbsp;")         + "</br>";//!!!!problem here -> why not RegExp_commaNoSpaceChar  /*underscore Rex exp for misplaced ad pins*/
	   
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
        },
        
		//function to show/hide instructions
        instructions(){
		    this.instructionShowFlag = !this.instructionShowFlag; //switch state to change class.
        },
		
		//function set example
		setExample(){
		    this.userInput = "Lilly awoke  in an evening dress and opera cloak. \n In her hand were five playing cards. \n They were were, the queen  of spades, four of clubs, \n nine of clubs , three of hearts, nine of hearts.";
		},
		
		//function to switch CSS to show/hide detailed error list
		showDetailedErrors(){
		    this.showDetailedErrorsFlag  = !this.showDetailedErrorsFlag; //switch state to change class.
			this.showHighLightErrorsFlag = false; //always hide HighLighted Errors text
		},
		
		  
		//function to switch CSS to show/hide HighLighted Errors text
		showHighLightedErrors(){
		    this.showHighLightErrorsFlag = !this.showHighLightErrorsFlag; //switch state to change class.
			this.showDetailedErrorsFlag  = false; //always hide detailed error list
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
li {display: inline-block;margin: 0 10px;}
a {color: #42b983;}
.resultFinal{border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.hightLighted{border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.red{color: red;}
.margin-x   {margin-top: -2em; }
.errors-div {margin-top:2em;}
.cursor-x   {cursor:pointer;}

/* ---  Vue animation */

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
/* --- End  Vue animation */

</style>
