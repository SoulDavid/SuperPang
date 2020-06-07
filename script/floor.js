class Floor
{
    constructor(position)
    {
        //el tipo que es, para las colisiones
        this.type = 'floor';

        //tamaño del suelo
        this.width = 16;
        this.height = 0.25;

        // physics properties of the coins body
        this.physicsOptions = {
            user_data: this,
            type: b2Body.b2_staticBody
        };

        // reference to the players body
        this.body = null;

        //la imagen que recoge
        this.image = graphicAssets.floor.image;
    }

    Start()
    {
        CreateBox(world, 8, 0.25, this.width, this.height, this.physicsOptions);
    }


    Draw(ctx)
    {
        let widthScaled = this.width * scale;
        let heightScaled = (this.height * scale)*3;
        ctx.drawImage(this.image, 0, canvas.height-heightScaled, widthScaled, heightScaled);
    }
}

class FloorLevel2
{
    constructor(position)
    {
        //el tipo que es, para las colisiones
        this.type = 'floor';

        //tamaño del suelo
        this.width = 16;
        this.height = 0.25;

        // physics properties of the coins body
        this.physicsOptions = {
            user_data: this,
            type: b2Body.b2_staticBody
        };

        // reference to the players body
        this.body = null;

        //la imagen que recoge
        this.image = graphicAssets.FloorLevel2.image;
    }

    Start()
    {
        CreateBox(world, 8, 0.25, this.width, this.height, this.physicsOptions);
    }


    Draw(ctx)
    {
        let widthScaled = this.width * scale;
        let heightScaled = (this.height * scale)*3;
        ctx.drawImage(this.image, 0, canvas.height-heightScaled, widthScaled, heightScaled);
    }
}