// (c) 2014 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton */
/* global detailPage, buttonState, closeButton */
/* global rfduino  */
/* jshint browser: true , devel: true*/
'use strict';




var arrayBufferToInt = function (ab) {
    var a = new Uint8Array(ab);
    return a[0];
};

var app = {
initialize: function() {
    this.bindEvents();
    detailPage.hidden = true;
},
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    refreshButton.addEventListener('touchstart', this.refreshDeviceList, false);
    closeButton.addEventListener('touchstart', this.disconnect, false);
    deviceList.addEventListener('touchstart', this.connect, false); // assume not scrolling
    motorOne.addEventListener('touchstart', this.onData, false);
    motorTwo.addEventListener('touchstart', this.onData, false);
    // TODO: add touchend event to make motor run only as long as my finger is on it?
    // http://www.sencha.com/forum/showthread.php?239799-Need-to-add-touchstart-and-touchend-event-for-button
    /*    motorOne.addEventListener('touchstart', 
        function(){
         this.onData;
         alert(this);
        },
        false);
    motorTwo.addEventListener('touchstart', 
        function(){
         this.onData;
         alert(this);
        },
        false);*/
},




onDeviceReady: function() {
    app.refreshDeviceList();
},
refreshDeviceList: function() {
    deviceList.innerHTML = ''; // empties the list
    rfduino.discover(5, app.onDiscoverDevice, app.onError);
},
onDiscoverDevice: function(device) {
    var listItem = document.createElement('li'),
    html = '<b>' + device.name + '</b><br/>' +
    'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
    'Advertising: ' + device.advertising + '<br/>' +
    device.uuid;
    
    listItem.setAttribute('uuid', device.uuid);
    listItem.innerHTML = html;
    deviceList.appendChild(listItem);
},
connect: function(e) {
    var uuid = e.target.getAttribute('uuid'),
    onConnect = function() {
        rfduino.onData(app.onData, app.onError);
        app.showDetailPage();
    };
    
    rfduino.connect(uuid, onConnect, app.onError);
},
onData: function(data) {
    var buttonValue = arrayBufferToInt(data);
    if (buttonValue === 1) {
        buttonState.innerHTML = "On";
    } else {
        buttonState.innerHTML = "Off";
    }
    // var btnValue = document.getElementById('motorSpeed').value;
    // rfduino.write(btnValue, app.writeSuccess, app.onError);
    
   if(this.value == '1'){
    this.className = this.className + " testing";
    rfduino.write('1', app.writeSuccess, app.onError);
   }
  if(this.value == '2'){
    rfduino.write('2', app.writeSuccess, app.onError);
   }
/*    if(this.value == '3'){
    rfduino.write('3', app.writeSuccess, app.onError);
   }
   if(this.value == '4'){
    rfduino.write('4', app.writeSuccess, app.onError);
   }
   if(this.value == '5'){
    rfduino.write('5', app.writeSuccess, app.onError);
   }
   if(this.value == '6'){
    rfduino.write('6', app.writeSuccess, app.onError);
   }
   if(this.value == '7'){
    rfduino.write('7', app.writeSuccess, app.onError);
   }
   if(this.value == '8'){
    rfduino.write('8', app.writeSuccess, app.onError);
   }
   if(this.value == '9'){
    rfduino.write('9', app.writeSuccess, app.onError);
   }*/
},
disconnect: function() {
    rfduino.disconnect(app.showMainPage, app.onError);
},
showMainPage: function() {
    mainPage.hidden = false;
    detailPage.hidden = true;
},
showDetailPage: function() {
    mainPage.hidden = true;
    detailPage.hidden = false;
},
onError: function(reason) {
    alert(reason); // real apps should use notification.alert
},
writeSuccess: function(reason){
    // alert("you've sent info " + reason);
// alert(JSON.stringify(data, null, 4));
// alert("testing: " + reason);

}
};
