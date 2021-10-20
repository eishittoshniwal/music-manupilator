leftwristx=0
leftwristy=0
rightwristx=0
rightwristy=0
leftwristscore=0
rightwristscore=0
song1_status=""
song2_status=""


function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide()
     poseNet=ml5.poseNet(video,modelloaded)
     poseNet.on('pose',gotresult)
}



song =""
song2=""
function preload() {
   song= loadSound("music.mp3")
   song2= loadSound("music2.mp3")
}

function play() {
    song.play()
}

 function stop(){
     song.stop()
     song2.stop()
 }
 function draw(){
    image(video,0,0,500,500)
    fill("red")
    stroke("red")
    song1_status=song.isPlaying()
    song2_status=song2.isPlaying()
    if (leftwristscore>0.2) {
       circle(leftwristx-100,leftwristy,20)
       song.stop()
       if (song2_status==false) {
        song2.play()
        document.getElementById("song").innerHTML="playing: Peter Pan song"
       }
        
    }

    if(rightwristscore>0.2){
           circle(rightwristx,rightwristy,20)
            song2.stop()
            if (song1_status==false) {
             song.play()
             document.getElementById("song").innerHTML="playing: Harry Potter song"
}
 }
}

function modelloaded(){
    console.log("model has been loaded")
}

function gotresult(result){
   if(result.length>0){
    console.log(result)
    leftwristx=result[0].pose.leftWrist.x
    rightwristx=result[0].pose.rightWrist.x
    leftwristy=result[0].pose.leftWrist.y
   rightwristy=result[0].pose.rightWrist.y
   leftwristscore=result[0].pose.keypoints[9].score
   rightwristscore=result[0].pose.keypoints[10].score
   }
   
 
}