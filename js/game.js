class Game{
    constructor(){

    }

    display(){

    }

    quesRound(){

        ques=new Form();
        ques.Fques();

    }

    log(){

        form=new Form();
        form.log();

    }

    start(){

        broom1=createSprite(200,300);
        broom2=createSprite(200,500);

        broom1.addImage(aldrichImg);
        broom2.addImage(ronaldImg);

        broom1.scale=0.5;
        broom2.scale=0.5;

        brooms=[broom1,broom2];

        obstaclesGroup=new Group();

        player.y=0
        player.update();

    }

    play(){
        //var index;

        form.hide();
        ques.hide();
        Player.getPlayerInfo();
        player.getRank();

        var y=100;
        var yHeight=displayHeight-350;
        var index;

        if(allPlayers!==undefined){
            image(raceImg,displayHeight,0,displayWidth*7,displayHeight/1.15);
            index=0;
            var yPos=200;
            textSize(15);
            var distance=0;
            var xVal=300;

            for(var i in allPlayers){
                index+=1;
                distance=displayHeight+allPlayers[i].distance;
                xVal+=200
                brooms[index-1].x=distance;
                //brooms[index-1].y=xVal;


                y = yHeight-allPlayers[i].y;

                brooms[index - 1].y = y;
                

               // console.log(brooms[index-1].y+'k');


                if(player.index==index){
                    brooms[index-1].shapeColor="white";
                    fill("white");
                    ellipse(brooms[index-1].x,brooms[index-1].y,150);
                    camera.position.x=brooms[index-1].x;
                    camera.position.y=brooms[index-1].y;

                }
                if(i==="player"+player.index){
                    fill("red");

                }else{
                    fill("black")
                }

                if(broom1.isTouching(obstaclesGroup)){

                    obstaclesGroup.destroyEach();
                    broom1.x=200;
                    broom1.y=300;
                    player.distance=0;
                    player.updateBroomDis();
                    
                  }

                text(allPlayers[i].name+"  :  "+allPlayers[i].distance,200,yPos);
                yPos+=20;
            }

            

        }

        if(keyIsDown(RIGHT_ARROW)&&player.index!==null){
            player.distance+=30;
            player.updatePlayerDetails();
            //console.log(player.distance);
        }

        if(keyDown(UP_ARROW)&&player.index!==null){
            player.y+=50;
            player.update();
        }

        if(keyDown(DOWN_ARROW)&&player.index!==null){
            player.y -= 50
            player.update();
           // console.log(brooms[player.index-1].x);
        }

        if(frameCount%20==0){
            var obstacle=createSprite(11200, Math.round(random(-100, 1000)), 100, 7);  
            obstacle.velocityX=-20;
            obstacle.shapeColor="red";
            obstacle.lifeTime=2000;
            obstacle.addImage(obstacleImg);
            obstacle.scale=0.5;
            obstacle.setCollider("rectangle",0,5,100, 180);
           // console.log("obstacle")
            
            obstaclesGroup.add(obstacle);
            
          }

          if(keyDown('space')&&player.index!==null&&player.index==1){

            player.distance+=50;
            player.updateBroomDis();

          }

         //console.log(brooms[index-1])



        if(player.distance>4200){
            player.rank+=1;
            Player.updateRank(player.rank);
            gameState=3;
            game.updateGameState(3);
        }

        drawSprites();

    }

    end(){

    }

//Following is for getting and saving gameState;

    getGameState(){

        var databaseRef=database.ref("gameState");
        databaseRef.on("value",function(data){
            gameState=data.val();
        })
    }


    updateGameState(state){

        database.ref("/").update({
            'gameState':state
        })

    }

//Following is for getting and saving player Count
    getPlayerCount(){

        var databaseRef=database.ref("playerCount");
        databaseRef.on("value",function(data){
            playerCount=data.val();
        })
    }


    updatePlayerCount(count){

        database.ref("/").update({
            'playerCount':count
        })

    }

    //Initialising database
    setData(){

        database.ref("/").set({
            'gameState':0,
            'playerCount':0
        })

    }
}