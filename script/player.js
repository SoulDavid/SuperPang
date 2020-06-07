class Player
{
    constructor()
    {
        this.type = 'player';

        this.position = {x: 200, y: 200};
        this.width = 0.24,
        this.height = 0.36;

        this.shootSound = new Audio ('music/shoot_sound.wav');
        this.ScoreTitle = new FontFace('TitleFont', 'Tipografia/score.FON');

        this.isGoingLeft = false;

        // movement attr - mecánica de salto
        this.maxHorizontalVel = 3;
        this.maxVerticalVel = 10;
        this.jumpForce = 9;

        // movement flags
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;

        this.canJump = false;

        this.score = 0;

        // reference to the Animation object
        this.animation = null;

        // physics properties of the players body
        this.physicsOptions = {
            density: 1,
            fixedRotation: true,
            linearDamping: 1,
            user_data: this,
            type: b2Body.b2_dynamicBody,
            restitution: 0.0,
            friction: 0.5
        };

        // reference to the players body
        this.body = null;

        //Tiempo de fuego, para poder disparar siguiente
        this.fireCadence = 0.6;

        //Tiempo del fuego
        this.fireRate = 0;

        //Condiicón para saber si ha disparado
        this.shooting = false;
        //Tiempo para cambiar de animación
        this.nextanimation = 0;

        //La pool de objetos (bullet)
        this.bulletPool = new BulletPool(graphicAssets.bullet.image);
    }

    Start()
    {
        this.ScoreTitle.load().then(function(){});

        this.fireRate = this.fireCadence;

        this.startanimation = true;

        this.animation = new SSAnimation(graphicAssets.player.image, 63, 70, [4], 1/8);

        this.body = CreateBox(world,
            this.position.x / scale, this.position.y / scale,
            this.width, this.height*1.5, this.physicsOptions);

        this.body.SetUserData(this);

        this.bulletPool.Start();
    }

    Update(deltaTime)
    {
        this.fireRate += deltaTime;

        // update the animation
        this.animation.Update(deltaTime);

        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A))
        {                         
            this.moveLeft = true;
        }

        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D))
        {          
            this.moveRight = true;
        }
        // shoot
        if (Input.IsKeyDown(KEY_SPACE)&& this.fireRate>=this.fireCadence)
        {
            this.shootSound.play();
            this.shooting = true;
            let bullet = this.bulletPool.EnableBullet();
            this.animation = new SSAnimation(graphicAssets.playershoot.image, 63, 70, [2], 1/8);
            this.shooting = true;
            bullet.Activate(this.position, this.rotation, 5);
            this.fireRate = 0;
        }
        
        // update the bullets
        this.bulletPool.Update(deltaTime);

        //Control de animaciones
        if (this.shooting)
        {
            this.nextanimation +=deltaTime;
        }

        if(this.nextanimation>=0.5)
        {
            this.animation = new SSAnimation(graphicAssets.player.image, 63, 70, [4], 1/8);
            this.nextanimation = 0;
            this.shooting = false;
        }

        // movement
        if (this.moveRight)
        {
            this.ApplyVelocity(new b2Vec2(1, 0));
            this.moveRight = false;
            this.isGoingLeft = true;
        }

        if (this.moveLeft)
        {               
            this.ApplyVelocity(new b2Vec2(-1, 0));
            this.moveLeft = false;
            this.isGoingLeft = false;
        }

        //Paso de level, cuando consigues una score determinada
        if(this.score >= 200)
        {   
            if(actualScene === scene1)         
                actualScene.passLevel = true;
            else if(actualScene === scene2)
                actualScene.WinConidition = true;
        }

        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
    }

    Draw(ctx)
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);

        //Pintar la score
        ctx.font = "24px TitleFont";
        ctx.fillStyle = "white";
        ctx.fillText(this.score, 0, -50);

        //Girar la imagen cuando es un lado u otro
        if (this.isGoingLeft)
            ctx.scale(-1, 1);

        //Pintar la animación
        this.animation.Draw(ctx);

        ctx.restore();

        // draw the bullets
        this.bulletPool.Draw(ctx);
    }

    //Funcion que le da un impulso de fuerza al cuerpo que queramos
    ApplyVelocity(vel)
    {
        let bodyVel = this.body.GetLinearVelocity();
        bodyVel.Add(vel);

        // horizontal movement cap
        if (Math.abs(bodyVel.x) > this.maxHorizontalVel)
            bodyVel.x = this.maxHorizontalVel * bodyVel.x / Math.abs(bodyVel.x);

        // vertical movement cap
        if (Math.abs(bodyVel.y) > this.maxVerticalVel)
            bodyVel.y = this.maxVerticalVel * bodyVel.y / Math.abs(bodyVel.y);

        this.body.SetLinearVelocity(bodyVel);
    }
/*
    Jump()
    {
        if (Math.abs(this.body.GetLinearVelocity().y) > 0.1 || !this.canJump)
            return false;

        this.moveUp = true;
        this.canJump = false;
    }
    */

}
