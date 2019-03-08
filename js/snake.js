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

var MIN_GRID=10;
var MAX_GRID=18;

var offsetx,offsety;
var gwid=60;

var button_scale;
var text_margin=FRAME_BORDER*2;

var marginx,marginy;
var landscape;
var _title_hei;

var pre_wid,pre_hei;
var pre_mgridx,pre_mgridy;
var mgridx,mgridy;
var _orientation;


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
    transparent:true,
    // backgroundColor:0x061639
  });

  app.renderer.backgroundColor = 0x061639;
  // app.ticker.start();

  document.getElementById('pixi_frame').appendChild(app.view);

  wwid=app.screen.width; // window size
  whei=app.screen.height;
  FRAME_BORDER=5;

  // _orientation=(wwid>whei)?'landscape':'portrait';
  window.addEventListener('resize', resize);

  doResize();

  

}

var _resizing;
function resize(){
  clearTimeout(_resizing);
  _resizing=setTimeout(doResize, 100);
}

function doResize(){

  // var ww_=$(window).width();
  // var wh_=$(window).height();
  
  // alert(new_orient);
 

  var ww_ = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
  var wh_ = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  console.log('window size:'+ww_+' x '+wh_);

  var tmpw_=ww_*.99;
  var tmph_=wh_*.99;

  var tt=$('#frame_title').height();
  var innerw=tmpw_-5-13;
  var innerh=tmph_-tt-10-13;

  tmpw_=Math.floor(innerw/60)*60;
  tmph_=Math.floor(innerh/60)*60;
  $('#outer_frame').css('width',(tmpw_+13+5)+'px');
  $('#outer_frame').css('height',(tmph_+tt+10+13)+'px');
  $('#outer_frame').css('left',((ww_-8)/2-(tmpw_+18)/2)+'px');
  $('#outer_frame').css('top',(wh_/2-(tmph_+tt+23)/2)+'px');

  $('#inner_frame').css('min-height',tmph_+'px');


  app.stage.removeChild(_container_game);

  // const parent = app.view.parentNode;
  // const parent=document.getElementsByClassName('innerFrame')[0];
  app.renderer.resize(tmpw_,tmph_);
  // rect.position.set(app.screen.width, app.screen.height);
  // app.renderer.view.style.width=parent.clientWidth+'px';
  // app.renderer.view.style.height=parent.clientHeight+'px';

  pre_wid=wwid;
  pre_hei=whei;

  wwid=tmpw_;
  whei=tmph_;
  console.log('reset size:'+wwid+' x '+whei);

  // landscape=(wwid>whei);

  var new_orient=(wwid>whei)?'landscape':'portrait';
  // alert(new_orient);

  offsetx=FRAME_BORDER;
  offsety=FRAME_BORDER/2;

  pre_mgridx=mgridx;
  pre_mgridy=mgridy;

  mgridx=Math.floor((wwid)/gwid);
  mgridy=Math.floor((whei)/gwid);

  console.log(mgridx+' '+(wwid-gwid*mgridx)+' x '+mgridy+' '+(whei-gwid*mgridy));
  
  resetGrid();

  if(_orientation&&new_orient!=_orientation){
      rotateSnake();
      resetFoodPos();
  } 
  _orientation=new_orient;

}


var loading_progress=0;
var progress_after_font;

function loadingSnake(){
  loading_progress=Math.min(loading_progress+1,20);
  setLoadingProgress();
}
function loadProgressHandler(loader,resource){
  //console.log('progress: '+loader.progress+'%');
  // if(_bar_snake && _bar) _bar_snake.width=_bar.width*loader.progress/100.0;
  loading_progress=(100-progress_after_font)/100*loader.progress+progress_after_font;
  setLoadingProgress();

}
function setLoadingProgress(){
  var dest_len=297;
  var src_len=20;

  var current_len=(dest_len-src_len)/100*loading_progress+src_len;

  $('#loading_snake_body').css('width',current_len);
  $('#loading_snake_head').css('left',current_len+33);
}

