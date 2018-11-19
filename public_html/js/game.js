/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var img_joyeux;
var nb_visage_find = 0;
var milisec = 0;
var imageList;
var tmpt = 0;

timeList = new Array();

function setChrono(){
    var timeText = $("#chrono").text();
    var timeTextSplit = timeText.split(":");
    var hour, mins, secs;
 
    hour=Number(timeTextSplit[1]);
    mins=Number(timeTextSplit[2]);
    secs=Number(timeTextSplit[3]);
    secs++;
    milisec = milisec + 1000;
        if (secs===60){
            secs = 0;
            mins=mins + 1;
           } 
        if (mins===60){
            mins=0;
            hour=hour + 1;
           }
        if (hour===13){
              hour=1;
           }

    $("#chrono").html("<strong>TEMPS:</strong> " + placeZero(hour) +":" + placeZero(mins) + ":" + placeZero(secs));
}

function placeZero(nb){
    var res = nb + '';
    if (nb < 10) {
        res = "0" + res;
    }
    return res;
}

function getImageJoyeux(list) {
    var tmp = Math.floor(Math.random() * 24);
    
    list[tmp] = "images/joyeux/" + (Math.floor(Math.random() * 600) + 1) + ".jpg";
    
    img_joyeux = tmp;
    
    return (list);
}

function checkImageDiff(list) {
    var i = 0;
    var a = 0;
    
    while (a < list.length){
        while (i < list.length){
            if ((list[i] === list[a]) && (i !== a)){
                return (false);
            }
            i++;
        }
        i = 0;
        a++;
    }
    return (true);
}

function getImagesTristes(list){
    var i = 0;
    
    while (i < 25) {
        list[i] = "images/tristes/" + (Math.floor(Math.random() * 603) + 1) + ".jpg";
        i = i + 1;
    }
    if (checkImageDiff(list) === false)
        getImagesTristes(list);
    return (list);
}

function restart(){
   nb_visage_find = 0;
   $('#score').html('<strong>SCORE:</strong> ' + 0);
   $('#zone_image').empty();
   $('#chrono').html("<strong>TEMPS:</strong> 00:00:00");
   $('#taverage').html("<strong>MOYENNE:</strong> 00:00:00");
   milisec = 0;
   timeList = [];
   preloadPicture();
}

function timeAverage(list){
    var res = 0;
    var i = 0;
    var min = 0;
    var sec = 0;
    var hours = 0;
    
    for (i in list){
        res = res + list[i];
    }
    res = parseInt(res / nb_visage_find);
    sec = parseInt((res/1000)%60);
    min = parseInt((sec/60)%60);
    hours = parseInt(min/60);
    $('#taverage').html("<strong>MOYENNE:</strong> " + placeZero(hours) + ":" + placeZero(min) + ":" + placeZero(sec));
}

function updateScore(){
    
    var tmpTime = 0;
    
    $('#score').html('<strong>SCORE:</strong> ' + nb_visage_find);
    if (timeList.length >= 1){
        console.log(timeList.length);
        tmpTime = milisec - tmpt;
        tmpt = milisec;
        console.log(tmpTime);
        timeList.push(tmpTime);
        timeAverage(timeList);
    }
    else{
        timeList.push(milisec);
    }
}

function playBadSong(){
    var sound = document.getElementById("badbeep");
    sound.play();
}

function playGoodSong(){
    var sound = document.getElementById("goodbeep");
    sound.play();
}

function preloadPicture() {
    var i = 0;
    imageFace = new Image();
    imageList = new Array();
   
    imageList = getImagesTristes(imageList);
    imageList = getImageJoyeux(imageList);
    
    var a = 0;
    var count = 0;
    for (a = 0; a < imageList.length; a++) {
        if (count === 5){
            $('#zone_image').append('<br />');
            count = 0;
        }      
        var img = $('<img/>');        
        if (a !== img_joyeux){
            img.attr("id", "images")
                .click(function (){
                    playBadSong();
                    console.log($(this).attr('src'));
                    $(this).css("opacity", "0.3");
                });
        }
        else{
            img.attr("id", "images")
                .click(function () {
                   playGoodSong(); 
                   $('#zone_image').empty();
                   preloadPicture();
                   nb_visage_find++;
                   updateScore();
                });
        }
        img.attr("src", imageList[a])
           .attr("hspace", "2");
        $("#zone_image").append(img);
        count++;
    }
}