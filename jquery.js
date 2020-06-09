var playing =false;
var score ;
var trialsleft;
var i;
var action ; //for interval
var fruits =['apple','banana','cherry','mango','orange','lemon','watermelon','strawberry'];
var step;
$(function()
 {
   //click on startreset button
    $("#startreset").click(function()
    {
                   //are we playing
                    if(playing==true)
                        {
                            //reload
                            location.reload();
                        }
                    else{
                         //no
                        
                        playing =true; //initialising game

                        //set score to 0
                        score =0;
                        $("#scorevalue").html(score);

                        //change start to reset
                        $("#startreset").html("Reset");

                        //show trials left box
                        $("#trials").show();
                        trialsleft = 3;
                        addhearts();

                        //hide gameover
                        $("#gameover").hide();

                        //create random fruit 
                        startAction();
                        //move fruit by 1 step
                        }
   }); 


//slice fruits
$("#fruit1").mouseover(function()
{
   score ++;
    $("#scorevalue").html(score);
    
    //sound 2 methods
    //document.getElementById("slicesound").play();
    
    $("#slicesound")[0].play();
    
    //stop fruit on slice
     clearInterval(action);
    
    //hide 
    $("#fruit1").hide("explode",500);
    
    //generate new fruit
    setTimeout(startAction,500);
});

function addhearts()
{
    $("#trials").empty();
    for(i=0;i<trialsleft;i++)
         {
             $("#trials").append('<img src="heart.png" class="life">');
         }   
}
    
function startAction()
{   //generate a fruit
    $("#fruit1").show();
    chooseFruit();
    
    //random position
    $("#fruit1").css({'left': (Math.floor(550*Math.random())) , 'top':-60});
    
    //random step
    step = 2 + Math.round(6 * Math.random());
    
    //falling of fruit
    action = setInterval(function(){
        $("#fruit1").css('top' , 
                         $("#fruit1").position().top + step);
        
                        //check if fruit is too low
                        if($("#fruit1").position().top > $("#fruitcontainer").height())
                            {
                                //check for trials left
                                if(trialsleft > 1)
                                    {
                                        trialsleft = trialsleft -1;
                                        //generate 
                                            $("#fruit1").show();
                                            chooseFruit();

                                            //random position
                                            $("#fruit1").css({'left': (Math.floor(550*Math.random())) , 'top':-60});

                                            //random step
                                            step =1 + Math.round(6 * Math.random());

                                        //addhearts
                                        addhearts();
                                    }
                                 else
                                    {
                                        playing = false ;
                                        $("#trials").hide();
                                        $("#gameover").show();
                                        $("#gameover").html('<p>GAME OVER !</p><p>YOUR SCORE IS '+  score  +'</p>')
                                        $("#startreset").html("Start Game");
                                        //stop dropping fruits
                                        stopAction();
                                    }
                                    
                            }
        
        
                        },10);
    
    }
    


function chooseFruit()
{    x=Math.round(7*Math.random());
    $("#fruit1").attr('src',fruits[x] +'.png');
}
 
//stop dropping fruit
function stopAction()
{
    clearInterval(action);
    $("#fruit1").hide();
}
            
});       
