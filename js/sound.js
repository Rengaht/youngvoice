var _sound_back,_sound_eat,_sound_dead,_sound_pop,_sound_button;
var _play_sound=true;

function loadMusic(){  
  _sound_back=new Howl({
    src:['sound/back.wav','sound/back.ogg'],
    loop:true,
    onend: function(){
      // console.log('Finished!');
    },
    onplayerror: function() {
      _sound_back.once('unlock', function() {
        _sound_back.play();
      });
    }
  });

  _sound_eat=new Howl({
    src:['sound/eat.wav','sound/eat.ogg']
  });
  _sound_dead=new Howl({
    src:['sound/dead.wav','sound/dead.ogg']
  });

  _sound_pop=new Howl({
    src:['sound/pop.wav','sound/pop.ogg']
  });
  _sound_button=new Howl({
    src:['sound/button.wav','sound/button.ogg']
  });


  _play_sound=false;
}

function  toggleMusic(){

    _play_sound=!_play_sound;
    if(!_play_sound){
      _sound_back.pause();
     
      $('#music_button_on').addClass('hidden');
      $('#music_button_off').removeClass('hidden');
    }else{
      _sound_back.play();
      $('#music_button_off').addClass('hidden');
      $('#music_button_on').removeClass('hidden');
    }

}

function playBackMusic(){

  if(_play_sound) return;

  console.log('play bgm!!');
  _play_sound=true;
  _sound_back.play();   
  
 // document.getElementById('music_button').src="img/ui_sound.png";
  $('#music_button_off').addClass('hidden');
  $('#music_button_on').removeClass('hidden');
}
function playEatSound(){
  if(_play_sound)  _sound_eat.play();
}
function playDeadSound(){
  if(_play_sound)  _sound_dead.play();

}
function playPopSound(){
  if(_play_sound) _sound_pop.play();
}

function playButtonSound(){
  if(_play_sound) _sound_button.play();
}