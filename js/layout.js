function loadGame(){
  // loader.add([
  // 'img/bgd.png','img/frame.png','img/frame-shadow.png','img/logo.png','img/bar.png','img/bar-snake.png','img/title.png','img/title-text.png',
  // 'img/ui_sound.png','img/hambuger.png','img/ui_start.png'
  // ]).load(setupbgd);

  loader.add([
  'img/ui_iknow.png',
  'img/game.png','img/team.png','img/website.png','img/info.png','img/info_back.png',
  'img/hint-mobile.png','img/hint-pc.png',
  'img/snake/head-normal.png','img/snake/head-eat.png','img/snake/head-dead.png',
  'img/snake/body-horizontal.png','img/snake/body-vertical.png',
  'img/snake/body-left-top.png','img/snake/body-left-bottom.png','img/snake/body-right-top.png','img/snake/body-right-bottom.png',
  'img/snake/tail.png',
  'img/snake/shadow-normal.png','img/snake/shadow-eat.png','img/snake/shadow-dead.png',
  'img/snake/shadow-horizontal.png','img/snake/shadow-vertical.png',
  'img/snake/shadow-left-top.png','img/snake/shadow-left-bottom.png','img/snake/shadow-right-top.png','img/snake/shadow-right-bottom.png',
  'img/snake/shadow-tail.png',
  'img/recommand.png',
  'img/ui_replay.png','img/ui_share.png','img/ui_signup.png',
  'img/food/2-1.png','img/food/2-2.png','img/food/3-1.png','img/food/3-2.png','img/food/3-3.png','img/food/3-4.png',
  'img/food/4.png','img/food/5-1.png','img/food/5-2.png','img/food/5-3.png','img/food/5-4.png',
  'data/keyword.json','data/sentence.json','data/food_pattern.json'
  ]).on('progress',loadProgressHandler).load(setup);


}

var sprite;
function testsetup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["img/game.png"].texture
  );
  app.stage.addChild(sprite);
  app.ticker.add(function(delata){
    sprite.rotation+=1;
  });
}
function setup(){

  // _bar.visible=false;
  // _bar_snake.visible=false;
  // _btn_start.visible=true;
  // _snake_stop=true;
  
  loadData();

  _container_game=new PIXI.Container();
  _container_game.visible=true;

  // let mask_=new PIXI.Sprite(Texture.WHITE);
  // mask_.width=wwid-FRAME_BORDER;
  // mask_.height=whei-FRAME_BORDER;
  // _container_game.addChild(mask_);
  // _container_game.mask=mask_;
  app.stage.addChild(_container_game);


  setupGrid();
  setupSnake();

  
}


function setupGrid(){

  //'E3D0E4FF','E3D0E451'
  // _container_game.x=offsetx;
  // _container_game.y=offsety;

  _graphics_grid=new PIXI.Graphics();
  _container_game.addChild(_graphics_grid);
  // graphics_.x=offsetx;
  // graphics_.y=offsety;
  resetGrid();

}
function resetGrid(){
  if(_graphics_grid===null) return;
  app.stage.width=wwid;
  app.stage.height=whei;

  _container_game.width=wwid;
  _container_game.height=whei;

  _graphics_grid.width=wwid;
  _graphics_grid.height=whei;

  _graphics_grid.clear();
  _graphics_grid.beginFill(0xFCEB74);
  _graphics_grid.drawRect(0,0,app.stage.width,app.stage.height);
  _graphics_grid.endFill();

  for(var i=0;i<mgridx;++i){
    for(var j=0;j<mgridy;++j){
      if((i+j)%2==0) _graphics_grid.beginFill(0xE3D0E4,1);
      else _graphics_grid.beginFill(0xE3D0E4,.5);
      _graphics_grid.drawRect(i*gwid,j*gwid,gwid,gwid);
      _graphics_grid.endFill();
    }
  }


  _graphics_grid.beginFill(0xFCEB74);
    _graphics_grid.drawRect(gwid*mgridx,0,wwid-gwid*mgridx,whei);
    _graphics_grid.drawRect(0,gwid*mgridy,wwid,whei-gwid*mgridy);
  _graphics_grid.endFill();

  // _container_game.addChild(graphics_);
  app.renderer.render(_graphics_grid);
}


function setSampleText(data_){

  if(data_.type==='empty'){
     document.getElementById('sample_text').innerHTML='oops! 資料庫建置中!';  
  }else{      
    document.getElementById('sample_text').innerHTML=data_.title+'<br>'+data_.text;
    if(data_.type!='text'){
        document.getElementById('sample_image').src=data_.imgurl;
    }
  }
  // TODO:img!!!


}

