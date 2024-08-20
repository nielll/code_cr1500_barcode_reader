### Setup CODE CR1500 barcode reader
The script within this project enables the usage of control chars to navigate within a software. The script executed on the reader will check for placeholders as `<TAB>` or `<CR>` and replaces them with corresponding control chars.
The script can be extended to support further control keys or logic.

1. Preparation: Install and download
    - download firmware: https://codecorp.com/storage/1440/d030516_cr1500_c011357_1_7_1_cr1500_firmware_2ad0_firmware.zip
    - unzip
    - download and install cortextools3: https://codecorp.com/storage/1910/d042182_cortextools3_v2_0_14_0.zip

2. Reader Reset
	To reset and reach Boot-Mode: 
    - unplug from computer
    - reader press button while plugin scanner to computer
    - hold button until beeping and fibration is finished, approx 5 sec.
    - the reader is now blinking with a green light

3. Firmware installation on Scanner within Boot-Mode
    - open cortextools3
    - connect over USB-HID Modus with software
    - install newest firmware by clicking 'dateien durchsuchen' on home tab and press 'herunterladen'
    - firmware will be downloaded and installed on the scanner itself

4. Download .codeRules.bachema.js to scanner
    - make sure scanner is connected with software over USB-HID Mode
	- got to tab 'Leser' in cortextools3
	- click 'Dateien durchsuchen' and chose the .codeRules.bachema.js file and click 'herunterladen'
	- go to tab 'Frtgschrittn'
	- press 'Neustart' to load new settings
	- barcode reader will restart
	- Popup -> USB-HID Modus to 'Nein' to test barcode reader

5. Do further configurations with reading barcodes eg. setting Keyboard Language Settings
    - https://codecorp.com/storage/690/d036886-cr1500--configuration-guide.pdf
	
6. Acknowledge
    - product website: https://codecorp.com/products/code-reader-1500
    - Keyboard Support: German-Swiss Keyboard Mapping for Windows ![image](https://github.com/user-attachments/assets/41024b4f-3273-4224-901c-7c0aaa5acdfc)
    - Beep off / Vibration on: ![image](https://github.com/user-attachments/assets/56a1d014-d358-492e-b9f3-c1eee396e58d)
    - Swiss German Scancodes: [https://www.codemercs.com/downloads/keywarrior/KeyWarriorScancodeTables.pdf](https://www.codemercs.com/downloads/keywarrior/KeyWarriorScancodeTables.pdf)
