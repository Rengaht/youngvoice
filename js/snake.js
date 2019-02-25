var Container,autoDetectRenderer,loader,resources,Sprite,Texture,Rectangle;
var type;
var app;
var wid,whei;
var FRAME_BORDER;


var _bar_snake,_bar;
var _img_music,_btn_music,_play_music;
var _img_start,_img_iknow,_img_share,_img_replay,_img_signup;
var _container_game;
var _sample_content,_sample_title_text,_recommand_back;
var _graphics_grid=null;

let MIN_GRID=10;
let MAX_GRID=18;

var offsetx,offsety,gwid;

var button_scale;
let text_margin=FRAME_BORDER*2;

var marginx,marginy;
var landscape;
var _title_hei;



function setupPixi(){

  Container = PIXI.Container;
  autoDetectRenderer = PIXI.autoDetectRenderer;
  loader = PIXI.loader;
  resources = PIXI.loader.resources;
  Sprite = PIXI.Sprite;
  Texture=PIXI.Texture;
  Rectangle=PIXI.Rectangle;

  type = "WebGL";
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  app=new PIXI.Application({
    autoResize:true,
    resolution: devicePixelRatio,
    antialias:true,
    transparent:true
  });

  app.renderer.backgroundColor = 0x000000;
  // app.ticker.start();

  document.getElementById('pixi_frame').appendChild(app.view);

  wwid=app.screen.width; // window size
  whei=app.screen.height;
  FRAME_BORDER=5;

  window.addEventListener('resize', resize);
  resize();

  loadGame();

}


function resize() {
  // const parent = app.view.parentNode;
  const parent=document.getElementsByClassName('innerFrame')[0];
  app.renderer.resize(parent.clientWidth, parent.clientHeight);
  // rect.position.set(app.screen.width, app.screen.height);


  wwid=app.screen.width;
  whei=app.screen.height;
  console.log('reset size:'+wwid+' x '+whei);

  landscape=(wwid>whei);

  offsetx=FRAME_BORDER;
  offsety=FRAME_BORDER/2;
  // gwid=Math.min((whei-offsety)/MIN_GRID,(wwid-offsetx)/MIN_GRID);


  gwid=Math.max(wwid,whei)/MAX_GRID;


  mgridx=Math.floor((wwid)/gwid);
  mgridy=Math.floor((whei)/gwid);

  if(Math.min(mgridx,mgridy)<MIN_GRID){

    gwid=Math.min(wwid,whei)/MIN_GRID;

    mgridx=Math.floor((wwid)/gwid);
    mgridy=Math.floor((whei)/gwid);

  }


  console.log(mgridx+' '+(wwid-gwid*mgridx)+' x '+mgridy+' '+(whei-gwid*mgridy));



  button_scale=Math.min(wwid/906,1);
  
  _title_hei=60;

  
  resetGrid();
}




function loadProgressHandler(loader,resource){
  //console.log('progress: '+loader.progress+'%');
  // if(_bar_snake && _bar) _bar_snake.width=_bar.width*loader.progress/100.0;

}


