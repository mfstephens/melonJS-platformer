/*------------------- 
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 20);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation("walk", [0,1,2,3,4,5,8,9], 1);
        this.addAnimation("jump", [12], 5);
        this.addAnimation("stand", [10]);

        this.setCurrentAnimation("walk");
        console.log("poop");

 
    },

    //update animation
    updateAnimation: function(){
        if(this.vel.x == 0){
            this.setCurrentAnimation("stand");
        }
        else{
            this.setCurrentAnimation("walk");
        }
        if(this.jumping || this.falling){
            this.setCurrentAnimation("jump");
        }
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
        this.updateAnimation();
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
            }
        }

        // check & update player movement
        this.updateMovement();
        this.parent(this);
        return true;
    }
 
});