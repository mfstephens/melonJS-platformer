/*-------------------
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({

    /* -----

    constructor

    ------ */

    init: function(x, y, settings) {
        console.log(this);
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(4, 16);

        this.updateColRect(17,40,-1,0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation("walk", [0,1,2,3,4,5,6,7,8,9], 2);
        this.addAnimation("jump", [12]);
        this.addAnimation("stand", [10,11,13,10,11,13,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10,10,
                                    10,10,10,10,10,10], 5);

        this.doubleJumping = false;

    },

    die: function () {
        alert('poop');
    },

    handleFallOffMap: function () {
        if (this.pos.y > 500) {
            this.die();
        }
    },

    //update animation
    updateAnimation: function(){
        if(this.vel.x === 0){
            this.setCurrentAnimation("stand");
        }
        else{
            if(this.getCurrentAnimationFrame() === 9){
                this.setAnimationFrame(0);
            }
            this.setCurrentAnimation("walk");
        }
        if(this.jumping || this.falling){
            this.setCurrentAnimation("jump");
        }
    },

    updateInAir: function () {
        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
        }

        if (me.input.isKeyPressed('jump') && !this.doubleJumping) {
            this.forceJump();
            this.doubleJumping = true;
        }
    },

    updateOnGround: function () {
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
                // horizontal speed when we jumped.
                this.doJump();
            }
        }
    },

    /* -----

    update the player pos

    ------ */
    update: function() {
        if (this.jumping || this.falling) {
            this.updateInAir();
        } else {
            this.doubleJumping = false;
            this.updateOnGround();
        }

        this.updateAnimation();
        this.handleFallOffMap();


        // check & update player movement
        this.updateMovement();
        this.parent(this);
        return true;
    }

});