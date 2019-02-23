let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

// let wwid=window.innerWidth;
// let whei=window.innerHeight;

let app=new PIXI.Application({
  // width:960,
  // height:960,
  autoResize:true,
  resolution: devicePixelRatio,
  antialias:true,
  transparent:true
});
document.querySelector('#pixi_frame').appendChild(app.view);

let wwid=app.screen.width;
let whei=app.screen.height;
let FRAME_BORDER=5;

window.addEventListener('resize', resize);
function resize() {
  const parent = app.view.parentNode;
  app.renderer.resize(parent.clientWidth, parent.clientHeight);
  // rect.position.set(app.screen.width, app.screen.height);


  wwid=app.screen.width;
  whei=app.screen.height;

  
}

var MAX_GRID_X,MAX_GRID_Y,offsetx,offsety,gwid;
var mgridx,mgridy;
var button_scale;

function resetGrid(){
  

  wwid=app.screen.width;
  whei=app.screen.height;

  MAX_GRID_X=15;
  MAX_GRID_Y=15;

  offsetx=FRAME_BORDER;
  offsety=_title_hei+2.5;
  gwid=Math.max((whei-offsety)/MAX_GRID_X,(wwid-offsetx)/MAX_GRID_X);

  mgridx=Math.floor((wwid-FRAME_BORDER*2)/gwid);
  mgridy=Math.floor((whei-offsety-FRAME_BORDER)/gwid);

  console.log(mgridx,mgridy);

  wwid=gwid*mgridx+FRAME_BORDER*2;
  whei=gwid*mgridy+offsety+FRAME_BORDER;

  button_scale=Math.min(wwid/906,1);
  
}

resize();


// app.renderer.view.style.position="absolute";
// app.renderer.view.style.display="block";
// app.renderer.autoResize=true;
// app.renderer.resize(wwid,whei);

//document.body.appendChild(app.view);


var Container = PIXI.Container, 
    autoDetectRenderer = PIXI.autoDetectRenderer, 
    loader = PIXI.loader, 
    resources = PIXI.loader.resources, 
    Sprite = PIXI.Sprite,
    Texture=PIXI.Texture,
    Rectangle=PIXI.Rectangle;

var _bar_snake,_bar;
var _img_music,_btn_music,_play_music;
var _img_start,_img_iknow,_img_share,_img_replay,_img_signup;
var _container_start,_container_intro,_container_game,_container_result;

var _title_hei;
var _textrunner;

// load
loader.add([
  'img/bgd.png','img/frame.png','img/logo.png','img/bar.png','img/bar-snake.png','img/title.png','img/title-text.png',
  'img/ui_sound.png','img/hambuger.png','img/ui_start.png'
  ]).load(setupbgd);


function loadProgressHandler(loader,resource){
  //console.log('progress: '+loader.progress+'%');
  if(_bar_snake && _bar) _bar_snake.width=_bar.width*loader.progress/100.0;

}

function setupbgd(){

  let title=new PIXI.NineSlicePlane(Texture.from('img/title.png'),40,0,120,0)
  _title_hei=title.height;
  
  resetGrid();

  
  title.x=0;
  title.y=0;
  title.width=wwid;
  app.stage.addChild(title);
  
  let title_text=new Sprite(resources['img/title-text.png'].texture);
  title_text.x=FRAME_BORDER*2;
  title_text.y=60/2-title_text.height/2;
  app.stage.addChild(title_text);

  let img_back=new Texture.from('img/bgd.png');
  let back=new PIXI.NineSlicePlane(Texture.from('img/bgd.png'),40,0,40,200);
  back.x=0;
  back.y=60;
  back.width=wwid; back.height=whei-60;
  app.stage.addChild(back);
  

  
  let margin_=whei*0.1;

  _container_start=new PIXI.Container();
  _container_start.visible=true;
  

  let logo=new Sprite(resources["img/logo.png"].texture);
  logo.x=app.stage.width/2-logo.width/2;
  
  app.ticker.add(function(delta){
    //logo.y=10*Math.sin(delta*120);
  });


  _bar=new Sprite(resources["img/bar.png"].texture);
  _bar.x=app.stage.width/2-_bar.width/2;
  

  // _bar_snake=new Sprite(resources["img/bar-snake.png"].texture);
  _bar_snake=new PIXI.NineSlicePlane(Texture.from('img/bar-snake.png'),30,0,30,0);
  _bar_snake.x=app.stage.width/2-_bar.width/2;
  
  _img_start=new Texture.fromImage('img/ui_start.png');
  _img_start.frame=new　Rectangle(0,0,323,84);

  _btn_start=new Sprite(_img_start); 
  _btn_start.scale.set(button_scale,button_scale);

  _btn_start.x=wwid/2-_btn_start.width/2;
  
  _btn_start.visible=false;
  _btn_start.interactive=true;
  _btn_start.buttonMode=true;
  _btn_start.on('pointerdown',onClickStart);
  

  _textrunner=new PIXI.Container();
  _textrunner.height=50;
  drawTextRunner(0);
  _textrunner.x=wwid/2-_textrunner.width/2;

  app.ticker.add(function(delta){
    drawTextRunner(delta);
  });

  let top_=((whei-offsety)-(logo.height+_btn_start.height+margin_*2+_textrunner.height))/2;

  logo.y=0;
  _container_start.addChild(logo);
  
  _bar.y=0+logo.height+margin_;
  _container_start.addChild(_bar);
  
  _bar_snake.y=_bar.y+_bar.height/2-_bar_snake.height/2;
  _container_start.addChild(_bar_snake);

  _btn_start.y=_bar.y+_bar.height/2-_btn_start.height/2;
  _container_start.addChild(_btn_start);

  _textrunner.y=_btn_start.y+_btn_start.height+margin_;
  _container_start.addChild(_textrunner);

  _container_start.y=top_+offsety;

  _img_music=new Texture.fromImage('img/ui_sound.png');

  let _rect_music=new Rectangle(0,41,41,41);
  _img_music.frame=_rect_music;

  _btn_music=new Sprite(_img_music);
  _btn_music.x=wwid-120+(60/2-_btn_music.width/2);
  _btn_music.y=60/2-_btn_music.height/2;
  _btn_music.interactive=true;
  _btn_music.buttonMode=true;
  
  _play_music=true;
  _btn_music.on('pointerdown',function(){
      _play_music=!_play_music;
    if(_play_music){
      _img_music.frame=new Rectangle(0,41,41,41);
    }else{
      _img_music.frame=new Rectangle(0,0,41,41);
    }
  });
  app.stage.addChild(_btn_music);
  

  let hambuger=new Sprite(resources['img/hambuger.png'].texture); 
  hambuger.x=wwid-60+(60/2-hambuger.width/2);
  hambuger.y=60/2-hambuger.height/2;
  hambuger.interactive=true;
  hambuger.buttonMode=true;
  hambuger.on('pointerdown',function(){
    _container_intro.visible=!_container_intro.visible;
    _img_iknow.frame=new Rectangle(0,0,323,84);
    if(_container_intro.visible) pauseGame();
    else{
      if(_container_game.visible) startGame();
    }
  });
  app.stage.addChild(hambuger);

  app.stage.addChild(_container_start);
  
  _container_game=new PIXI.Container();
  _container_game.visible=false;
  app.stage.addChild(_container_game);
  
    
  _container_result=new PIXI.Container();
  _container_result.visible=false;
  app.stage.addChild(_container_result);
  
  _container_intro=new PIXI.Container();
  _container_intro.visible=false;
  app.stage.addChild(_container_intro);
  

  let frame=new PIXI.NineSlicePlane(Texture.from('img/frame.png'),60,50,120,60);
  frame.x=0;
  frame.y=0;
  frame.width=wwid;
  frame.height=whei;
  app.stage.addChild(frame);


  loader.add([
  'img/ui_iknow.png',
  'img/game.png','img/team.png','img/website.png','img/info.png','img/info_back.png',
  'img/hint-mobile.png','img/hint-pc.png',
  'img/snake/head-normal.png','img/snake/head-eat.png','img/snake/head-dead.png',
  'img/snake/body-horizontal.png','img/snake/body-vertical.png',
  'img/snake/body-left-top.png','img/snake/body-left-bottom.png','img/snake/body-right-top.png','img/snake/body-right-bottom.png',
  'img/snake/tail.png',
  'img/recommand.png',
  'img/ui_replay.png','img/ui_share.png','img/ui_signup.png',
  'img/food/2.png','img/food/3.png','img/food/4.png','img/food/5.png',
  'data/keyword.json','data/sentence.json'
  ]).on('progress',loadProgressHandler).load(setup);

}
function setup(){

  _bar.visible=false;
  _bar_snake.visible=false;
  _btn_start.visible=true;
  _snake_stop=true;
  
  loadData();

  setupGame();
  setupInfo();
 
  setupResult();
  
}
function setupInfo(){
  
    
  let cback=new Sprite(resources['img/info_back.png'].texture);
  cback.width=wwid-5;
  cback.height=whei-_title_hei-2.5;
  cback.y=_title_hei;
  _container_intro.addChild(cback);


  let text_margin=FRAME_BORDER*2;

  let info_back=new PIXI.NineSlicePlane(Texture.from('img/info.png'),60,60,60,60);
  info_back.width=wwid*.43;
  info_back.x=wwid*.12;
  info_back.y=whei*.18;

  var info_text_style = new PIXI.TextStyle({
      fontFamily: '蘋方',
      fontSize: 21,
      fill: ['#241C83'],
      wordWrap: true,
      wordWrapWidth: info_back.width-text_margin*2-20,
      breakWords: true
  });
  
  var infoText = new PIXI.Text('這是一個喜歡吃內心話的貪食蛇。特別喜歡青春的心。', info_text_style);
  

  let intro_game=new Sprite(resources['img/game.png'].texture); 
  intro_game.scale.set(button_scale,button_scale);
  intro_game.x=wwid*.1;
  intro_game.y=whei*.13;
  
  info_back.height=Math.max(whei*.17,infoText.height+text_margin*2+intro_game.height);
  
  
  infoText.x = info_back.x+(info_back.width-20)/2-infoText.width/2;
  infoText.y = intro_game.y+intro_game.height+text_margin;

  _container_intro.addChild(info_back);
  _container_intro.addChild(infoText);
  _container_intro.addChild(intro_game);

  
 

  let website_=new Sprite(resources['img/website.png'].texture);
  website_.scale.set(button_scale,button_scale);
  website_.x=wwid-wwid*.12-website_.width;
  website_.y=info_back.y+info_back.height-website_.height;
  website_.interactive=true;
  website_.buttonMode=true;
  website_.on('pointerdown',function(){
    window.open('http://www.youngvoice.tw','_blank');
  });
  _container_intro.addChild(website_);
  

  let info_back2=new PIXI.NineSlicePlane(Texture.from('img/info.png'),60,60,60,60);
  info_back2.width=wwid*.77;
  info_back2.x=wwid*.12;
  info_back2.y=whei*.47;
  
  var info_text_style2 = new PIXI.TextStyle({
      fontFamily: '蘋方',
      fontSize: 21,
      fill: ['#241C83'],
      wordWrap: true,
      wordWrapWidth: info_back2.width-text_margin*2-20,
      breakWords: true
  });
  var infoText2 = new PIXI.Text('富邦文教基因會自2005年起建置「青少年發生網」，並同步舉辦「青少年發聲獎」希望支持與陪伴青少年朋友以自己熟悉的媒介，透過創作的過程找到自己的聲音、說自己說的話，而每一個作品都是參賽青少年一段人生。今年開始青少年發聲獎正式成立視覺影像學程，歡迎更多有興趣的青少年朋友一起同行。', info_text_style2);
  
  

  let intro_yv=new Sprite(resources['img/team.png'].texture);
  intro_yv.scale.set(button_scale,button_scale);
  intro_yv.x=wwid*.1;
  intro_yv.y=whei*.42;
  
  info_back2.height=Math.max(whei*.3,infoText2.height+text_margin*2+intro_yv.height);

  infoText2.x = info_back2.x+(info_back2.width-20)/2-infoText2.width/2;
  infoText2.y = intro_yv.y+intro_yv.height+text_margin;

  _container_intro.addChild(info_back2);
  _container_intro.addChild(infoText2);
  _container_intro.addChild(intro_yv);
  

  _img_iknow=new Texture.fromImage('img/ui_iknow.png');
  _img_iknow.frame=new　Rectangle(0,0,323,84);

  let _btn_iknow=new Sprite(_img_iknow); 
  
  _btn_iknow.scale.set(button_scale,button_scale);

  _btn_iknow.x=app.stage.width/2-_btn_iknow.width/2;
  _btn_iknow.y=(info_back2.y+info_back2.height+whei)/2-_btn_iknow.height/2;
  
  _btn_iknow.interactive=true;
  _btn_iknow.buttonMode=true;
  _btn_iknow.on('pointerdown',onClickIknow);
  _container_intro.addChild(_btn_iknow);

  

}

function setupGame(){

  //'E3D0E4FF','E3D0E451'
  _container_game.x=offsetx;
  _container_game.y=offsety;

  let graphics_=new PIXI.Graphics();
  // graphics_.x=offsetx;
  // graphics_.y=offsety;
  
  graphics_.beginFill(0xFFFFFF);
  graphics_.drawRect(0,0,gwid*mgridx,gwid*mgridy);
  graphics_.endFill();

  for(var i=0;i<mgridx;++i){
    for(var j=0;j<mgridy;++j){
      if((i+j)%2==0) graphics_.beginFill(0xE3D0E4,1);
      else graphics_.beginFill(0xE3D0E4,.5);
      graphics_.drawRect(i*gwid,j*gwid,gwid,gwid);
      graphics_.endFill();
    }
  }

  graphics_.beginFill(0xFCEB74);
    graphics_.drawRect(0,gwid*mgridy-10,10,10);
    graphics_.drawRect(gwid*mgridx-10,gwid*mgridy-10,10,10);
  graphics_.endFill();

  _container_game.addChild(graphics_);

  initSnake();

}
function setupResult(){

  let logo=new Sprite(resources["img/logo.png"].texture);
  logo.x=wwid*.11;
  let lscale=wwid*.3/logo.width;
  logo.scale.set(lscale,lscale);

  let recommand=new PIXI.NineSlicePlane(Texture.from('img/recommand.png'),372,65,60,60);
  recommand.width=wwid*0.77;
  recommand.x=wwid*.11;
  recommand.y=(whei-offsety)*.44;

  _img_replay=new Texture.fromImage('img/ui_replay.png');
  _img_replay.frame=new　Rectangle(0,0,127,84);

  let _btn_replay=new Sprite(_img_replay); 
  _btn_replay.scale.set(button_scale,button_scale);

  _btn_replay.x=wwid*.11;  
  _btn_replay.y=(whei+recommand.y+recommand.height)/2-_btn_replay.height/2;

  _btn_replay.interactive=true;
  _btn_replay.buttonMode=true;
  _btn_replay.on('pointerdown',onClickReplay);



  _img_share=new Texture.fromImage('img/ui_share.png');
  _img_share.frame=new　Rectangle(0,0,268,84);

  let _btn_share=new Sprite(_img_share); 
  _btn_share.scale.set(button_scale,button_scale);

  _btn_share.y=_btn_replay.y
  _btn_share.interactive=true;
  _btn_share.buttonMode=true;
  _btn_share.on('pointerdown',onClickShare);



  _img_signup=new Texture.fromImage('img/ui_signup.png');
  _img_signup.frame=new　Rectangle(0,0,268,84);

  let _btn_signup=new Sprite(_img_signup); 
  _btn_signup.scale.set(button_scale,button_scale);

  _btn_signup.x=wwid*.89-_btn_signup.width;  
  _btn_signup.y=_btn_replay.y;

  _btn_signup.interactive=true;
  _btn_signup.buttonMode=true;
  _btn_signup.on('pointerdown',function(){
    _img_signup.frame=new Rectangle(0,84,268,84);
    window.open('http://www.youngvoice.tw/content/award/award_index.aspx?id=10','_blank');
  });

  _btn_share.x=(_btn_replay.x+_btn_replay.width+_btn_signup.x)/2-_btn_share.width/2;  
  logo.y=(offsety+recommand.y)/2-logo.height/2;
  

  

  _container_result.addChild(logo);
  _container_result.addChild(recommand);
  _container_result.addChild(_btn_replay);
  _container_result.addChild(_btn_share);
  _container_result.addChild(_btn_signup);

  
}


function onClickStart(){
  _img_start.frame=new Rectangle(0,84,323,84);
  _container_game.visible=true;
  _container_start.visible=false;
  resetGame();
  startGame();
}

function onClickIknow(){
  _img_iknow.frame=new Rectangle(0,84,323,84);
  _container_intro.visible=false;

  if(_container_intro.visible) pauseGame();
  else{
      if(_container_game.visible) startGame();
  }
}
function onClickReplay(){
  _img_replay.frame=new Rectangle(0,84,127,84);
  resetGame();
  startGame();

  _container_game.visible=true;
  _container_result.visible=false;
  

}
function onClickShare(){
  _img_share.frame=new Rectangle(0,84,268,84);
}

