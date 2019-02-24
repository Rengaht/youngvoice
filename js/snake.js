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
let MAX_GRID_X=15;
let MAX_GRID_Y=15;

var offsetx,offsety,gwid;
var mgridx,mgridy;
var button_scale;
let text_margin=FRAME_BORDER*2;

function resetGrid(){
  

  wwid=app.screen.width;
  whei=app.screen.height;

  

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
var _sample_content,_sample_title_text,_recommand_back;

var _title_hei;
var _textrunner;

// load
loader.add([
  'img/bgd.png','img/frame.png','img/frame-shadow.png','img/logo.png','img/bar.png','img/bar-snake.png','img/title.png','img/title-text.png',
  'img/ui_sound.png','img/hambuger.png','img/ui_start.png'
  ]).load(setupbgd);


function loadProgressHandler(loader,resource){
  //console.log('progress: '+loader.progress+'%');
  if(_bar_snake && _bar) _bar_snake.width=_bar.width*loader.progress/100.0;

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
  // resetGame();
  // startGame();

  resetIntro();
  _container_start.visible=true;
  _container_result.visible=false;
  

}
function onClickShare(){
  _img_share.frame=new Rectangle(0,84,268,84);
  uploadImage(_output_blob);
  
}


function resetIntro(){
   _img_start.frame=new Rectangle(0,0,323,84);
}
function resetResult(){

  _img_replay.frame=new Rectangle(0,0,127,84);
  _img_share.frame=new Rectangle(0,0,268,84);
  _img_signup.frame=new Rectangle(0,0,268,84);

}