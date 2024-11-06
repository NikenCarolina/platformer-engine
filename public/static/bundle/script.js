(()=>{"use strict";var t,i=function(){function t(){this.observers=[],this.x=0,this.y=0}return t.prototype.attach=function(t){if(this.observers.includes(t))return console.log("Subject: Observer has been attached already");this.observers.push(t)},t.prototype.detach=function(t){if(1!==this.observers.indexOf(t))return console.log("Subject: Nonexistent observer");for(var i=0,e=this.observers;i<e.length;i++)e[i].update(this)},t.prototype.notify=function(){for(var t=0,i=this.observers;t<i.length;t++)i[t].update(this)},t.prototype.setPosition=function(t,i){this.x=t,this.y=i,this.notify()},t.prototype.draw=function(t){t.fillStyle="green",t.fillRect(this.x-5,this.y-5,10,10)},t}(),e=function(){function t(t,i,e,o){this.observers=[],this.threshold=10,this.x=t,this.y=i,this.x1=e,this.y1=o}return t.prototype.attach=function(t){if(this.observers.includes(t))return console.log("Subject: Observer has been attached already");this.observers.push(t)},t.prototype.detach=function(t){if(1!==this.observers.indexOf(t))return console.log("Subject: Nonexistent observer");for(var i=0,e=this.observers;i<e.length;i++)e[i].update(this)},t.prototype.notify=function(){for(var t=0,i=this.observers;t<i.length;t++)i[t].update(this)},t.prototype.draw=function(t){t.beginPath(),t.moveTo(this.x,this.y),t.lineTo(this.x1,this.y1),t.stroke(),this.notify()},t}(),o=function(){function t(t,i,e,o){this.xVelocity=0,this.yVelocity=0,this.gravity=.98,this.yAcceleration=this.gravity,this.jumpVelocity=-15,this.moveVelocity=2,this.x=t,this.y=i,this.width=e,this.height=o,this.ctxfillStyle="red"}return t.prototype.update=function(t){t instanceof i&&(this.isHovered(t.x,t.y)&&(this.ctxfillStyle="green"),this.isHovered(t.x,t.y)||(this.ctxfillStyle="red")),t instanceof e&&(this.y+this.height>=t.y&&this.x+this.width>=t.x&&this.x<=t.x1?this.yVelocity>0&&this.y-t.y<=t.threshold&&(this.yVelocity=0,this.y=t.y-this.height):this.yAcceleration=this.gravity)},t.prototype.draw=function(t){t.fillStyle=this.ctxfillStyle,t.fillRect(this.x,this.y,this.width,this.height),this.x=this.x+this.xVelocity,this.y=this.y+this.yVelocity,this.yVelocity=this.yVelocity+this.yAcceleration},t.prototype.isHovered=function(t,i){return t>=this.x&&t<=this.x+this.width&&i>=this.y&&i<=this.y+this.height},t.prototype.jump=function(){0==this.yVelocity&&(this.yVelocity=this.jumpVelocity)},t.prototype.moveLeft=function(){this.xVelocity=-this.moveVelocity},t.prototype.moveRight=function(){this.xVelocity=this.moveVelocity},t.prototype.stopX=function(){this.xVelocity=0},t}();!function(t){t.Up="ArrowUp",t.Left="ArrowLeft",t.Right="ArrowRight"}(t||(t={}));var h=document.getElementById("gameCanvas");h.width=window.innerWidth,h.height=window.innerHeight,h.style.position="absolute",h.style.top="0",h.style.left="0";var s=h.getContext("2d"),n=new i,r=new o(h.width/3,h.height-h.height/3,20,20),c=new e(0,h.height-h.height/3,h.width,h.height-h.height/3),y=new e(h.width/3,h.height-h.height/2,h.width-h.width/5,h.height-h.height/2),l=new e(h.width/3,20,h.width,20);n.attach(r),c.attach(r),y.attach(r),l.attach(r);var d=[r,c,y,l];h.addEventListener("mousemove",(function(t){var i=h.getBoundingClientRect(),e=t.clientX-i.left,o=t.clientY-i.top;n.setPosition(e,o),console.log(e,o),console.log("hei"),null!==s&&n.draw(s)})),window.addEventListener("resize",(function(){h.width=window.innerWidth,h.height=window.innerHeight,h.style.position="absolute",h.style.top="0",h.style.left="0"})),window.addEventListener("keydown",(function(i){i.code===t.Left&&r.moveLeft(),i.code===t.Right&&r.moveRight(),i.code===t.Up&&r.jump()})),window.addEventListener("keyup",(function(i){i.code!==t.Left&&i.code!==t.Right||r.stopX()})),requestAnimationFrame((function t(){!function(t){null==s||s.clearRect(0,0,h.width,h.height);for(var i=0,e=t;i<e.length;i++){null!==s&&e[i].draw(s)}}(d),requestAnimationFrame(t)}))})();