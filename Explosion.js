function Explosion(params = {}){
    exemplo = {
        x: 0,
        y: 0,
        frame: 0,
        w: 64,
        h:64,
        props: {
            tipo:"boom"
        },
        vida: 1,
    }
    Object.assign(this,exemplo,params);
}

Explosion.prototype.mover = function(dt){
   this.frame += 26*dt;
   if(Math.floor(this.frame) > 16){
       this.vida = -1;
   }
};

Explosion.prototype.desenhar = function(dt){
    ctx.save();
    ctx.translate(this.x, this.y);
    var F = Math.floor(this.frame);
    ctx.drawImage(this.scene.assets.img("explosion"),
      (F%4)*64,
      Math.floor(F/4)*64,
      64,
      64,
      -this.w/2,
      -this.h/2,
      this.w,
      this.h
    )
    ctx.restore();
};



Explosion.prototype.comportar = function(dt){
};

Explosion.prototype.colidiuCom = function(){
    return false;
}