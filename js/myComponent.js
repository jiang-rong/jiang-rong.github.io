		/**
		 * [ComponentBase 生成基础组件的方法]
		 * @param {[object]} cfg  [必需，宽高，背景图片等css样式]
		 * @param {[string]} name [可选，组件名字]
		 */
		var ComponentBase=function(cfg,name){
			var cfg=cfg||{};
			var id=("c_"+Math.random()).replace(".","_");
			var type="component_"+cfg.type;
			var cls=!name?type:type+" "+type+"_"+name;
			var component=$('<div class="h5_component '+cls+'" id="'+id+'"></div>');
			cfg.html&&component.html(cfg.html);
			cfg.width&&component.width(cfg.width/2);
			cfg.height&&component.height(cfg.height/2);
			cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');
			cfg.css&&component.css(cfg.css);
			if(cfg.center==true){
				component.css({'marginLeft':-1*(parseInt(cfg.width)/4),
						'left':'50%'
			})
			}
			if(typeof cfg.onclick==="function"){
				component.on("click",cfg.onclick)
			}
			component.on('onLoad',function(){
				setTimeout(function () {
					component.addClass(cls+"_load").removeClass(cls+"_leave");
					cfg.animateIn&&component.css(cfg.animateIn)
				},cfg.delay||0)
				//component.animate(cfg.animateIn)
				return false;
			})

			component.on('onLeave',function(){
				setTimeout(function () {
				component.addClass(cls+"_leave").removeClass(cls+"_load")
				cfg.animateOut&&component.css(cfg.animateOut)
				},cfg.delay||0)
				return false;
			})		
			return component;
		}
		/**
		 * [ComponentPoint 生成圆点图的方法]
		 * @param {[object]} cfg  [必需，css样式，和数据]
		 * @param {[string]} name [可选，组件名字]
		 */
		var ComponentPoint=function(cfg,name){
			var component=new ComponentBase(cfg,name);
			var base=cfg.data[0][1];
			$.each(cfg.data,function (index,ele) {
				var point=$('<div class="point"></div>');
				var name=$('<div class="name">'+ele[0]+'</div>');
				var rate=$('<div class="rate">'+(ele[1]*100)+'%</div>');
				name.append(rate);
				point.append(name);
				component.append(point);
				var per=(ele[1]/base*100)+'%';
				point.width(per).height(per);
				point.css({backgroundColor:ele[2]})
				if(ele[3]!=undefined&&ele[4]!=undefined){
					point.data('left',ele[3]).data('top',ele[4]);
				}
				point.css('zIndex',100-index);
				point.css('left',0).css('top',0);

				point.css('transition','all 1s '+index*.5+'s');
				component.on('onLoad',function () {
					component.find('.point').each(function (index,ele) {
						$(ele).css('left',$(ele).data('left')).css('top',$(ele).data('top')); 
					})
				})
				component.on('onLeave',function () {
					component.find('.point').each(function (index,ele) {
						$(ele).css('left',0).css('top',0); 
					})
				})
			})
			return component;
		}
		/**
		 * [ComponentBar 生成柱状图的方法]
		 * @param {[object]} cfg  [必需，css样式，和数据]
		 * @param {[string]} name [可选，组件名字]
		 */
		var ComponentBar=function (cfg,name) {
			var component=new ComponentBase(cfg,name);
			$.each(cfg.data,function (index,ele) {
				var line=$('<div class="line"></div>');
				var name=$('<div class="name">'+ele[0]+'</div>');
				var rate=$('<div class="rate"></div>');
				var bg=$('<div class="bg"></div>');
				var per=$('<div class="per">'+(ele[1]*100)+'%</div>');
				if(ele[2]){
					bg.css('backgroundColor',ele[2])
				}
				var width=ele[1]*70+'%';
				rate.width(width).append(bg);
				line.append(name,rate,per);
				component.append(line)
			})
			return component;
		}
		/**
		 * [componentCanvas 生成canvas组件方法]
		 * @param {[object]} cfg  [必需，css样式，和数据]
		 * @param {[string]} name [可选，组件名字]
		 */
		var componentCanvas=function (cfg,name) {
			var component=$("<canvas width='640' height='1136' class='h5_component'></canvas>");
			if(name!=undefined)component.attr("id",name)
			component.css(cfg.css)
			return component;
		}
		/**
		 * [H5 类]
		 */
		var H5=function(){
			this.id=('h5_'+Math.random()).replace(".","_");
			this.el=$('<div class="h5" id="'+this.id+'">').hide();
			$("body").append(this.el)
		}
		/**
		 * [addPage 添加一个页]
		 * @param {[string]} name [页的名字]
		 * @param {[string]} text [可选，页默认带的文本]
		 */
		H5.prototype.addPage=function(name,text){
			var page=$('<div class="section page"></div>');
			if(name!="undefined"){
				page.addClass("page_"+name)
			}
			if(text!="undefined"){
				page.text(text)
			}

			this.page=page;
			$(this.el).append(this.page);
			if(typeof this.alwaysAdd==="function"){
				this.alwaysAdd()
			}			
			return this;
		}
		/**
		 * [addComponent 添加一个页面里的元素]
		 * @param {[obj]} cfg  [必需，宽高，背景图片等css样式]
		 * @param {[string]} name [可选，组件名字]
		 */
		H5.prototype.addComponent=function(cfg,name){
			var cfg=cfg||{};
			cfg=$.extend({type:"base"},cfg)
			var component;
			switch(cfg.type){
				case "base":
				component=new ComponentBase(cfg,name);
				break;

				case "point":
				component=new ComponentPoint(cfg,name);
				break;

				case "bar":
				component=new ComponentBar(cfg,name);
				break;

				case "canvas":
				component=new componentCanvas(cfg,name);
				default:
			}
			$(this.page).append(component);
			return this;
		}
		/**
		 * [canvasAnimate 调用canvas动画]
		 * @param  {[string]} name [必需，所需调用canvas画布的名字]
		 */
		H5.prototype.canvasAnimate = function(name) {
			var canvas=document.getElementById(name);
			var ctx=canvas.getContext("2d");
			var w=canvas.width,h=canvas.height;
			function Star() {
				this.x=Math.floor(Math.random()*w);
				this.y=Math.floor(Math.random()*h*0.8);
				this.r=3+Math.random()*20;
				this.maxalpha=0.2+Math.random()*0.8
				this.alpha=0;
				this.alphaflag=true;
				this.do=Math.random()>0.5?4:2
				this.vx=2*Math.random().toFixed(0)/this.do;
				this.draw=function () {
					ctx.beginPath()
					ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
					var gr = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
			       
			        gr.addColorStop(0,'rgba(205,220,57,'+this.alpha+')');
			        gr.addColorStop(.4,'rgba(205,205,57,'+this.alpha+')');    
			        gr.addColorStop(1,'rgba(205,205,57,0)');
			        ctx.fillStyle=gr
			        ctx.closePath()
					ctx.fill()		
				}
			}

			var stores=[]
			for (var i = 0; i <40; i++) {
				var star=new Star();
				stores.push(star)
			}

			function draw() {
				for (var i = 0; i < stores.length; i++) {
					var curstar=stores[i];
					if(curstar.x>w){
						curstar.x=0;
					}
					if(curstar.y<0){
						curstar.y=Math.floor(Math.random()*h*0.8)
					}
					curstar.x+=curstar.vx;
					curstar.y-=curstar.vx*0.5;
					if(curstar.alphaflag){
					if(curstar.alpha<curstar.maxalpha){
						curstar.alpha+=0.02
					}else{
						curstar.alphaflag=false;
					}
					}else{
						if(curstar.alpha>0.2){
							curstar.alpha-=0.008
						}else{
							curstar.alphaflag=true;
						}
					}
					
					curstar.draw()
				}
			}
			var timer;
			function render() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				draw();
				timer=requestAnimationFrame(render);
				
				$(canvas).on("onLeave",function () {
					cancelAnimationFrame(timer);
					return false;
				})		
			}

			$(canvas).on("onLoad",function () {
				render()
				return false;
			})
		};
		/**
		 * [loader H5加载进度条方法]
		 * @param  {[array]} imgarr    [要用的图片数组]
		 * @param  {[number]} startpage [可选，开始的页]
		 */
		H5.prototype.loader = function(imgarr,startpage) {
			var id=this.id;
			if(this._images==undefined){
				this._images=imgarr.length;
				this.loaded=0;
				window[id]=this;
				$.each(imgarr,function(index,ele){
					var img=new Image();
					img.onload=function(){
						window[id].loader(imgarr,startpage)		
					}
					img.src=ele;
				})	
				$(".loading .rate").text('0%')
				return this;	
			}
			else{
				this.loaded++;
				var zhi=this.loaded/this._images*100+'%';
				$(".loading .process").width(zhi)
				$(".loading .rate").text(zhi);
				if(this.loaded<this._images){
					return this}		
			}
			
			$(".loading").hide()

			this.el.fullpage({
				"onLeave":function(index,nextIndex,direction){
					$(this).find(".h5_component").trigger("onLeave")

				},
				"afterLoad":function(anchorLink,index){
					$(this).find(".h5_component").trigger("onLoad")
				}
			})
			this.el.show()
			$(".page").eq(0).find(".h5_component").trigger("onLoad");
			console.log(startpage)
			if(startpage!=undefined){
			
			$.fn.fullpage.moveTo(startpage)
			}
		};