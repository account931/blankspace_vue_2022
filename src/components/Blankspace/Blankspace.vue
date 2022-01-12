<template>
    <div class="col-sm-12 col-xs-12">
	
	    <div id="headX" class="jumbotron text-center" style =' background-color: #2ba6cb;'> <!--#2ba6cb;-->
            <h1 id="h1Text"> <span id="textChange"> Double blankspace removal</span> <span class="glyphicon glyphicon glyphicon-link myclip"></span>  </h1>
            <p class="header_p">finds, highlights and fixes all double blankspaces, consecutive duplicates and more</p> 
        </div>




        <div class="item contact padding-top-0 padding-bottom-0" id="contact1">
            <div class="wrapper grey">
    		    <div class="container">

                <p> Delete:{{ this.fixedUserInput }} </p>
				
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
                    <!--<button id="cr_footer" type="button" class="btn btn-success btn-embossed btn-lg btn-wide">CR Footer</button>-->
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



					
					
			    <!-------------------------------- RESULTS SECTION (fixed text) ----------------------------------------->
			    </br></br>
			    <div class="col-md-8"  id="resultFinal" style="margin-top:33px;">   
				    {{ this.fixedUserInput }}
				</div> 
				</br></br></br>
				<!--------------------------------- END RESULTS SECTION (fixed text)-------------------------------------->
					
    		                          


                <!--------------------------------- SECTION "Show errors" ------------------------------------------------>
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
			    <?php  echo date("Y"); ?>
		    </div>
		    <!-- END Footer ---->
				
				
    	
        </div> <!-- /.item -->
			
    </div>	
</template>

<script>
export default {
    name: 'Blankspace',
    data () {
        return {
            msg           : 'Welcome to Blankspace App',
			userInput     : '', //textarea input
			fixedUserInput: '', //fixed/corrected textarea input
			instructionShowFlag: false,
			
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
		proccessTextCore(e){
		    //regExp to use
		    let doubleSpaces     = /\s\s+/g;           /*double spaces*   //new RegExp(/\s\s+/, "g");   
			let spaceComma       = / \,+/g;            /*space+comma*/
			//let spaceDot       = / \.+/g;            /*space+dot*/
			//let wordsDuplicate = /\b(\w+)\s+\1\b/g;  /*word duplicate*/
			//End regExp to use
			
			
		    //alert("OK");
			this.instructionShowFlag = false; //hide if shown
			this.fixedUserInput = ""; //clear prev if any
			
			let  arrayX2 = this.userInput.split('\n');
			
			for(let j = 0; j < arrayX2.length; j++) {  

                let tempTextLine = arrayX2[j]
	               .replace(doubleSpaces, ' ' )       //.replace( /\s\s+/g, ' ' )            /*double spaces*/
			       .replace(/ \,+/g, ',' )  //.replace(spaceComma, ',' )         //.replace( / \,+/g, ',' )             /*space+comma*/
			       //.replace(spaceDot, '.' )           //.replace( / \.+/g, '.' )             /*space+dot*/
			       //.replace(wordsDuplicate, '\$1' )   //.replace( /\b(\w+)\s+\1\b/g, '\$1' ) /*word duplicate*/
			    /*double commas ,,*/ .replace( /\,\,+/g, ',' )
			    /*double dots ..*/ .replace( /\.\.+/g, '.' ) /*comma followed by char no space!!!!PROBLEM HERE*/  /*.replace(/\,(.)/g, ', \$1' )*/       
			    /*underscore _*/ /* .replace( RegExp_underscore , ' ' )  */    +
			    '</br>'; 
 
  
            this.fixedUserInput = this.fixedUserInput  + tempTextLine ;
            } //end for
        },


        /*
        |--------------------------------------------------------------------------
        | If user clicks "Clear"
        |--------------------------------------------------------------------------
        |
        |
        */		
		clear(){
		    this.userInput      = "";
			this.fixedUserInput = "";
        },

        instructions(){
		    this.instructionShowFlag = !this.instructionShowFlag; //switch state to change class.
        },
		
		setExample(){
		    this.userInput = "Lilly awoke  in an evening dress and opera cloak. \n In her hand were five playing cards. \n They were were, the queen  of spades, four of clubs, \n nine of clubs , three of hearts, nine of hearts.";
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
