function AssetsManager() {
    this.aCarregar = 0;
    this.carregadas = 0;
    this.images = {};
    this.audios = {};
    this.channels = [];
    this.MAX_CHANNELS = 20;
    for(var i = 0; i< this.MAX_CHANNELS; i++){
        this.channels[i] = {
            audio: new Audio(),
            fim: -1
        };
    }
}

AssetsManager.prototype = new AssetsManager();

AssetsManager.prototype.loadImage = function (key, url) {
    console.log(`Carregando imagem ${key}: ${url}...`);

    this.aCarregar++;
    var imagem = new Image();
    imagem.src = url;
    this.images[key] = imagem;
    var that = this;
    imagem.addEventListener("load", function () {
        console.log(`Imagem ${key}: ${url} carregada.`);
        that.carregadas++;
    });
}

AssetsManager.prototype.loadAudio = function (key, url) {
    console.log(`Carregando Audio ${key}: ${url}...`);

    this.aCarregar++;
    var audio = new Audio();
    audio.src = url;
    audio.load()
    this.audios[key] = audio;
    var that = this;
    audio.addEventListener("canplaythrough", function () {
        console.log(`Audio ${key}: ${url} carregada.`);
        that.carregadas++;
    });
}

AssetsManager.prototype.play = function(key){
    if(this.audios[key] === undefined) throw new Error(`Invalid audio key ${key}!`);
    this.audios[key].play();
    for(var i=  0; i < this.MAX_CHANNELS; i++){
        var agora = new Date();
        if(this.channels[i].fim < agora.getTime()){
            this.channels[i].audio.src = this.audios[key].src;
            this.channels[i].fim = agora.getTime() + this.audios[key].duration*1000;
            this.channels[i].audio.play();
            break;
        }
    }
}

AssetsManager.prototype.img = function(key){
    if(this.images[key] === undefined) throw new Error(`Invalid img key ${key}!`);
    //console.log(`IMG: key: ${key}`);
    //console.log(`IMG: images[key]: ${this.images[key]}`);
    return this.images[key];
}


AssetsManager.prototype.progresso = function(){
    if(this.aCarregar !=0)
      return (this.carregadas/this.aCarregar)*100.0;
    else return 0.0;
}