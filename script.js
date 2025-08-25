const chatBox=document.getElementById("chat-box");
const userInput=document.getElementById("user-input");
const sendBtn=document.getElementById("send-btn");

let currentQuestion=0;
let answers=[];

// 60 سؤال مفتوح (هنا مثال أول 10 أسئلة، أكمل بنفس النمط)
const questions=[
"اكتب صفة تصف نفسك باختصار:",
"كيف تصف طريقة تعاملاتك مع الآخرين؟",
"ما أكثر شيء تحبه في حياتك؟",
"كيف تتصرف عند مواجهة مشكلة؟",
"ما الذي يحفزك عادةً؟",
"هل تحب المغامرة أم الأمان؟",
"ما أكثر شيء يزعجك في الناس؟",
"كيف تصف يومك المثالي؟",
"هل تحب التخطيط أم الارتجال؟",
"ما أهم قيمة في حياتك؟"
];

window.addEventListener("load",()=>{
  appendMessage("مرحباً 👋 أنا مارو، مساعدك الذكي! 💖 سأساعدك لمعرفة شخصيتك.", "bot");
  setTimeout(showNextQuestion,1500);
});

sendBtn.addEventListener("click",handleAnswer);
userInput.addEventListener("keypress",(e)=>{if(e.key==="Enter")handleAnswer();});

function handleAnswer(){
  let text=userInput.value.trim();
  if(!text)return;
  appendMessage(text,"user");
  answers.push(text);
  userInput.value="";
  currentQuestion++;
  if(currentQuestion<questions.length){
    setTimeout(showNextQuestion,500);
  } else{
    setTimeout(analyzePersonality,1000);
  }
}

function showNextQuestion(){
  appendMessage(questions[currentQuestion],"bot");
}

function analyzePersonality(){
  let summary="";
  const allText=answers.join(" ").toLowerCase();

  if(allText.includes("هدوء")||allText.includes("صمت")) summary+="✅ شخص هادئ ورايق.\n";
  if(allText.includes("نشاط")||allText.includes("طاقة")) summary+="✅ شخص نشيط ومتحمس.\n";
  if(allText.includes("جماعي")||allText.includes("تعاون")) summary+="✅ يحب العمل الجماعي.\n";
  if(allText.includes("مفكر")||allText.includes("منظم")) summary+="✅ منظم ويفكر قبل اتخاذ القرار.\n";

  if(summary==="") summary="✨ لم يتم التعرف على صفات محددة، يبدو أنك شخص فريد ومتنوع!";

  appendMessage("✨ تحليل شخصيتك بناءً على إجاباتك:\n"+summary,"bot");
}

function appendMessage(text,sender){
  const msg=document.createElement("div");
  msg.classList.add("message",sender);
  msg.innerText=text;
  chatBox.appendChild(msg);
  chatBox.scrollTop=chatBox.scrollHeight;
}