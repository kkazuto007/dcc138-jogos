function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        color: "darkred",
        vida: 1,
        spawn:{},
        props:{},
        imune: 0,
        cooldown: 0,
        comportar: undefined,
        scene: undefined,
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    if(this.imune > 0){
        ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
    }
    ctx.beginPath();
    ctx.moveTo(-this.w/2, -this.h/2);
    ctx.lineTo(-this.w/2, +this.h/2);
    ctx.lineTo(+this.w/2, 0);
    ctx.closePath();
    if(this.props.tipo === "ghost"){
       ctx.fillRect(0,-this.h,this.w,this.h);
       ctx.fillRect(0,-this.h/10,this.w,this.h);
    }
    if(this.props.tipo === "spin"){
        ctx.beginPath();
        ctx.moveTo(-this.w/2, -this.h/2);
        ctx.lineTo(-this.w, 0);
        ctx.lineTo(-this.w/2, +this.h/2);
        ctx.lineTo(+this.w,0);
        ctx.closePath();
    }
    if(this.props.tipo === "moon"){
        ctx.fillStyle = "darkgoldenrod";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
    }
    if(this.props.tipo === "mothership"){
        ctx.fillStyle = "Black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.strokeStyle = "maroon";
        ctx.moveTo(110, 75);
        ctx.arc(-45, -25, 35, 0, Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.fill();
    ctx.restore();
};

Sprite.prototype.mover = function(dt) {
    this.a = this.a + this.va * dt;
   
    this.vx = this.vm*Math.cos(this.a);
    this.vy = this.vm*Math.sin(this.a);
   
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.cooldown = this.cooldown- dt;
    if(this.imune > 0) {
        this.imune = this.imune - 1*dt;
    }
};

Sprite.prototype.colisao = function(alvo){
    if(alvo.x + alvo.w < this.x) return false;
    if(alvo.x > this.x + this.w) return false;
    if(alvo.y + alvo.w < this.y) return false;
    if(alvo.y > this.y + this.w) return false;
    return true;
   
};

Sprite.prototype.colidiuCom = function(alvo){
    if(alvo.x + alvo.w/2 < this.x - this.w/2) return false;
    if(alvo.x - alvo.w/2 > this.x + this.w/2) return false;

    if(alvo.y + alvo.h/2 < this.y - this.h/2) return false;
    if(alvo.y - alvo.h/2 > this.y + this.h/2) return false;
    return true;
};

Sprite.prototype.desenhaEstrelas = function(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.w,this.h);
    ctx.restore();
};

Sprite.prototype.moverEstrelas = function(dt){
    this.x = this.x + this.vs*dt;
    if(this.x<=0)
      this.x=canvas.width;
};
