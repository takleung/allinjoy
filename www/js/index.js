/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
         
        if (device.platform.toUpperCase() == "ANDROID"){
            navigator.googlefit.connect(function() {
                console.info('Connected successfully!');
                document.getElementById("connection_status").innerHTML = "Connected successfully! "+device.platform.toUpperCase();

            }, function() {
                console.warn('Connection failed:', error);
                document.getElementById("connection_status").innerHTML = "Connected Error!!"+device.platform.toUpperCase();

            });

        }else {
            //Run IOS!
            window.plugins.healthkit.available(
                function(success){
                document.getElementById("connection_status").innerHTML = "Connected successfully!"+device.platform.toUpperCase();

                }, function(error){
                document.getElementById("connection_status").innerHTML = "Connected Error!!"+device.platform.toUpperCase();
                
                }
            );
        }

        var push = PushNotification.init({
        android: {
            senderID: "872361404133"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
        });

        push.on('registration', function(data) {
          $.ajax({
          type: 'POST',
          url: contextRoot+'/reg_device.php',
          data: { 
              'deviceToken': data.registrationId,
              'deviceType' : device.platform.toUpperCase(),
              'userId':userName
          },
          success: function(msg) {
              if (msg == 1){

              }else{
                alert("Device Registration Fail!!");

              }

          }
        });


        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            // e.message
        });






    }
};


