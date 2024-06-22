var buttonColor=["red","blue","green","yellow"];
var gamepattern=[];
var userpattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSq();
    started=true;
  }
});

function nextSq(){
  userpattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNo= Math.floor(Math.random()*4);
  var randomChooseColor= buttonColor[randomNo];
  gamepattern.push(randomChooseColor);

  $("#"+randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);
}

$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  userpattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userpattern.length-1);
});

function playSound(name) {
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamepattern[currentLevel]===userpattern[currentLevel]){
   console.log("right");
   if (gamepattern.length===userpattern.length){
   setTimeout(function () { nextSq();
   },1000);
 }
}
else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game over, Press any key to Restart");
  starover();
}

}

function starover(){
  level=0;
  started=false;
  gamepattern=[];
}
