class Bullet
{
    constructor (image, index = -1)
    {
        //tipo para las colisiones de Box2D
        this.type = "bullet"; 
        
        //recoge la imagen
        this.image = image;

        //recoge el pivot
        this.pivot = {
            x: image.width / 2,
            y: image.height / 2
        }

        //recoge la posición
        this.index = index;
        //recoge si esta activa o inactiva
        this.active = false;

        //Recoge la posición, rotación y velocidad
        this.position = { x: 0, y: 0 },
        this.rotation = 0;
        this.speed = 0;
        this.damage = 0;
        
        this.maxVerticalVel = 7;

        // physics properties of the players body
        this.physicsOptions = {
            density: 0.5,
            fixedRotation: true,
            linearDamping: 1,
            type: b2Body.b2_dynamicBody,
            restitution: 0.8,
            friction: 0.5
        };

        // reference to the players body
        this.body = null;
    }
    Start()
    {
        /*this.body = CreateBox(world,
            this.position.x, this.position.y,
            this.image.width / scale, this.image.height / scale, this.physicsOptions);*/
        this.body = CreateBox(world,
            this.position.x, this.position.y,
            0.1, 0.2, this.physicsOptions);

        this.body.GetFixtureList().SetSensor(true);
        this.body.SetUserData(this);
        this.body.SetActive(false);
    }

    Update(deltaTime)
    {

        this.ApplyVelocity(new b2Vec2(0, this.speed));

        //    this.position.y -= this.speed * deltaTime;

        // update the position
        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
        this.rotation = this.body.GetAngle();
    }

    Draw(ctx)
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);

        ctx.scale(0.05, 0.05);

        ctx.drawImage(this.image, -this.pivot.x, -this.pivot.y);

        ctx.restore();
    }

    ApplyVelocity(vel)
    {
        let bodyVel = this.body.GetLinearVelocity();
        bodyVel.Add(vel);

        // vertical movement cap
        if (Math.abs(bodyVel.y) > this.maxVerticalVel)
            bodyVel.y = this.maxVerticalVel * bodyVel.y / Math.abs(bodyVel.y);

        this.body.SetLinearVelocity(bodyVel);
    }

    //Para poner la bala
    Activate(position, rotation, speed)
    {
        this.position.x = position.x;
        this.position.y = position.y;
        this.rotation = rotation;
        this.body.SetPositionAndAngle(new b2Vec2(this.position.x / scale, (canvas.height - this.position.y) / scale), rotation);
        this.speed = 1;
        this.active = true;
        this.body.SetActive(true);
    }
}

class BulletPool
{
    constructor (bulletImage)
    {
        
        this.bulletImage = bulletImage;

        this.bulletArray = [];
        this.initialSize = 3;
        this.bulletCount = 0;
    }

    Start()
    {
        this.bulletArray = [];
        for (var i = 0; i < this.initialSize; i++)
        {
            let bullet = new Bullet(this.bulletImage, i);
            bullet.Start();
            this.bulletArray.push(bullet);
        }
    }

    Update(deltaTime)
    {
        for (let i = 0; i < this.bulletArray.length; i++)
        {
            let bullet = this.bulletArray[i];

            if (bullet.active) {
                bullet.Update(deltaTime);

                // check screen bounds
                if (bullet.position.y < 10)
                {
                    this.DisableBullet(bullet);                
                }
            }
        }
    }

    Draw(ctx)
    {
        this.bulletArray.forEach(function(bullet) {
            if (bullet.active)
                bullet.Draw(ctx);
        });
    }

    EnableBullet()
    {
        // search for the first unactive bullet
        let bullet = null;
        let found = false;
        let i = 0;
        while (!found && i < this.bulletArray.length)
        {
            if (!this.bulletArray[i].active)
            {
                found = true;
                bullet = this.bulletArray[i];
            }
            else
                i++;
        }

        if (!found)
        {
            // all the bullets are active: create a new one
            bullet = new Bullet(this.bulletImage, this.bulletArray.length);
            
            this.bulletArray.push(bullet);
        }

        this.bulletCount++;

        return bullet;
    }

    DisableBullet(bullet)
    {
        // disable the bullet
        this.bulletCount--;
        bullet.active = false;
        bullet.body.SetActive(false);
    }
}