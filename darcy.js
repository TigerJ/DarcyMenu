ig.module(
	'plugins.darcy'
)
.requires(
	'impact.impact',
	'impact.system'
)
.defines(function(){
    ig.Darcy = ig.Class.extend({
        MenuItems:[],//array of item objects added with .addItem
        cFillStyle:"",
        Font:"",
        TextAlign:"center",
        Stroke:false,
        StrokeType:"",
        Corner:0,
        ButtonSize:{x:0,y:0},
        Spacing:{x:0,y:0},
        MenuStart:{x:0,y:0},
        MenuLayout:"",
        DrawBoxes:false,
        BoxStrokeStyle:null,
        BoxStrokeWidth:null,
        init: function(){
            
        },
        update: function(){
            this.updateMenuItems();
        },
        updateMenuItems: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                this.MenuItems[i].update();
            }
        },
        draw: function(){
            //determin if the item is an impactfont or not
            if(this.isImpactfont)
            {
                //do impact font drawing codes here
            }
            else
            {
                //console.log("drawing");
                
                for (i=0;i<this.MenuItems.length;i++)
                {
                    //ig.system.context.textBaseline = 'top';
                    ig.system.context.fillStyle=this.cFillStyle;
                    ig.system.context.textAlign=this.TextAlign;
                    ig.system.context.font=this.Font;
                    if(this.DrawBoxes)
                    {
                        ig.system.context.StrokeStyle=this.BoxStrokeStyle;
                        ig.system.context.LineWidth=this.BoxStrokeWidth;
                    }
                    if(this.MenuLayout=="H")
                    {
                        
                        //if horizontal meny spacing applies to x and not y
                        ig.system.context.fillText(this.MenuItems[i].text,this.MenuStart.x+((this.ButtonSize.x+this.Spacing.x)*(i)),this.MenuStart.y);
                    }
                    if(this.MenuLayout=="V")
                    {
                        this.drawItems();
                    }
                    
                    //experiment with draw corners
                    /*
                    var rectWidth = 200;
                    var rectHeight = 100;
                    var rectX = canvas.width / 2 - rectWidth / 2;
                    var rectY = canvas.height / 2 - rectHeight / 2;
                    var cornerRadius = 60;
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(rectX, rectY);
                    ig.system.context.lineTo(rectX + rectWidth - cornerRadius, rectY);
                    ig.system.context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
                    ig.system.context.lineTo(rectX + rectWidth, rectY + rectHeight);
                    ig.system.context.lineWidth = 5;
                    ig.system.context.strokeStyle="white";
                    ig.system.context.stroke();*/
                }
            }
        },
        drawItems: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                this.MenuItems[i].draw();
            }
            
        },
        addItem: function(menutext, menulabel, inputAction,inputEvent){
            var dItem = new ig.DarcyItem();
            dItem.text = menutext;
            dItem.label = menulabel;
            dItem.inputAction = inputAction;
            dItem.inputEvent = inputEvent;
            dItem.drawBox = this.DrawBoxes;
            dItem.boxStrokeStyle = this.BoxStrokeStyle;
            dItem.boxStrokeWidth = this.BoxStrokeWidth;
            if(this.MenuLayout=="V")
            {
                dItem.leftBounds = this.MenuStart.x;
                dItem.rightBounds = this.MenuStart.x+(this.ButtonSize.x+this.Spacing.x);
                dItem.upperBounds = this.MenuStart.y+((this.ButtonSize.y+this.Spacing.y)*(this.MenuItems.length));
                dItem.lowerBounds = this.MenuStart.y+((this.ButtonSize.y+this.Spacing.y)*(this.MenuItems.length))+this.ButtonSize.y;
            }
            //console.log(dItem);
            this.MenuItems.push( dItem );
        },
        removeItem: function(label)
        {
            //loop items and remove where label== i.label
        }
    });
    ig.DarcyItem = ig.Class.extend({
        update: function(){
            if(ig.input.mouse.x*2>this.leftBounds&&ig.input.mouse.x*2<this.rightBounds&&ig.input.mouse.y*2>this.upperBounds&&ig.input.mouse.y*2<this.lowerBounds)
            {
                //console.log("mouse inside"+this.lowerBounds);
                if(ig.input.pressed(this.inputAction))
                {
                    this.inputEvent();
                }
            }
        },
        draw: function(){
            ig.system.context.fillText(this.text,this.rightBounds/2,this.lowerBounds-((this.lowerBounds-this.upperBounds)/2)+(this.boxStrokeWidth*2));
            if (this.drawBox)
            {
                ig.system.context.strokeStyle=this.boxStrokeStyle;
                ig.system.context.lineWidth=this.boxStrokeWidth;
                //ig.system.context.fillRect(this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
                ig.system.context.strokeRect(this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
            }
            
        }
    });
});