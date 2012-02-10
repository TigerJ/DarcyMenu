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
            FontFillStyle:"",
            FontFillOverStyle:"",
            TextAlign:"center",
            Stroke:false,
            StrokeType:"",
            Corner:0,
            ButtonSize:{x:0,y:0},
            Spacing:{x:0,y:0},
            DrawBoxes:false,
            BoxStrokeStyle:null,
            BoxStrokeWidth:null
        },
        MenuStart:{x:0,y:0},
        MenuLayout:"",
        DrawMenuBorder:false,
        DrawMenuFill:false,
        MenuSize:{width:0,height:0},
        MenuBorderStyle:"",
        MenuBorderWidth:"",
        MenuBorderCorner:0,
        MenuFillFillStyle:"",
        MenuFillCorner:0,
        init: function(){
            //init
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
            var CT = new ig.ContextTools();
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
                    
                    if(this.DrawBoxes)
                    {
                        ig.system.context.StrokeStyle=this.ButtonProperties.BoxStrokeStyle;
                        ig.system.context.LineWidth=this.ButtonProperties.BoxStrokeWidth;
                    }
                    this.drawBackgrounds();
                    this.drawTexts();
                    this.drawBorders();
                }
                if(this.MenuItems.length>0)
                {
                    if(this.DrawMenuBorder)
                    {
                        if(this.MenuBorderCorner==0 || this.MenuBorderCorner==undefined)
                        {
                            if(this.MenuLayout=="H")
                            {
                                CT.drawContextStrokeRect(this.MenuBorderStyle,this.MenuBorderWidth,this.MenuStart.x,this.MenuStart.y,(this.ButtonProperties.ButtonSize.x*this.MenuItems.length)+(this.ButtonProperties.Spacing.x*this.MenuItems.length)+this.ButtonProperties.Spacing.x,this.MenuStart.y+(this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y))
                            }
                            if(this.MenuLayout=="V")
                            {
                                CT.drawContextStrokeRect(this.MenuBorderStyle,this.MenuBorderWidth,this.MenuStart.x,this.MenuStart.y,this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x+this.ButtonProperties.Spacing.x,((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*this.MenuItems.length)+this.ButtonProperties.Spacing.y);
                            }
                        }
                        else
                        {
                            if(this.MenuLayout=="H")
                            {
                                //StrokeStyle, LineWidth, rW,rH,rX,rY,cR
                                CT.drawContextStrokeRectCorner(this.MenuBorderStyle,this.MenuBorderWidth,(this.ButtonProperties.ButtonSize.x*this.MenuItems.length)+(this.ButtonProperties.Spacing.x*this.MenuItems.length)+this.ButtonProperties.Spacing.x,this.MenuStart.y+(this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y),this.MenuStart.x,this.MenuStart.y,this.MenuBorderCorner);
                            }
                            if(this.MenuLayout=="V")
                            {
                                CT.drawContextStrokeRectCorner(this.MenuBorderStyle,this.MenuBorderWidth,this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x+this.ButtonProperties.Spacing.x,((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*this.MenuItems.length)+this.ButtonProperties.Spacing.y,this.MenuStart.x,this.MenuStart.y,this.MenuBorderCorner)
                            }
                        }
                    }
                }
            }
        },
        drawTexts: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                this.MenuItems[i].drawText();
            }
        },
        drawBorders: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                this.MenuItems[i].drawBorders();
            }
        },
        drawBackgrounds: function()
        {
            for(i=0;i<this.MenuItems.length;i++)
            {
                this.MenuItems[i].drawBackground();
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
            dItem.FontFillStyle=this.ButtonProperties.FontFillStyle;
            dItem.FontFillOverStyle=this.ButtonProperties.FontFillOverStyle;
            dItem.Font=this.ButtonProperties.Font;
            dItem.TextAlign=this.ButtonProperties.TextAlign;
            dItem.BackFillOverStyle = this.ButtonProperties.BackFillOverStyle;
            dItem.BackFillStyle = this.ButtonProperties.BackFillStyle;
            var spaceFirst={x:0,y:0};
            if(this.MenuLayout=="V")
            {
                spaceFirst={x:this.ButtonProperties.Spacing.x,y:this.ButtonProperties.Spacing.y};
                dItem.leftBounds = this.MenuStart.x+spaceFirst.x;
                dItem.rightBounds = this.MenuStart.x+(this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x);
                dItem.upperBounds = this.MenuStart.y+spaceFirst.y+((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*(this.MenuItems.length));
                dItem.lowerBounds = this.MenuStart.y+spaceFirst.y+((this.ButtonProperties.ButtonSize.y+this.ButtonProperties.Spacing.y)*(this.MenuItems.length))+this.ButtonProperties.ButtonSize.y;
            }
            if(this.MenuLayout=="H")
            {
                spaceFirst={x:this.ButtonProperties.Spacing.x,y:this.ButtonProperties.Spacing.y};
                dItem.leftBounds = this.MenuStart.x+spaceFirst.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(this.MenuItems.length));
                dItem.rightBounds = this.MenuStart.x+spaceFirst.x+((this.ButtonProperties.ButtonSize.x+this.ButtonProperties.Spacing.x)*(this.MenuItems.length))+this.ButtonProperties.ButtonSize.x;
                dItem.upperBounds = this.MenuStart.y+spaceFirst.y;
                dItem.lowerBounds = this.MenuStart.y+(this.ButtonProperties.ButtonSize.y)+spaceFirst.y;
            }
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
                this.isOver=true;
                //set over style
                if(ig.input.pressed(this.inputAction))
                {
                    this.inputEvent();
                }
            }
            else
            {
                this.isOver=false;
                //revert style
            }
        },
        drawText: function(){
            if(this.isOver)
            {
                ig.system.context.fillStyle=this.FontFillOverStyle;
                ig.system.context.textAlign=this.TextAlign;
                ig.system.context.font=this.Font;
            }
            else
            {
                ig.system.context.fillStyle=this.FontFillStyle;
                ig.system.context.textAlign=this.TextAlign;
                ig.system.context.font=this.Font;
            }
            ig.system.context.fillText(this.text,this.leftBounds+((this.rightBounds-this.leftBounds)/2),this.lowerBounds-((this.lowerBounds-this.upperBounds)/2)+(this.boxStrokeWidth*2));
        },
        drawBackground: function(){
            var CT = new ig.ContextTools();
            if(this.isOver)
            {
                //console.log("test");
                ig.system.context.fillStyle=this.BackFillOverStyle;
            }
            else
            {
                ig.system.context.fillStyle=this.BackFillStyle;
            }
            if (this.drawBox && (this.CornerRad==0||this.CornerRad==undefined))
            {
                
                ig.system.context.fillRect(this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
            }
            else
            {
                CT.drawContextFillRectCorner(ig.system.context.fillStyle,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds,this.leftBounds,this.upperBounds,this.CornerRad);
            }
        },
        drawBorders: function(){
            var CT = new ig.ContextTools();
            if (this.drawBox && (this.CornerRad==0||this.CornerRad==undefined))//this is temporary later use ig.merge to set CornerRad recursivly
            {
                CT.drawContextStrokeRect(this.boxStrokeStyle,this.boxStrokeWidth,this.leftBounds,this.upperBounds,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds);
            }
            if(this.drawBox&&this.CornerRad>0)
            {
                CT.drawContextStrokeRectCorner(this.boxStrokeStyle,this.boxStrokeWidth,this.rightBounds-this.leftBounds,this.lowerBounds-this.upperBounds,this.leftBounds,this.upperBounds,this.CornerRad);
            }
        }
    });
    ig.ContextTools = ig.Class.extend({
        drawContextStrokeRect: function(StrokeStyle, LineWidth, x1,y1,x2,y2){
            ig.system.context.strokeStyle=StrokeStyle;
            ig.system.context.lineWidth=LineWidth;
            ig.system.context.strokeRect(x1,y1,x2,y2);
        },
        drawContextStrokeRectCorner: function(StrokeStyle, LineWidth, rW,rH,rX,rY,cR)
        {
            ig.system.context.strokeStyle=StrokeStyle;
            ig.system.context.lineWidth=LineWidth;
            ig.system.context.beginPath();
            ig.system.context.moveTo(rX+cR,rY);
            ig.system.context.lineTo(rX + rW - cR, rY);
            ig.system.context.arcTo(rX + rW, rY, rX + rW, rY + cR,  cR);
            ig.system.context.lineTo(rX + rW, rY + rH - cR);
            ig.system.context.arcTo(rX + rW, rY + rH, rX - cR, rY + rH, cR);
            ig.system.context.lineTo(rX + cR, rY + rH);
            ig.system.context.arcTo(rX, rY + rH, rX, rH - cR,  cR);
            ig.system.context.lineTo(rX, rY+cR);
            ig.system.context.arcTo(rX, rY, rX + cR, rY,  cR);
            ig.system.context.stroke();
        },
        drawContextFillRectCorner: function(FillStyle, rW,rH,rX,rY,cR)
        {
            ig.system.context.strokeStyle=FillStyle;
            ig.system.context.beginPath();
            ig.system.context.moveTo(rX+cR,rY);
            ig.system.context.lineTo(rX + rW - cR, rY);
            ig.system.context.arcTo(rX + rW, rY, rX + rW, rY + cR,  cR);
            ig.system.context.lineTo(rX + rW, rY + rH - cR);
            ig.system.context.arcTo(rX + rW, rY + rH, rX - cR, rY + rH, cR);
            ig.system.context.lineTo(rX + cR, rY + rH);
            ig.system.context.arcTo(rX, rY + rH, rX, rH - cR,  cR);
            ig.system.context.lineTo(rX, rY+cR);
            ig.system.context.arcTo(rX, rY, rX + cR, rY,  cR);
            ig.system.context.fill();
        }
    });
});