status = "";
object = [];
synth = window.speechSynthesis;
utterThis = new SpeechSynthesisUtterance(inputbox.value);

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
    document.getElementById("inputbox").value;
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
}

function gotResult(error,results){
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    if(object = inputbox){
       variable_name_holds_WebcamLiveView.stop();
       objectDetector.detect(gotResult);
       document.getElementById("status").innerHTML = inputbox.value + " found";
       synth = window.speechSynthesis;
       utterThis = new SpeechSynthesisUtterance(inputbox.value);
       synth.speak("utterThis");
    }
    else{
        document.getElementById("status").innerHTML = inputbox.value + " not found";
    }
}