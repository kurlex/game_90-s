var gamePattern =[];
var userClickedPattern=[];
var buttonColors = ["red", "blue", "green", "yellow"];
var level=-1;
var i=0;
$(document).keydown(function(event){
  if(((event.key=="a")||(event.key=="A"))&& gamePattern.length==0)
  { $(".answer").css("display","none");
    $(".tips").fadeOut(1000);
    nextSequence();
  }
  else if(gamePattern.length!==0)
  {
   switch(event.key)
   {
     case "7":playing("green");
     break;
     case "9":playing("red");
     break;
     case "3":playing("blue");
     break;
     case "1":playing("yellow");
     break;
   }
  }
})

//----------------------------------------

function checkAnswer(){
if(gamePattern[i]!==userClickedPattern[i])
{
  end(gamePattern[i]);
  return false;
}
return true;
}
//----------------------------------------

function end(colo){
$(".answer div").removeClass();
  $(".answer div").addClass("btna "+colo);
  switch(colo)
  {
    case "red": $(".answer .num").text("9");
    break;
    case "green":$(".answer .num").text("7");
    break;
    case "blue":$(".answer .num").text("3");
    break;
    case "yellow":$(".answer .num").text("1");
    break;
  }
  playSound("wrong");
  $("body").addClass("game-over").fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  setTimeout(function () {
      $("body").removeClass("game-over");
      $(".answer").fadeIn(1000);
  }, 1500);
  level=-1;
  gamePattern=[];
  $("#level-title").html("Oopss, Wrong Button ! </br> Press A Key to Restart");
}

//----------------------------------------

function nextSequence(){
  level++;
  i=0;
  $("#level-title").text("Level "+level);
  if(level===10)
  {
    redirect();
  }
  else
  {
  var randomChosenColour =  Math.floor(Math.random()*4);
  gamePattern.push(buttonColors[randomChosenColour]);

  $("#"+buttonColors[randomChosenColour]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomChosenColour]);
  userClickedPattern=[];
}
}

//----------------------------------------

function playSound(name){
  var colorSound= new Audio("sounds/"+name+".mp3");
  colorSound.play();
}

//---------------------------------------

$(".btn").click(function(){
  var userChosenColour =this.id;
 playing(userChosenColour);
})

//---------------------------------------

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
$("#"+currentColor+"1").addClass("pressed_key");
setTimeout(function () {
  $("#"+currentColor).removeClass("pressed");
  $("#"+currentColor+"1").removeClass("pressed_key");
}, 100);
}
//----------------------------------------
function playing(col){
  userClickedPattern.push(col);
  playSound(col);
  animatePress(col);
  if(checkAnswer()&&i==(gamePattern.length-1))
  {
    playSound("levelUp");
    $("#level-title").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    setTimeout(function () {

      nextSequence();
    }, 1000);
  }
  i++;
}
//----------------------------------------

function redirect()
{
  $("#level-title").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  $(".container").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
 playSound("win");
  setTimeout(function () {
    window.location.replace("winning.html");
  }, 3000);
}
