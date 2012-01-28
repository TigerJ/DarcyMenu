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
        ButtonProperties:{
            Font:"",
            TextAlign:"center",
            Stroke:false,
            StrokeType:"",
            Corner:0,
            ButtonSize:{x:0,y:0},
            Spacing:{x:0,y:0},
            DrawBoxes:false,
            BoxStrokeStyle:null,
            BoxStrokeWidth:null,
            cFillStyle:""
        },
        MenuStart:{x:0,y:0},
        MenuLayout:"",
        init: function(ButtonProperties){
            ig.merge(this.ButtonProperties, ButtonProperties);
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
                    ig.system.context.fillStyle=this.ButtonProperties.cFillStyle;
                    ig.system.context.textAlign=this.ButtonProperties.TextAlign;
                    ig.system.context.font=this.ButtonProperties.Font;
                    if(this.DrawBoxes)
                    {
                        ig.system.context.StrokeStyle=this.ButtonProperties.BoxStrokeStyle;
                        ig.system.context.LineWidth=this.ButtonProperties.BoxStrokeWidth;
                    }
                    if(this.MenuLayout=="H")
                    {
                        
                        //if horizontal meny spacing applies to x and not y
                        this.drawItems();
                        //ig.system.context.fillText(this.MenuItems[i].text,this.MenuStart.x+((this.ButtonSize.x+this.Spacing.x)*(i)),this.MenuStart.y);
                    }
                    if(this.MenuLayout=="V")
                    {
                        this.drawItems();
                    }
                    
                    
                    
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
        addItem: function(menutext, menulabel, inputAction, inputEvent){
            var dItem = new ig.DarcyItem();
            dItem.text = menutext;
            dItem.label = menulabel;
            dItem.inputAction = inputAction;
            dItem.inputEvent = inputEvent;
            dItem.drawBox = this.ButtonProperties.DrawBoxes;
            dItem.boxStrokeStyle = this.ButtonProperties.BoxStrokeStyle;
            dItem.boxStrokeWidth = this.ButtonProperties.BoxStrokeWidth;
            dItem.CornerRad = this.ButtonProperties.Corner;
            dItem.MenuLayout=this.MenuLayout;
            if(this.MenuLayout=="V")
            {
                dItem.leftBounds = this.MenuStart.x;
                dItem.rightBounds = this.MenuStart.x+(this.ButtonProperties.ButtonSize.x);
                dItem.upperBounds = this.MenuStart.y+((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*(this.MenuItems.length));
                dItem.lowerBounds = this.MenuStart.y+((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*(this.MenuItems.length))+this.ButtonProperties.ButtonSize.y;
            }
            if(this.MenuLayout=="H")
            {
                dItem.leftBounds = this.MenuStart.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(this.MenuItems.length));
                dItem.rightBounds = this.MenuStart.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(this.MenuItems.length))+this.ButtonProperties.ButtonSize.x;
                dItem.upperBounds = this.MenuStart.y;
                dItem.lowerBounds = this.MenuStart.y+(this.ButtonProperties.ButtonSize.y);
            }
            console.log(dItem);
            this.MenuItems.push( dItem );
        },
        rebuildMenu: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                if(this.MenuLayout=="V")
                {
                    this.MenuItems[i].leftBounds = this.MenuStart.x;
                    this.MenuItems[i].rightBounds = this.MenuStart.x+(this.ButtonProperties.ButtonSize.x);
                    this.MenuItems[i].upperBounds = this.MenuStart.y+((this.ButtonProperties.ButtonSize.y+this.Spacing.y)*(i));
                    this.MenuItems[i].lowerBounds = this.MenuStart.y+((this.ButtonProperties.ButtonSize.y+this.Spacing.y)*(i))+this.ButtonProperties.ButtonSize.y;
                }
                if(this.MenuLayout=="H")
                {
                    this.MenuItems[i].leftBounds = this.MenuStart.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(i));
                    this.MenuItems[i].rightBounds = this.MenuStart.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(i))+this.ButtonProperties.ButtonSize.x;
                    this.MenuItems[i].upperBounds = this.MenuStart.y;
                    this.MenuItems[i].lowerBounds = this.MenuStart.y+(this.ButtonProperties.ButtonSize.y);
                }
            }
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
            if(this.MenuLayout=="V")
            {
                ig.system.context.fillText(this.text,this.rightBounds/2,this.lowerBounds-((this.lowerBounds-this.upperBounds)/2)+(this.boxStrokeWidth*2));
            }
            if(this.MenuLayout=="H")
            {
                ig.system.context.fillText(this.text,this.leftBounds+((this.rightBounds-this.leftBounds)/2),this.lowerBounds-((this.lowerBounds-this.upperBounds)/2)+(this.boxStrokeWidth*2));
            }
            if (this.drawBox && (this.CornerRad==0||this.CornerRad==undefined))//this is temporary later use ig.merge to set CornerRad recursivly
            {
                ig.system.context.strokeStyle=this.boxStrokeStyle;
                ig.system.context.lineWidth=this.boxStrokeWidth;
                //ig.system.context.fillRect(this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
                ig.system.context.strokeRect(this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
            }
            if(this.drawBox&&this.CornerRad>0)
            {
                ig.system.context.strokeStyle=this.boxStrokeStyle;
                ig.system.context.lineWidth=this.boxStrokeWidth;
                rectWidth = this.rightBounds-this.leftBounds;
                rectHeight = this.lowerBounds-this.upperBounds;
                rectX = this.leftBounds;
                rectY = this.upperBounds;
                cornerRadius = this.CornerRad;
                ig.system.context.beginPath();
                ig.system.context.moveTo(rectX+cornerRadius, rectY);
                ig.system.context.lineTo(rectX + rectWidth - cornerRadius, rectY);
                ig.system.context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
                ig.system.context.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
                ig.system.context.arcTo(rectX + rectWidth, rectY + rectHeight, rectX - cornerRadius, rectY + rectHeight, cornerRadius);
                ig.system.context.lineTo(rectX + cornerRadius, rectY + rectHeight);
                ig.system.context.arcTo(rectX, rectY + rectHeight, rectX, rectHeight - cornerRadius,  cornerRadius);
                ig.system.context.lineTo(rectX, rectY+cornerRadius);
                ig.system.context.arcTo(rectX, rectY, rectX + cornerRadius, rectY,  cornerRadius);
                ig.system.context.stroke();
            }
        }
    });
});