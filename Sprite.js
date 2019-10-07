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
        frame: 0,
        color: "darkred",
        vida: 1,
        spawn:{},
        props:{},
        imune: 0,
        cooldown: 0,
        comportar: undefined,
        scene: undefined,
        image: undefined,
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a + Math.PI/2);
    if(this.props.tipo === "npc"){
        ctx.rotate(this.a + Math.PI/4 + Math.PI);
    }
    if(this.props.tipo === "worm"){
        ctx.rotate(this.a + Math.PI/2);
    }
    if(this.props.tipo === "shark"){
        ctx.rotate(this.a - Math.PI/2);
    }
   // console.log(this.scene.assets);
   
   ctx.fillStyle = this.color;
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   if(this.imune > 0){
       ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
    }
    if(this.props.tipo === "tiro"){
       var F = Math.floor(this.frame);
       ctx.drawImage(this.scene.assets.img("ball"),
       (F%2)*8,
       Math.floor(F/2)*8,
       8,
       8,
       -this.w/2,
       -this.h/2,
       this.w*1.2,
       this.h*1.2,
       )
       ctx.restore();
    }
    if(this.props.tipo === "npc"){
       var F = Math.floor(this.frame);
       ctx.drawImage(this.scene.assets.img("penguin"),
       (F%4)*32,
       0,
       32,
       16,
       -this.w/2,
       -this.h/2,
       32,
       16,
       )
       ctx.restore();
    }
    if(this.props.tipo === "worm"){
        var F = Math.floor(this.frame);
        ctx.drawImage(this.scene.assets.img("worm"),
        (F%2)*48,
        0,
        48,
        16,
        -this.w/2,
        -this.h/2,
        48,
        16,
        )
        ctx.restore();
     }

    if(this.props.tipo === "pc"){
        var F = Math.floor(this.frame);
        ctx.drawImage(this.scene.assets.img("player"),
         (F%3)*32,
         0,
         32,
         32,
         -this.w/2,
         -this.h/2,
         this.w,
         this.h
        )
        ctx.restore();
    }
    if(this.props.tipo === "ghost"){
       ctx.fillRect(0,-this.h,this.w,this.h);
       ctx.fillRect(0,-this.h/10,this.w,this.h);
    }
    if(this.props.tipo === "shark"){
        var F = Math.floor(this.frame);
        ctx.drawImage(this.scene.assets.img("shark"),
         0,
         Math.floor(F/2)*40,
         88,
         40,
         -this.w/2,
         -this.h/2,
         150,
         80,
        )
        ctx.restore();
    }
    if(this.props.tipo === "spin"){
        var F = Math.floor(this.frame);
        ctx.drawImage(this.scene.assets.img("bomb"),
         (F%2)*16,
         0,
         16,
         16,
         -this.w/2,
         -this.h/2,
         this.w,
         this.h
        )
        ctx.restore();
    }
    if(this.props.tipo === "moon"){
        ctx.drawImage(this.scene.assets.img("moon"),
        this.w/64,
        this.h/64,
        this.w,
        this.h
        )
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
    if(this.props.tipo === "npc"){
        this.frame +=20*dt;
        if(Math.floor(this.frame) >= 20){
            this.frame =0;
        }
    }
    if(this.props.tipo === "worm"){
        this.frame +=5*dt;
        if(Math.floor(this.frame) >= 20){
            this.frame =0;
        }
    }
    if(this.props.tipo === "pc"){
        this.frame +=26*dt;
        if(Math.floor(this.frame) >= 20){
            this.frame =0;
        }
    }
    if(this.props.tipo === "tiro"){
        this.frame +=16*dt;
        if(Math.floor(this.frame) >= 4) {
            this.frame = 0;
        }
    }
    if(this.props.tipo === "shark"){
        this.frame +=26*dt;
        if(Math.floor(this.frame) >= 3){
            this.frame = 0;
        }
    }
    if(this.props.tipo === "bomb"){
        this.frame +=26*dt;
        if(Math.floor(this.frame) >= 20){
            this.frame =0;
        }
    }
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
    var F = Math.floor(this.frame);
    ctx.drawImage(this.scene.assets.img("star"),
    (F%2)*8,
    Math.floor(F/2)*8,
    8,
    8,
    -this.w/2,
    -this.h/2,
    this.w,
    this.h,
    )
    ctx.restore();
};

Sprite.prototype.moverEstrelas = function(dt){
    this.frame +=2*dt;
    if(Math.floor(this.frame) >= 5){
        this.frame =0;
    }
    this.x = this.x + this.vs*dt;
    if(this.x<=0)
      this.x=canvas.width + this.w;
};

