ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'plugins.darcy',
    'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	darcy: new ig.Darcy(),
	darcy2: new ig.Darcy(),
	init: function() {
        
        ig.input.bind(ig.KEY.MOUSE1,'shoot');
        this.darcy.ButtonProperties={
            FontFillStyle:"red",
            FontFillOverStyle:"white",
            Font:"14pt arial",
            TextAlign:"center",
            Spacing:{x:5,y:5},
            ButtonSize:{x:100,y:30},
            DrawBoxes:true,
            BoxStrokeStyle:"#fff",
            BoxStrokeWidth:2,
            Corner:5,
            BackFillOverStyle:"pink",
            BackFillStyle:"purple"};
        this.darcy.DrawMenuBorder=true;
        this.darcy.MenuBorderStyle="orange";
        this.darcy.MenuBorderWidth="2";
        this.darcy.MenuBorderCorner=0;
        this.darcy.MenuLayout="H";
        this.darcy.MenuStart.x=5;
        this.darcy.MenuStart.y=5;
        this.darcy.MenuSize={width:310,height:30};
        this.darcy.MenuPadding={x:5,y:5};
        this.darcy.addItem("voilett","dog","shoot", function(){console.log("german shepard dog");});
        this.darcy.addItem("polaris","cat","shoot", function(){console.log("black cat");});
        this.darcy.addItem("atticus","horse","shoot", function(){console.log("horse");});
        //second darcy
         this.darcy2.ButtonProperties={
            FontFillOverStyle:"white",
            FontFillStyle:"red",
            Font:"12pt serif",
            TextAlign:"center",
            Spacing:{x:5,y:5},
            ButtonSize:{x:100,y:20},
            DrawBoxes:true,
            BoxStrokeStyle:"#fff",
            BoxStrokeWidth:2,
            BackFillOverStyle:"grey",
            BackFillStyle:"brown"};
        this.darcy2.MenuLayout="V";
        this.darcy2.MenuStart.x=20;
        this.darcy2.MenuStart.y=65;
        this.darcy2.addItem("voilett","dog","shoot", function(){console.log("german shepard dog");});
        this.darcy2.addItem("polaris","cat","shoot", function(){console.log("black cat");});
        this.darcy2.addItem("atticus","horse","shoot", function(){console.log("horse");});
        
		// Initialize your game here; bind keys etc.
	},
	update: function() {
        this.darcy.update();
        this.darcy2.update();
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;

		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
        this.darcy.draw();
        this.darcy2.draw();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
