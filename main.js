// game resources
var g_resources = [
	{name: "ground2", type: "image", src: "data/ground2.png"}, 
	{name: "metatiles", type: "image", src: "data/metatiles.png"},
	{name: "area01", type: "tmx", src: "data/area01.tmx"},
	{name: "character", type: "image", src: "data/character.png"}
];
 
var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('jsapp', 800, 600, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "sound engine"
		me.audio.init("mp3,ogg");
 
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
	   me.state.set(me.state.PLAY, new PlayScreen());
	     
	   // add our player entity in the entity pool
	   me.entityPool.add("mainPlayer", PlayerEntity);
	             
	   // enable the keyboard
	   me.input.bindKey(me.input.KEY.LEFT,  "left");
	   me.input.bindKey(me.input.KEY.RIGHT, "right");
	   me.input.bindKey(me.input.KEY.X,     "jump", true);
	      
	   // start the game 
	   me.state.change(me.state.PLAY);
	}
 
};
// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // stuff to reset on state change
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
});