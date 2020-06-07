var scene1 = {
    //objeto que recoge el jugador
    player : null,
    //objeto que recoge el suelo
    floor : null,
    //objeto que recoge el background
    background : null,
    //objeto que recoge las pelotas que van saliendo
    bubbles : [],
    //variable que recoge el tiempo que esta pasando para el spawn de las pelotas
    seconds     : 0,
    //variable que recoge el numero de rondas, para dificultar el juego
    roundcount  : 10,
    //variable que recoge el tiempo en el que tiene que spamear la pelota
    secondsMax  : 2,
    //objeto que recoge el sistema de partículas
    partycleSystem : null,
    //para saber si se ha creado el sistema
    creado : false,
    //variable que recoge los segundos para quitar las parículas
    secondspartycles : 0,
    //tiempo en el que se quita la parícula
    secondsMaxPartycles : 0.5,
    //objeto que recoge el sonido
    musicGame : new Audio('music/game_music.wav'),

    //recoge cuando pasar al siguiente level
    toResetPhisics: false,
    //recoge la variable para pasar al siguiente level
    passLevel: false,

    Start : function()
    {        
        this.musicGame.currentTime = 0;
        this.musicGame.play();

        // left wall
        CreateBox(world, -0.05, 1, .1, 8, {type : b2Body.b2_staticBody});

        // right wall
        CreateBox(world, 10.85, 1, .1, 8, {type : b2Body.b2_staticBody});    

        // top wall
        CreateBox(world, 0, 7, 16, .25, {type : b2Body.b2_staticBody, user_data: {type: "limit"}}); 
        
        this.partycleSystem = new ParticleSystem(200);
    
        // create the player
        this.player = new Player();
        this.player.Start();

        this.floor = new Floor();
        this.floor.Start();

        this.background = new Background();

        this.bubbles = [];
        this.toResetPhisics = false;
        this.passLevel = false;
    },

    Update : function(deltaTime)
    {
        //Control de la música
        if(this.musicGame.currentTime>34)
        {
            this.musicGame.currentTime = 0;
        }

        // player update
        this.player.Update(deltaTime);

        //Bubble Update
        for(let i = 0; i < this.bubbles.length; i++)
        {
            this.bubbles[i].Update(deltaTime);

            
            if(this.bubbles[i].toDelete)
            {
                this.partycleSystem.ResetPosition(this.bubbles[i].position);

                world.DestroyBody(this.bubbles[i].body);
                RemoveElementAt(this.bubbles, i);

                this.creado = true;
                i--;
            }
        }
                    
        //sistema de partículas Update
        this.partycleSystem.Update(deltaTime);

        this.seconds += deltaTime;

        //Dificultar el juego
        if(this.seconds >= this.secondsMax)
        {
            // the ball    
            //ball.body = CreateBall(world, randomBetween(1, 10), (canvas.height / scale) + 2, 0.5, {user_data: ball});
            let newBubble = new Bubble({x: randomBetween(40, 800), y: (canvas.height / scale) + 2});
            console.log("Creada Pompa");
            newBubble.Start();
            this.bubbles.push (newBubble);        

            this.roundcount++;

            if(this.roundcount == 10)
            {                
                this.secondsMax--;
                if(this.secondMax<=0)
                {
                    this.secondMax = 0.5;
                }
            }

            this.seconds = 0;    
        }
    },

    Draw : function(ctx)
    {
        DrawWorld (ctx, world); 

        //draw background
        this.background.Draw(ctx);    

        //draw floor
        this.floor.Draw(ctx);
    
        // draw the player
        this.player.Draw(ctx);
    
        //Draw Bubble
        for(let i = 0; i < this.bubbles.length; i++)
            this.bubbles[i].Draw(ctx);

        if(this.creado)
        {
            // draw the particle system
            this.partycleSystem.Draw(ctx);

            this.secondspartycles+=globalDT/1000;
            if(this.secondspartycles>=this.secondsMaxPartycles)
            {
                this.creado = false;
                this.secondspartycles = 0;
            }
        }
    }
}