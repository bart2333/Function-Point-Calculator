/* Team Avengers 
 * Cost Calculator page
 * Last edited: Bart Kulus 1/30/22
 * 
 */ 
 
 /* global variables */
 var languages = [65, 75, 50, 70, 70];
 var weights = [[3,4,6],
				[4,5,7],
				[3,4,6],
				[5,7,10],
				[7,10,15]];
var rate = 0;
var expo = 0;
var tafp = 0;
var tlc = 0;
var PM = 0;
var months = 0;
var persons = 0;
var personCost = 0;
var LOC = 0;
 
function calculateTAFP() {  // calculateTAFP() calculates the total adjusted function point 
	var x = 0;
	var ufp = 0;
	var caf = 0;
	var fi = 0;
	var current = 0; 
	var spot = 0;
	for (var i = 0; i < 5; i++) { // adds up all the low/medium/high values (UFP)
		for (var j = 0; j < 3; j++) {
			current = Number(document.getElementById("P" + (j+x)).value);
			spot = weights[i][j];
			ufp += (current*spot);
		}
		x+= 3;
	}
	for (var i = 1; i < 15; i++) {
		var current1 = Number(document.getElementById("Q" + i).value);
		fi += current1;
	}
	caf = (0.65 + (.01*fi));	 //CAF = 0.65 + (0.01 * TOTAL Fi)
	tafp = ufp * caf;
	return tafp;
}
	
function calculateLines() {   // this function calculates the TOTAL LINES of CODE 
	LOC = Number(document.getElementById("LOC").value);
	tlc = tafp * LOC;
	return tlc;

}
function person_months() {    // this function calculates the person-months(PM)needed for a project
	PM = (1.4*(tlc/1000));
	return PM;
}

//Dr.M: I changed the formula and left a comment in this section
function calculateMonths() {  // this function calculates the months needed for a project 
	m = 3.0*PM;
	expo = eval(document.getElementById("exponent1").value);
	months = Math.pow(m, (expo)); // It is PM^1/3 and not PM*1/3 -- I checked the COCOMO model
	//this value of 1/3 can change depending on the project, so it will be helpful to have a field, but for this project this is ok to hardcode.
	//months = ((3.0*PM)*(1/3));
	return months;
}

//Dr. M - flipped the numerator/denominator in the formula
function calculatePersons() {      // this function calculates the # of people needed for a project 
	//persons = (months/PM);
	persons = (PM/months);  // should be othe rway round -- PM is always greater than months.
	return persons;	
}
//Dr.M --- I left a comment in this function
function personnelCost() {    // calculates the personnel cost of the project 
	rate = Number(document.getElementById("hourlyRate").value);
	personCost = (persons * rate); 
	//It will be useful if I can change the hourly rate based on inflation etc. 250 is the rate of an average seasoned software developer.
	//So if you can have a field to take the hourly rate as a variable that will be very helpful moving forward. 
	return personCost;	
}
	
function inputTotals(evt) { // calculates the totals and outputs to the screen
calculateTAFP();
calculateLines();
person_months();
calculateMonths();
calculatePersons();
personnelCost();
document.getElementById("tafp1").textContent = tafp;
document.getElementById("code").textContent = tlc;
document.getElementById("personMonths").textContent = PM;
document.getElementById("months").textContent = months;
document.getElementById("persons").textContent = persons;
document.getElementById("personnelCost").textContent = personCost;
event.preventDefault();		
	
}	
 function resetPage() { // resets the page 
	resetValues();
	eventListeners();
 }
function resetValues() {
for (var i = 1; i < 15; i++) {
		var current1 = Number(document.getElementById("Q" + i).value);
		current1 = "";
	} 
for (var i = 1; i < 15; i++) {
		var current1 = Number(document.getElementById("P" + i).value);
		current1 = "";
	} 
document.getElementById("reason").textcontent ="";
document.getElementById("tafp1").textContent = "";
document.getElementById("code").textContent = "";
document.getElementById("personMonths").textContent = "";
document.getElementById("months").textContent = "";
document.getElementById("persons").textContent = "";
document.getElementById("personnelCost").textContent = "";	
}


function eventListeners() { // Listens for changes in the program 
	var checkForm = document.getElementsByTagName("form")[0];
	if (checkForm.addEventListener) {
		checkForm.addEventListener("submit", inputTotals, false);	
	} else if (checkForm.attachEvent) {
		checkForm.attachEvent("submit", inputTotals);
	}
}
 
 if (window.addEventListener) {
	window.addEventListener("load", resetPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", resetPage);
}
 
 