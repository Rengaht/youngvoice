var app;

// window.onload=function(){
// 	setupPixi();
// }

function setupPixi(){
	app= new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
	  }
	);

	document.getElementById('pixi_frame').appendChild(app.view);

	PIXI.loader
	  .add("img/logo.png")
	  .load(testsetup);

}

var sprite;
function testsetup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["img/logo.png"].texture
  );
  app.stage.addChild(sprite);
  app.ticker.add(function(delata){
  	sprite.rotation+=1;
  });
}