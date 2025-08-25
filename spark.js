const canvas=document.getElementById("spark-canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let sparks=[];

function Spark(x,y){
  this.x=x;
  this.y=y;
  this.vx=(Math.random()-0.5)*4;
  this.vy=(Math.random()-0.5)*4;
  this.alpha=1;
  this.size=Math.random()*3+2;
}

function createSparks(){
  for(let i=0;i<3;i++){
    sparks.push(new Spark(Math.random()*canvas.width,Math.random()*canvas.height));
  }
}

function updateSparks(){
  sparks.forEach((s,i)=>{
    s.x+=s.vx;
    s.y+=s.vy;
    s.alpha-=0.01;
    if(s.alpha<=0) sparks.splice(i,1);
  });
}

function drawSparks(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  sparks.forEach(s=>{
    ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fill();
  });
}

function animate(){
  createSparks();
  updateSparks();
  drawSparks();
  requestAnimationFrame(animate);
}

animate();
window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});