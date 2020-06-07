var canvas;
var ctx;

var targetDT = 1/60;
var globalDT;
var time = 0,
    FPS  = 0,
    acumDelta = 0,
    contadorTime = 0,
    frames = 0;

//variable que recoge la escena que debería estar reproduciendose
var actualScene = null;

window.requestAnimationFrame = (function (evt){
    return window.requestAnimationFrame || 
        window.mozRequestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, targetDT * 1000);
        };
}) ();

window.onload = BodyLoaded;

//recoge todas las imágenes y las carga
var graphicAssets = {

    background: {
        path: "assets/Battleground.png",
        image: null
    },

    player: {
        path: "assets/pangvPhotoshopBueno.png",
        image: null
    },

    bullet: {
        path: "assets/bullet.png",
        image: null
    },

    bubble: {
        path: "assets/bubble_sprite.png",
        image: null
    },

    floor: {
        path: "assets/floor.png",
        image: null
    },

    partycle : {
        path: "assets/smoke.png",
        image : null
    },

    menu : {
        path : "assets/menu.png",
        image : null
    },

    defeatBackground : {
        path : "assets/disaster_background.png",
        image : null
    },

    playershoot : {
        path : "assets/pangDisparo.png",
        image : null
    },

    Backgroundlv2 : {
        path : "assets/infierno.gif",
        image : null
    },

    DiePlayer : {
        path : "assets/pangDie.png",
        image : null
    },

    WinBackground : {
        path : "assets/fondo_win.jpg",
        image : null
    },

    FloorLevel2 : {
        path : "assets/floor_lv2.jpg",
        image : null
    }
};

function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

function BodyLoaded()
{
    canvas = document.getElementById("MyCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    PreparePhysics(ctx);

    LoadImages(graphicAssets, function() {
        Start();

        // first call to the game loop
        Loop();
    });
}

function Start() {
    LoadScene(0);
}

function Loop()
{
    //deltaTime
    let now = Date.now();
    let deltaTime = now - time;
    globalDT = deltaTime;

    if (deltaTime > 1000)
        deltaTime = 0;

    time = now;

    // frames counter
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1000)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= acumDelta;
    }

    requestAnimationFrame(Loop);

    // Game logic -------------------
    Input.Update();
    Update(deltaTime / 1000);

    // Draw the game ----------------
    Draw(ctx);

    
    Input.PostUpdate();
}

function Update(deltaTime)
{
    contadorTime +=deltaTime;

    //Para resetear toda la escena, y pone la escena de muerte
    if (actualScene.toResetPhisics)
    {
        ClearWorld();

        if (actualScene === scene1)
            LoadScene(2);
        else if(actualScene === scene2)
            LoadScene(2);
        
    }
    //para pasar al siguiente level
    else if (actualScene.passLevel)
    {
        ClearWorld();

        if (actualScene === scene1)
            LoadScene(3);

        else if (actualScene === scene2)
            LoadScene(4);
    }
    //Para pasar a la escena de victoria.
    else if(actualScene.WinConidition)
    {
        ClearWorld();

        LoadScene(4);
    }
    else
    {
        // update physics
        // Step(timestep , velocity iterations, position iterations)
        world.Step(deltaTime, 8, 3);
        world.ClearForces();

        actualScene.Update(deltaTime);
    }
}


function Draw(ctx)
{
    // clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    actualScene.Draw(ctx);

    // draw the FPS
    ctx.fillStyle = "white";
    ctx.font = "10px Comic Sans MS";
    ctx.fillText('FPS: ' + FPS, 10, 16);
    ctx.fillText('DT: ' + Math.round(1000 / globalDT), 10, 28);
    ctx.fillText("TimePlay: "+ contadorTime.toFixed(2), 10, 40);
}

function DrawWorld (ctx, world)
{
    // Transform the canvas coordinates to cartesias coordinates
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
}

//función que cambia la variable de actualScene por la que deberia: 0.- menu, 1.- Escena1, 2.- Escena de muerte, 3.- Level2, 4.- Victoria
function LoadScene(sceneId)
{
    switch(sceneId)
    {
        case 0: // menu
            actualScene = menu;
            //actualScene = scene1;
            actualScene.Start();
            break;

        case 1: // scene1        
            actualScene = scene1;
            actualScene.Start();
            break;

        case 2: // death
            actualScene.player.score = 0;
            if(actualScene === scene1)
                actualScene.musicGame.pause();
            else if (actualScene === scene2)
                actualScene.Music2Game.pause(); 

            actualScene = death_scene;
            actualScene.Start();
            break;
        
        case 3:     //scene2  
        
            actualScene.musicGame.pause();      
            actualScene = scene2;
            actualScene.Start();
            break;

        case 4: //winScene
            actualScene.Music2Game.pause(); 
            actualScene = winScene;
            actualScene.Start();
            break;

        default: console.log("Unkown scene id.");
    }
}