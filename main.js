function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status:detecting object";
}
Status="";
objects=[];

function modelloaded(){
    console.log("modelLoaded");
    Status=true;
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
    image(video,0,0,380,380);
    if(Status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
     for(i=0 ;i<objects.length;i++){
        objectDetector.detect(video,gotResults);
         document.getElementById("status").innerHTML="status:object Detected";
document.getElementById("numberofobjects").innerHTML="number of objects detected are "+objects.length;
         fill(r,g,b);
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     }   
    }
}