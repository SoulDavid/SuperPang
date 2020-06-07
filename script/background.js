class Background
{
    constructor(position)
    {
        // reference to the players body
        this.body = null;

        //recoge la imagen de este
        this.image = graphicAssets.background.image;
    }



    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

class BackgroundMenu
{
    constructor(position)
    {
        // reference to the players body
        this.body = null;

        //recoge la imagen de este
        this.image = graphicAssets.menu.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

class BackgroundDefeat
{
    constructor(position)
    {
        // reference to the players body
        this.body = null;

        //recoge la imagen de este
        this.image = graphicAssets.defeatBackground.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

class BackgroundLevel2
{
    constructor(position)
    {
        // reference to the players body
        this.body = null;

        //recoge la imagen de este
        this.image = graphicAssets.Backgroundlv2.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}

class BackgroundWin
{
    constructor(position)
    {
        // reference to the players body
        this.body = null;

        //recoge la imagen de este
        this.image = graphicAssets.WinBackground.image;
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
}