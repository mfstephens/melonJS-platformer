//game resources
var g_resources = [
	{name: "ground_tiles", type: "image", src: "data/ground_tiles.png"}, 
	{name: "gameover", type: "image", src: "data/other/gameover.png"}, 
	{name: "heart", type: "image", src: "data/other/heart_1.png"}, 
	{name: "metatiles", type: "image", src: "data/metatiles.png"},
	{name: "area01", type: "tmx", src: "data/area01.tmx"},
    {name: "sky_backdrop", type: "image", src: "data/sky_backdrop.png"},
	{name: "game_over", type: "tmx", src: "data/game_over.tmx"},
	{name: "character", type: "image", src: "data/character.png"},
    {name: "jump", type: "audio", src: "data/audio/", channel: 1},
    {name: "outdoor_sound", type: "audio", src: "data/audio/", channel: 2}
];

//score hud item 
var LivesObject = me.HUD_Item.extend({
    init: function() {
        // call the parent constructor
        this.parent();
        // create a font
        this.value=0;
    },
 
    /* -----
 
    draw our score
 
    ------ */
    draw: function(context, x, y) {
        this.text= new me.Font("Courier", 20, "black");
        this.text.draw(context, "Deaths: " + this.value, 5, 30);
    }
 
});

var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('jsapp', 800, 600, false, 1.0)) {
            alert("Sorry, but your browser does not support html 5 canvas.");
            return;
        }


        me.video.scale(me.video.getScreenContext(), 1);

        // initialize the "sound engine"
		me.audio.init("mp3,ogg");

 		me.gameOver=false;
        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);
 
        // set all resources to be loaded
        me.loader.preload(g_resources);
 
        // load everything & display a loading screen
        me.state.change(me.state.LOADING);

    },
 
    /* ---
 
     callback when everything is loaded
 
     --- */
    loaded: function ()
	{
	   // set the "Play/Ingame" Screen Object
	   var my_screen=me.state.set(me.state.PLAY, new PlayScreen());

	   // add our player entity in the entity pool
	   me.entityPool.add("mainPlayer", PlayerEntity);

	   // enable the keyboard
	   me.input.bindKey(me.input.KEY.LEFT, "left");
	   me.input.bindKey(me.input.KEY.RIGHT, "right");
	   me.input.bindKey(me.input.KEY.UP, "jump", true);
	   // start the game 
	   me.state.change(me.state.PLAY);
	}
 
};
// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // stuff to reset on state change
        me.game.addHUD(0, 0);

        me.audio.play("outdoor_sound", true);
 
        // add a new HUD item
        me.game.HUD.addItem("lives", new LivesObject());
 
        // load a level       
        me.levelDirector.loadLevel("area01");
    },
 
    /* ---
 
     action to perform when game is finished (state change)
 
     --- */
    onDestroyEvent: function() {
    }
 
});
 
//bootstrap :)
window.onReady(function() {
    jsApp.onload();
   	//me.debug.renderHitBox = true;
});
