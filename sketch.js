var ball, database, ref, ballPosition;

function setup(){
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Create firebase db object
    database = firebase.database();

    //Create a reference to the db location where our data is
    ref = database.ref('ball/position');

    //Create a listener which listens for changes in the db values 
    ref.on("value", readPosition, showError)


}

function draw(){
    background("white");
   if(ballPosition){ 
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

function writePosition(x,y){
    database.ref('ball/position').set({
        x: ballPosition.x + x,
        y: ballPosition.y + y
    })
}

function readPosition(data){
    //Read the values of the x and y from the database
    ballPosition = data.val();

    ball.x = ballPosition.x;
    ball.y = ballPosition.y;   

}

function showError(){

}

/*
{Root
    ball: {
        position : {
            x: 200,
            y: 200
        }
    }
}

ball/position

Read data from the database
-----------------------------
.ref(), .on(), .val()


Write/update values to the database
------------------------------------
.ref(), .set() or .update()

*/