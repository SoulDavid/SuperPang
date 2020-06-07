class Bubble
{
    constructor(position)
    {
        //el tipo de este, para las colisiones
        this.type = 'bubble';

        //recoge la posición y el tamaño
        this.position = position;
        this.width = 0.5;
        this.height = 0.5;


        // reference to the Animation object
        this.animation = null;

        // physics properties of the players body
        this.physicsOptions = {
            density : randomBetween(2, 6),
            friction: 1.0,
            restitution : 1,
     
            linearDamping : 0.1,
            angularDamping: 0.1,
            fixedRotation : true,
        };

        // reference to the players body
        this.body = null;

        //recoge la imagen de esta
        this.image = graphicAssets.bubble.image;

        //variable que recoge si se tiene que eliminar
        this.toDelete = false;
    }

    Start()
    {
        this.body = CreateBall(world,
            this.position.x/scale, (canvas.height - this.position.y)/scale,
            this.width, this.physicsOptions);

        this.body.SetUserData(this);
    }

    Update (deltaTime)
    {
        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
        this.rotation = this.body.GetAngle();
    }

    Draw(ctx)
    {
        let widthScaled = this.width * scale;
        let heightScaled = this.height * scale;
        ctx.drawImage(this.image, this.position.x - widthScaled, this.position.y - heightScaled, widthScaled * 2, heightScaled * 2);
    }
}