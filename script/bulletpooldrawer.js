
function BulletPoolDrawer (bulletPool, ctx)
{
    ctx.strokeStyle = "white";
    ctx.fillStyle = "red";
    for (var i = 0; i < bulletPool.bulletArray.length; i++)
    {
        if (bulletPool.bulletArray[i].active)
            ctx.fillRect(10 + (10 * i), 60, 10, 10);
        
        ctx.strokeRect(10 + (10 * i), 60, 10, 10);
    }
}
