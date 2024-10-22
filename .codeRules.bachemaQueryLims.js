// codeRules.bachema.js
// Custom rules for code barcode scanner cr1500

// General use variables
codeXMLStart  = '\001Y\036an/'; //<SOH>Y<RS>an/
codeXMLStart1 = '\001Y\036be/'; //<SOH>Y<RS>be/
codeXMLStart2 = '\001Y\036bf/'; //<SOH>Y<RS>bf/
codeXMLEnd    = '\004';  
var cc_tab = codeXMLStart + "/t" + codeXMLEnd;
var cc_enter = codeXMLStart + "/n" + codeXMLEnd;
var cc_sleep = codeXMLStart + "/," + codeXMLEnd;
var cc_f7 = codeXMLStart + "/f7" + codeXMLEnd;
var cc_f10 = codeXMLStart + "/f10" + codeXMLEnd;
var cc_f12 = codeXMLStart + "/f12" + codeXMLEnd;
var cc_rStart = codeXMLStart + "/k071600000000" + codeXMLEnd;
var cc_rEnd = codeXMLStart + "/k070800000000" + codeXMLEnd;
var cc_ctrlF10 = codeXMLStart + "/k014300000000" + codeXMLEnd;
var cc_ctrlA = codeXMLStart + "/k010400000000" + codeXMLEnd;
var cc_del = codeXMLStart + "/k012A00000000" + codeXMLEnd;

var rules_onDecodeAttempt  = null;
var rules_onDecodes        = null;
var rules_onConfigure      = null;

// replaces placeholder with control characters
// documentation: https://codecorp.com/storage/1099/d028868_cr1500_cr1100_cr2700_cr8x7x_cr5200_javascript_programming_guide_user_manual.pdf
// create barcodes to test: https://products.aspose.app/barcode/generate
// ............................................................
var rules_onDecode         = function(decode) {
	var plch_list_keycodes = "<listkeycodes>";
	var plch_tab = "<tab rep=\\d+>|<tab>";  	// Tabulator
	var plch_enter = "<cr rep=\\d+>|<cr>"; 	// Carriage Return
	var plch_sleep = "<sleep rep=\\d+>|<sleep>"; // sleep
	var plch_f7 = "<f7>";
	var plch_f12 = "<f12>";
	var plch_and = "<and>";
	var plch_fn = "</\\w+>";

	// this is written in the docs about modifier key:
	//USB scan codes provide for "modifiers"; that is, an indication of whether or not the Ctrl, Shift, Alt, AltGr
	//and/or Meta/GUI (e.g., "Windows") keys are pressed at the same time a normal key is pressed, thus
	//"modifying" the key's keystroke. For example, to send just the "a" character using scan codes requires
	//sending the scan code for the "a" key (0x04) with no modifier (0x00); however, to send the "A" character
	//requires sending the "a" key's scan code with a "Shift" modifier (0x02 (left Shift) or 0x20 (right Shift)).

	//The CodeXML syntax for sending scan codes is the CodeXML header, followed by "/k", followed by two 2-
	//digit hexadecimal values indicating the modifier(s) and key scan codes, respectively.

	//Key Modifier
	//Left Ctrl 0x01
	//Left Shift 0x02
	//Left Alt 0x04
	//Left Meta/GUI 0x08
	//Right Ctrl 0x10
	//Right Shift 0x20
	//Right Alt (AltGr) 0x40
	//Right Meta/GUI 0x80

	// in order to send a modifier key, we do /k + "02" + "04" + "00000000" (8 byte 0 in order to release the key scan codes)

	var regexProbeEtiketten = /\d+_\d+_r\d+/;
	var regexAuftrag = /ib16106_\d+_\d+.\d+.\d+/;
	
	if (regexProbeEtiketten.test(decode.data)) {
		var d = decode.data.split('_');
		decode.data = cc_ctrlF10 + "BarcodeScanner Proben laden" + cc_enter + "<sleep rep=1>" + d[0] + cc_tab + cc_tab + d[1] + cc_tab + cc_enter + "<sleep rep=1>" + cc_ctrlF10 + cc_del;
	}

	if (regexAuftrag.test(decode.data)) {
		var d = decode.data.split('_');
		decode.data = cc_ctrlF10 + "BarcodeScanner Proben laden" + cc_enter + "<sleep rep=1>" + cc_tab + d[1] + cc_tab + cc_tab + cc_enter + "<sleep rep=1>" + cc_ctrlF10 + cc_del;
	}

	try {
		decode.data = decode.data
			.replace(new RegExp(plch_enter, 'g'), function(match) {
				var num = 1;
				if (match.indexOf('rep=') !== -1) {
					num = parseInt(match.split('rep=')[1], 10);
				}

				var result = '';
				for (var i = 0; i < num; i++) {
					result += cc_enter;
				}
				return result;
			})
			.replace(new RegExp(plch_tab, 'g'), function(match) {
				var num = 1;
				if (match.indexOf('rep=') !== -1) {
					num = parseInt(match.split('rep=')[1], 10);
				}

				var result = '';
				for (var i = 0; i < num; i++) {
					result += cc_tab;
				}
				return result;
			})
			.replace(new RegExp(plch_sleep, 'g'), function(match) {
				var num = 1;
				if (match.indexOf('rep=') !== -1) {
					num = parseInt(match.split('rep=')[1], 10);
				}

				var result = '';
				for (var i = 0; i < num; i++) {
					result += cc_sleep;
				}
				return result;
			})
			.replace(new RegExp(plch_f7, 'g'), cc_f7)
			.replace(new RegExp(plch_f12, 'g'), cc_f12)
			//.replace(new RegExp(plch_and, 'g'), cc_and)
			.replace(new RegExp(plch_fn, 'g'), function(match) {
				return match
					.replace('<', codeXMLStart)
					.replace('>', '00000000' + codeXMLEnd); // 8 bytes of ‘0’ representing a key release
			});
	
		return decode;
	} catch(e) {
		decode.data = e.message;
		return decode;
	}

};

// .............................................................

// EOF
