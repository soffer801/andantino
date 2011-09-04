function Hex(x,y){
    this.x = x;
    this.y = y;
    this.color = "lightgray";
    this.touching = 0;

    this.ptrs= new Array(null, null, null, null, null, null);

}

Hex.prototype.extend({
    dirList: new Array(-1, -1, 0, 1, 1, 0),

    toString: function(){
	return "[" + this.color + " hex at (" + this.x + "," + this.y + ")]";
    },

    buildNeighbors: function(gm){
	for(var i = 0; i<6; ++i){
	    if(this.ptrs[i] == null){
		var h = new Hex(this.x + Hex.prototype.dirList[i], this.y + Hex.prototype.dirList[(i+5)%6]);

		//set up the pointers properly
		if(this.ptrs[(i+5)%6] != null){
		    this.ptrs[(i+5)%6].ptrs[(i+1)%6] = h;
		    h.ptrs[(i+4)%6] = this.ptrs[(i+5)%6];
		}
		if(this.ptrs[(i+1)%6] != null){
		    this.ptrs[(i+1)%6].ptrs[(i+5)%6] = h;
		    h.ptrs[(i+2)%6] = this.ptrs[(i+1)%6];
		}

		this.ptrs[i] = h;
		h.ptrs[(i+3)%6] = this;


		gm.hexes.pushBack(h);
	    }

	    //show the ones you can click on
	    this.ptrs[i].touching++;
	    if(this.ptrs[i].touching == 2){
		this.ptrs[i].color = "gray";
		this.ptrs[i].draw(gm.ctx,20);
	    }
	}
	
    },

    draw: function(ctx,s){
	ctx.save();
	ctx.translate(1.5*this.x*s,(this.y*1.732-0.866*this.x)*s);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(s,0);
	ctx.lineTo(s*1.5,s*0.866);
	ctx.lineTo(s,s*1.732);
	ctx.lineTo(0,s*1.732);
	ctx.lineTo(-s/2,s*0.866);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.restore();
    }

    
});