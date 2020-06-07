var winScene = {
    //objeto que recoge el background
    background : null,
    //objetos que recogen el sonido
    WinSound : new Audio('music/victory_sound.wav'),
    Menusound : new Audio('music/Start_sound.ogg'),
    //variable que recoge el tiempo maximo de la cancion
    currentTimeNextScene : 0,
    returnmenu : false,

    Start : function()
    {
        this.WinSound.play();
        this.background = new BackgroundWin();
        this.FontTitle.load().then(function(){});
    },

    Update : function(deltaTime)
    {
        //COntrol del click
        if(Input.mouse.pressed || Input.IsKeyDown(KEY_SPACE))
        {                  
            this.Menusound.pause();
            this.currentTimeNextScene+=deltaTime;
            
            this.WinSound.play();
            if(this.currentTimeNextScene>=0.05)
            {                
                this.returnmenu = true;
            }
        }

        if(this.returnmenu)
        {
            actualScene = menu;
            actualScene.Start();
        }
        
    },

    Draw : function(ctx)
    {
        this.background.Draw(ctx);

        ctx.font='bold 120px TitleFont';
        ctx.fillStyle = "white";
        ctx.fillText('¡Bien Jugado!', canvas.width/2-500, canvas.height/3);

        ctx.font = 'bold 60px TitleFont';
        ctx.fillText('Pulse para volver al Menu', canvas.width/2 - 450, canvas.height-25);
    }
}