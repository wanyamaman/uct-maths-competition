/**********************************************
***				 table.js					***
*** 	  used in newstudents.html		    ***
*** does client-side validation of the form ***
**********************************************/
//edit button: switch to input mode
function show_input(id)
{
	$('#input'+id).show()	
	$('#show'+id).hide()
}

//confirmation dialogue for when you click 'Delete All' in views
function drop(type)
{
	if (del){
		return confirm('Are you sure you want to permanently delete all of your registered '+type+'s?')
	}
	else {return true}
}

/****************************************
*** ENABLE/DISABLE FORM SUBMIT BUTTON ***
*****************************************/
function disableElement(checkBox)
{
  var sbmt = document.getElementById("complete");				//submit button iD
  
  if (checkBox.checked)
	{sbmt.disabled = false;}		//enable
  else
	{sbmt.disabled = true;}			//disable
}

// [FIX NEEDED] allows second invigilator to not have an email address
function validateForm(doc)
{
  var individuals = document.getElementsByClassName('single');	//# of individual student first names
  var pairs = document.getElementsByClassName('double');		//# of paired students
  
  //prevent submission of empty forms
  if (blankForm())
	{return false;}
/**********************
*** EMAIL VALIDATION***
***********************/
  var mail = document.getElementsByClassName('mail');   // array of email fields
  var error= false;
  
  // highlight invalid email fields
  for (var i=0; i < mail.length; i++)
  {	var x=mail[i].value;				//email value
	
	//skip empty fields and validate others
    if (x == '')
    {  break;  }
    else
    {
		var atpos=x.indexOf('@');		// position of '@' symbol
		var dotpos=x.lastIndexOf('.');	//position of last period('.')
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
      {
		mail[i].style.background ='Yellow';	error =true;
      }
	  else
	  {
		mail[i].style.background = 'White';
	  }
    }
  }
  
  if (error)
  {
	window.scrollTo(100,400);
	alert("One or more email addresses seem to be invalid. Please verify your input.");
	return false;
  }
  
 /************************************
 *** NO# of INVIGILATORS VALIDATION **
 *************************************/ 
	var count =0;													// number of students
	
	// count the number of students	
	for (var j=0; j<individuals.length; j++){
		if (individuals[j].value != '')
		{ count++;}													//count by single students
	}
	
	for (var k=0; k<pairs.length; k++)
	{ count += pairs[k].options[pairs[k].selectedIndex].value*2; }	//count the pairs
	
	// prompt user to add invigilator
	if (count ==75 && enforceInvigilator()){
		return false; }
	// validate invigilator names
	if (!invigilatorCheck()){
		window.scrollTo(100;500);
		alert("Please provide correct invigilator information.");
		return false;
		} 
	
	
	
/***********************
*** ALL TESTS PASSED ***
************************/	
   return false;
}

function blankForm()
{
/********************************************************
*** 1. SAFARI BROWSER FIX: PREVENTS EMPTY SUBMISSIONS ***
*** 2. WARN USER WHEN NO STUDENTS ARE REGISTERED      ***
*********************************************************/
	// all the inputs within form
    var inputs = document.getElementsByTagName('input');
	var blank = false;
    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
                // found an empty field that is required
				inputs[i].style.background = 'Yellow';
				window.scrollTo(100,400);
				blank = true;
            }
			else {
			//found a highlighted field that is no longer empty
			inputs[i].style.background = 'White';
			}
        }
    }
	if (blank){
		alert("Please fill all required fields");
		return true;			// empty required fields found
	}
	else if(!blank)				// all required fields filled
		return false;
}

/*********************************************************
*** ENFORCE COMPULSORY 2nd INVIGILATOR FOR 75 STUDENTS ***
*********************************************************/
function enforceInvigilator()
{
	var invig = document.getElementsByClassName('invig');			// 10 invigilator (first name) fields 
	//check for 2nd invigilator
	if(invig[1].value =='')
	{
		invig[1].style.background = 'Yellow';
		window.scrollTo(100,500);
		alert("Reminder: A minimum of two invigilators are required for 75 students.");
		return true;	//enforcement needed	
	}
	// clear previously highlighted names
	invig[1].style.background = 'White';
	return false;	// enforcement not needed
}

/*************************************
*** VERIFY INVIGILATOR NAME FIELDS ***
**************************************/
function invigilatorCheck() {
	var iTable = document.getElementById('invigTable');
	var secnd = iTable.rows(2);
// work in progress	
}
/*
function phoneCheck(){
// phone number validation
}
*/

