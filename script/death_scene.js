var death_scene = {
    //objeto que recoge el background
    background : null,
    //objeto que recoge la musica y el audio
    deathmusic : new Audio ('music/deathScene.wav'),
    Menusound : new Audio('music/Start_sound.ogg'),
    currentTimeNextScene : 0,


    Start : function()
    {
        this.deathmusic.play();
        this.background = new BackgroundDefeat();
    },

    Update : function(deltaTime)
    {
        //Control del click
        if(Input.mouse.pressed || Input.IsKeyDown(KEY_SPACE))
        {
            this.deathmusic.pause();
            this.currentTimeNextScene+=deltaTime;
            
            this.Menusound.play();
            if(this.currentTimeNextScene>=0.05)
            {                
                LoadScene(1);
            }
        }
    },

    Draw : function(ctx)
    {
        this.background.Draw(ctx);

        ctx.font='bold 140px TitleFont';
        ctx.fillStyle = '#FE4164';
        ctx.fillText('¡GAME OVER!', canvas.width/2-450, canvas.height/5);

        ctx.font = 'bold 60px TitleFont';
        ctx.fillText('Pulse para continuar', canvas.width/2 - 400, canvas.height-50);
    }
}