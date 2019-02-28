function loadGame(){
  // loader.add([
  // 'img/bgd.png','img/frame.png','img/frame-shadow.png','img/logo.png','img/bar.png','img/bar-snake.png','img/title.png','img/title-text.png',
  // 'img/ui_sound.png','img/hambuger.png','img/ui_start.png'
  // ]).load(setupbgd);

  loader.add([
  'img/logo.png',
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
  'img/textrunner/text-01.png','img/textrunner/text-03.png','img/textrunner/text-04.png','img/textrunner/text-05.png',
  'img/textrunner/text-06.png','img/textrunner/text-07.png','img/textrunner/text-08.png','img/textrunner/text-09.png','img/textrunner/text-10.png',
  'img/textrunner/text-12.png','img/textrunner/text-13.png','img/textrunner/text-14.png','img/textrunner/text-15.png',
  'img/textrunner/text-16.png','img/textrunner/text-17.png','img/textrunner/text-18.png','img/textrunner/text-19.png','img/textrunner/text-20.png',
  'img/textrunner/text-21.png','img/textrunner/text-22.png','img/textrunner/text-23.png','img/textrunner/text-24.png','img/textrunner/text-25.png',
  'img/textrunner/text-26.png','img/textrunner/text-27.png','img/textrunner/text-28.png','img/textrunner/text-29.png',
  'img/textrunner/text-31.png','img/textrunner/text-33.png',
  'data/keyword.json','data/sentence.json','data/food_pattern.json',
  
  ]).on('progress',loadProgressHandler).load(setup);


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

  setupRunner();

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



  // if(_container_snake){
  //   var xmax=0,ymax=0;
  //   for(var i in _body){
  //     if(_body[i].x>xmax) xmax=_body[i].x;
  //     if(_body[i].y>ymax) ymax=_body[i].y;
  //   }

  //   xmax*=gwid;
  //   ymax*=gwid;
  //   let dx=pre_wid-xmax;
  //   let dy=pre_hei-ymax;

  //   let s_=_container_snake.children;
  //   for(var k in s_){
  //       if(xmax>wwid) s_[k].x-=dx;
  //       if(ymax>whei) s_[k].y-=dy;
  //   }
  //   let ss_=_container_shadow.children;
  //   for(var k in ss_){
  //       if(xmax>wwid) ss_[k].x-=dx;
  //       if(ymax>whei) ss_[k].y-=dy;
  //   }
  // }
  app.stage.addChild(_container_game);

  app.renderer.render(app.stage);
  
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

