var menu = {
    //objeto que recoge el background del menu
    background : null,
    //objeto que recoge el audio del sonido de inicio
    Menusound : new Audio('music/Start_sound.ogg'),
    //tiempo para que pase a la siguiente escena
    currentTimeNextScene : 0,
    //objeto que recoge las estrellas que hay
    stars : [],
    //timing, que controla cuando cambiar de posicion.
    TimeParpadeo : 0,

    Start : function()
    {
        this.stars = [];

        this.background = new BackgroundMenu();

        // initialize the stars
        for (let i = 0; i < 20; i++)
        {
            var star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height / 2,
                radius: randomBetween(3, 9)
            }        
            this.stars.push(star);
        }
    },

    Update : function(deltaTime)
    {
        if(Input.mouse.pressed || Input.IsKeyDown(KEY_SPACE))
        {            
            this.currentTimeNextScene+=deltaTime;
            
            this.Menusound.play();
            if(this.currentTimeNextScene>=0.05)
            {
                actualScene = scene1;
                actualScene.Start();
            }
        }

        //Parpadeo de las estrellas
        this.TimeParpadeo += deltaTime;
        if(this.TimeParpadeo>=2)
        {
            for (i = 0; i < this.stars.length; i++)
            {
                this.stars[i].x = Math.random() * canvas.width;
                this.stars[i].y = Math.random() * canvas.height / 2;
                this.stars[i].radius = randomBetween(3, 9);
            }

            this.TimeParpadeo = 0;
        }        
    },

    Draw : function(ctx)
    {
        //draw background
        this.background.Draw(ctx);

        // yellow points - stars
        ctx.fillStyle = "#FFEE72";
        for (let i = 0; i < this.stars.length; i++)
        {
            ctx.beginPath();
            ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].radius, 0, PI2, false);
            ctx.fill(); 
        }

        //Palabras de menu
        ctx.font='bold 200px TitleFont';
        ctx.fillStyle = "red";
        ctx.fillText('B A D', canvas.width/2-300, canvas.height/3);
        
        ctx.font='bold 200px TitleFont';
        ctx.fillText('P A N G', canvas.width/2-410, canvas.height/2+100);

        ctx.font = 'bold 60px TitleFont';
        ctx.fillText('Pulse para continuar', canvas.width/2 - 400, canvas.height-50);
    }
}