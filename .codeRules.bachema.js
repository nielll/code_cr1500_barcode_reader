// codeRules.bachema.js
// Custom rules for code barcode scanner cr1500

// General use variables
codeXMLStart  = '\001Y\036an/'; //<SOH>Y<RS>an/
codeXMLStart1 = '\001Y\036be/'; //<SOH>Y<RS>be/
codeXMLStart2 = '\001Y\036bf/'; //<SOH>Y<RS>bf/
codeXMLEnd    = '\004';  

var rules_onDecodeAttempt  = null;
var rules_onDecodes        = null;
var rules_onConfigure      = null;

// replaces placeholder with control characters
// documentation: https://codecorp.com/storage/1099/d028868_cr1500_cr1100_cr2700_cr8x7x_cr5200_javascript_programming_guide_user_manual.pdf
// create barcodes to test: https://products.aspose.app/barcode/generate
// ............................................................
var rules_onDecode         = function(decode) {
	var plch_tab = "<TAB>";  	// Tabulator
	var plch_enter = "<CR>"; 	// Carriage Return

	var cc_tab = codeXMLStart + "/t" + codeXMLEnd;
	var cc_enter = codeXMLStart + "/n" + codeXMLEnd;

	decode.data = decode.data
		.replace(new RegExp(plch_tab, 'g'), cc_tab)
		.replace(new RegExp(plch_enter, 'g'), cc_enter);

	return decode;
};
// .............................................................

// EOF