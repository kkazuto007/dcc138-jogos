function Scene(params){
    var exemplo ={
        sprites: [],
        toRemove: [],
        ctx: null,
        w:300,
        h:300,
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    sprite.scene = this;
    this.sprites.push(sprite);
};

Scene.prototype.desenhar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].desenhar(this.ctx);
    }
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.sprites.length; i++){
         if(this.sprites[i].comportar){
             this.sprites[i].comportar();
         }
    }
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i< this.sprites.length; i++){
         this.sprites[i].mover(dt);
    }
};

Scene.prototype.moverEstrelas = function (dt) {
    for (var i = 0; i < this.sprites.length; i++){
        if(this.sprites[i].props.tipo === "star"){
          this.sprites[i].moverEstrelas(dt);
        }
    }
};

Scene.prototype.desenhaEstrelas = function (dt) {
    for (var i = 0; i < this.sprites.length; i++){
        if(this.sprites[i].props.tipo === "star"){
          this.sprites[i].desenhaEstrelas(ctx);
        }
    }
};

Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
};

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc" && vidaabsoluta <=0 || bosstimer <=0){
                    this.toRemove.push(this.sprites[i]);   
                }
                else
                if(this.sprites[i].imune <= 0 && this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "npc"){
                   this.sprites[j].vida--;
                   vidaabsoluta--;
                   this.sprites[i].imune = 0.5;
                }
                else
                if(this.sprites[i].imune <= 0 && this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "spin"){
                    vidaabsoluta-=5;
                    this.sprites[i].imune = 0.10;
                }
                else
                if((this.sprites[i].props.tipo === "npc" || this.sprites[i].props.tipo === "ghost" || this.sprites[i].props.tipo === "shark" || this.sprites[i].props.tipo === "spin") && this.sprites[j].props.tipo === "tiro"){
                    this.sprites[i].vida--;
                    this.toRemove.push(this.sprites[j]);
                    pontos++;
                }
                else
                if(this.sprites[i].props.tipo === "mothership" && this.sprites[j].props.tipo === "tiro"){
                    bosslife--;
                    this.toRemove.push(this.sprites[j]);
                }
                else
                if(this.sprites[i].imune <= 0 && this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "shark"){
                    this.sprites[j].vida--;
                    vidaabsoluta-=10;
                    this.sprites[i].imune = 4;
                }
                else
                if(this.sprites[i].imune <= 0 && this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "ghost"){
                    vidaabsoluta-=100;
                    this.sprites[i].imune = 10;
                }
                else
                if(this.sprites[i].imune <= 0 && this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "mothership"){
                    vidaabsoluta-=150;
                    this.sprites[i].imune = 10;
                }
            }
        }
    }
};

Scene.prototype.checaMorte = function(){
    for(var i = 0; i < this.sprites.length; i++){
        if(this.sprites[i].vida <=0){
            this.toRemove.push(this.sprites[i]);
        }
    }
};

Scene.prototype.removeSprites = function (){
    for(var i = 0; i < this.toRemove.length; i++){
       var idx = this.sprites.indexOf(this.toRemove[i]);
       if(idx>=0){
         this.sprites.splice(idx,1);
       }
    }
    this.toRemove = [];
}

Scene.prototype.default = function (){
    ctx.fillStyle = "indigo";
    ctx.lineWidth = 10;
    ctx.strokeStyle =  "black";
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.strokeRect(0,0, canvas.width,canvas.height);
}

Scene.prototype.verdados = function (){
    ctx.lineWidth = 1;
    ctx.fillStyle = "gold";
    ctx.strokeStyle =  "black";
    ctx.font = "30px bold Aldrich";
    ctx.fillText("Life:",10,30);
    ctx.strokeText("Life:",10,30);
    ctx.fillText(vidaabsoluta, 90,30);
    ctx.strokeText(vidaabsoluta, 90,30);
    ctx.fillText("Score:",10,60);
    ctx.strokeText("Score:",10,60);
    ctx.fillText(pontos, 100,60);
    ctx.strokeText(pontos, 100,60);
    ctx.fillText("Stage:",660,30);
    ctx.strokeText("Stage:",660,30);
    ctx.fillText(stage,750,30)
    ctx.strokeText(stage,750,30)
    if(boss === 1){
        ctx.fillText("Boss: ",670,90);
        ctx.strokeText("Boss: ",670,90);
        ctx.fillText(bosslife, 750,90);
        ctx.strokeText(bosslife, 750,90);
        ctx.fillText("Time Left: ",610,60);
        ctx.strokeText("Time Left: ",610,60);
        ctx.fillText(bosstimer, 750,60);
        ctx.strokeText(bosstimer, 750,60);
    }
    if(titlecronometer>=0){
        ctx.fillStyle = "black";
        ctx.strokeStyle =  "red";
        ctx.font = "100px bold New Courier";
        ctx.fillText("Moon Invaders", 100, 300);
        ctx.strokeText("Moon Invaders", 100, 300);
    }
    if(vidaabsoluta<=0 || bosstimer <=0){
        ctx.fillStyle = "black";
        ctx.strokeStyle =  "red";
        ctx.font = "100px bold Aldrich";
        ctx.fillText("GAME OVER", 100, 200);
        ctx.strokeText("GAME OVER", 100, 200);
    }
    if(bosslife <=0){ 
        ctx.fillStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeStyle =  "gold";
        ctx.font = "100px bold Aldrich";
        ctx.fillText("YOU WON", 150, 200);
        ctx.strokeText("YOU WON", 150, 200);
    }
}

Scene.prototype.stage = function (){
    if(titlecronometer <=0 && enemycronometer <=0){
        if(pontos<=50){
            for(var k=0; k < 2; k++){
               cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), h: 20, va: -16, vm: 50, color: "blue", props:{tipo: "npc"}, comportar: persegue2(pc) }));
               enemycronometer = 1;
               stage=1;
            }
        }
        else if(pontos>50 && pontos<=100){
            for(var k=0; k < 1+pontos*1/6; k++){
                cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), w: 15, va: 2*Math.random(), vm: 350, color: "lightblue", props:{tipo: "npc"}, comportar: persegue2(pc) }));
                enemycronometer = 3;
                stage=2;
            }
        }
        else if(pontos > 100 && pontos <= 200){
            for(var k=0; k < 3; k++){
                cena1.adicionar(new Sprite({ x: canvas.width, y: 300*Math.random(), w: 30 , h: 50, va: -16, vm: 100, color: "pink", props:{tipo: "shark", spawn: 2}, vida: 10, comportar: persegueSpawn(pc) }));
                enemycronometer = 5;
                stage=3;
            }
        }
        else if(pontos > 200 && pontos <= 500){
            for(var k=0; k < 2; k++){
                cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), w: 15, va: 2*Math.random(), vm: 400, color: "mediumspringgreen", props:{tipo: "npc"}, vida: 3, comportar: persegue2(pc) }));
                cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), h: 20, va: -16, vm: 75, color: "teal", props:{tipo: "npc"}, vida:2, comportar: persegue2(pc) }));
                enemycronometer = 1;
                stage=4;
            }
        }
        else if(pontos > 500 && pontos <= 1000){
            for(var k=0; k < 4; k++){
                cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), w: 15, va: 2*Math.random(), vm: 500, color: "springreen", props:{tipo: "npc"}, vida:3, comportar: persegue2(pc) }));
                cena1.adicionar(new Sprite({ x: canvas.width, y: canvas.height*Math.random(), h: 20, va: -16, vm: 150, color: "purple", props:{tipo: "npc"}, vida: 4, comportar: persegue2(pc) }));
                cena1.adicionar(new Sprite({ x: canvas.width, y: 300*Math.random(), w: 30 , h: 50, va: -16, vm: 300, color: "crimson", props:{tipo: "shark", spawn: 2}, vida: 20, comportar: persegueSpawn(pc) }));
                enemycronometer = 15;
                stage=5;
            }
        }
        else if(pontos > 1000){
            for(var k=0; k < 5; k++){                
                cena1.adicionar(new Sprite({ x: 0, y: canvas.height*Math.random(), h:50 , w: 20, vm: 300, color: "darkgray", props:{tipo: "spin"}, vida: 5}));
                enemycronometer = 2;
                stage=6;
            }
            if(boss <= 0){
              cena1.adicionar(new Sprite({ x: 600, y: canvas.height/8, props: {tipo: "mothership", spawn: 2}, vm: -20, vida: 300, comportar: persegueboss(pc)}));
              boss=1;
            }     
        }
    }
    if(ghostcronometer<=0 && stage >= 3){
           cena1.adicionar(new Sprite({ x: canvas.width/2, y: canvas.height/2, w: 60 , h: 40, va:0, vm: 30, color: "white", props:{tipo: "ghost", spawn: 2}, vida: 50, comportar: persegueSpawn2(pc) }));
           ghostcronometer = 40;
    }
};

Scene.prototype.passo = function(dt){
    this.limpar();
    this.default();
    this.verdados();
    this.stage();
    this.comportar();
    this.moverEstrelas(dt);
    this.mover(dt);
    this.desenhar();
    this.desenhaEstrelas();
    this.checaColisao();
    this.checaMorte();
    this.removeSprites();
}
