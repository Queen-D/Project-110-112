var p1="";
var p2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takephoto()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IgkJ-Urnm/model.json',modelloaded);

function modelloaded()
{
 console.log('model is loaded');
}

function speak(){
    var synth=window.speechSynthesis;
    s1="The first Prediction is "+p1;
    s2="The second Prediction is "+p2;
    
    var utter=new SpeechSynthesisUtterance(s1+s2);
    synth.speak(utter);
}

function check(){
    img=document.getElementById("capture");
    classifier.classify(img,gotresult)
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
     
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        p1=results[0].label;
        p2=results[1].label;
        speak();

        if(results[0].label=="victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="rock and roll")
        {
            document.getElementById("update_emoji").innerHTML="&#129304;";
        }
        if(results[0].label=="thumbs up")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="nice")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }

        if(results[1].label=="victory")
        {
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
        if(results[1].label=="rock and roll")
        {
            document.getElementById("update_emoji2").innerHTML="&#129304;";
        }
        if(results[1].label=="thumbs up")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="nice")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
    }
}
