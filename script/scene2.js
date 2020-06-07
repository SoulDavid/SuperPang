var scene2 = {

    //Objeto que recoge el player
    player : null,
    //objeto que recoge el suelo
    floor : null,
    //objeto que recoge el background
    background : null,
    //array que recoge las burbujas que van saliendo
    bubbles : [],
    //variable que recoge los segundos que estan pasando
    seconds     : 0,
    //variable que recoge las rondas máximas para que se dificulte el juego
    roundcount  : 5,
    //variable que recoge los segundos que teinen que pasar para spamear una pelota
    secondsMax  : 2,
    //objeto que recoge el sistema de partículas
    partycleSystem : null,
    //indica si se ha creado un sistema de particulas
    creado : false,
    //variable que recoge el tiempo de las partículas vivas 
    secondspartycles : 0,
    //variable que recoge el tiempo máximo para que dure las partículas
    secondsMaxPartycles : 0.5,
    //objeto qeu recoge la musica
    Music2Game : new Audio('music/SecondLevel.wav'),
    //variable que recoge el tiempo del audio
    currentTimeAudio : 0,
    //Indica si pasa a la escena de victoria
    WinConidition : false,
    //Indica si pasa a la escena de derrota
    toResetPhisics: false,

    Start : function()
    {    
        this.Music2Game.play();

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

        this.floor = new FloorLevel2();
        this.floor.Start();

        this.background = new BackgroundLevel2();

        this.bubbles = [];
        this.toResetPhisics = false;
        this.WinConidition = false;
    },

    Update : function(deltaTime)
    {
        this.currentTimeAudio += deltaTime;

        //Control del audio
        if(this.currentTimeAudio>=34)
        {
            console.log("ReinicioMusica");
            this.currentTimeAudio = 0;
            this.Music2Game.play();
        }

        // player update
        this.player.Update(deltaTime);

        //update de las burbujas
        for(let i = 0; i < this.bubbles.length; i++)
        {
            this.bubbles[i].Update(deltaTime);

            
            if(this.bubbles[i].toDelete)
            {
                //this.partycleSystem.origin.x = this.bubbles[i].position.x;
                //this.partycleSystem.origin.y = this.bubbles[i].position.y;
                this.partycleSystem.ResetPosition(this.bubbles[i].position);
                
                world.DestroyBody(this.bubbles[i].body);
                RemoveElementAt(this.bubbles, i);

                this.creado = true;
                i--;
            }
        }
                    
        //Update de las partículas
        this.partycleSystem.Update(deltaTime);

        this.seconds += deltaTime;

        //Control de rondas y de la dificultad
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
                    this.secondMax = 0.25;
                }
            }

            this.seconds = 0;    
        }
    },

    Draw : function(ctx)
    {
        DrawWorld (ctx, world); 

        //draw the background
        this.background.Draw(ctx);    

        //draw the floor
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