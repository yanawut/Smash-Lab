(function(){
const VID="https://www.youtube.com/watch?v=txiWb2C6DLw&t=";
const CH=[
 {t:0,  ts:"00:00",h:"ขว้างไม้ออกไป",d:"ส่งไม้ไปข้างหน้าเหมือนขว้างของ ไม่เหวี่ยงขึ้นไปหาลูก ถ้าเหวี่ยงขึ้นจะกระทบลูกช้า"},
 {t:202,ts:"03:22",h:"ผ่อนแรง",d:"จับด้ามหลวม แขนไม่เกร็ง ให้หัวไม้เร่งความเร็วได้เต็มที่"},
 {t:328,ts:"05:28",h:"เริ่มแก้วงสวิง",d:"ปรับวงสวิงทีละขั้น เริ่มจากหมุนลำตัวก่อนแขน"},
 {t:462,ts:"07:42",h:"ลำดับการเคลื่อนไหว",d:"ส่งแรงต่อกันเป็นทอด ขา → สะโพก → ลำตัว → ไหล่ → ศอก → แขน → นิ้ว"},
 {t:546,ts:"09:06",h:"ใช้แรงน้อยที่สุด",d:"ถ้าลำดับถูก ใช้แรงน้อยลงแต่ลูกเร็วขึ้น ตีแล้วรู้สึกเบาและไว"},
 {t:633,ts:"10:33",h:"สายตาและจุดกระทบ",d:"มองลูกจนถึงจังหวะกระทบ ศีรษะนิ่ง"},
 {t:781,ts:"13:01",h:"ตั้งจุดกระทบ",d:"ตั้งจุดตีไว้ก่อน แล้วปล่อยให้ลูกตกเข้ามาหา จุดนี้ต่ำกว่าจุดสูงสุดเล็กน้อย"},
 {t:839,ts:"13:59",h:"ทิ้งไม้ไว้ข้างหลัง",d:"ให้ลำตัวหมุนนำ ไม้ค้างไว้ด้านหลังก่อนแล้วค่อยตามมา เพื่อให้หัวไม้สะบัดเร็ว"}
];
const F=[
 {id:"throw",n:"ขว้างไม้ไปข้างหน้า",c:"ไม่เหวี่ยงขึ้นไปหาลูก",w:1.2,ch:0,dr:"ขว้างลูกเทนนิสไปข้างหน้าเฉียงลง 3×10 แล้วทำวงสวิงเดียวกันด้วยไม้ (shadow)"},
 {id:"relax",n:"ผ่อนแรง จับด้ามหลวม",c:"บีบเฉพาะตอนกระทบ",w:1.0,ch:1,dr:"Shadow 3×10 จับด้ามด้วยนิ้ว บีบเฉพาะตอนกระทบแล้วคลายทันที"},
 {id:"torso",n:"หมุนลำตัวก่อนแขน",c:"สะโพกและอกหมุนนำ",w:1.2,ch:2,dr:"ยืนตะแคง ง้างไม้ แล้วหมุนสะโพกและลำตัวก่อนแขนเริ่มขยับ ทำช้า ๆ 3×10"},
 {id:"seq",n:"ลำดับการเคลื่อนไหว",c:"ขา → สะโพก → ลำตัว → ไหล่ → ศอก → แขน → นิ้ว",w:1.3,ch:3,dr:"Shadow แยกช่วงทีละข้อต่อจากขาขึ้นไปถึงนิ้ว 3×8 แล้วต่อให้ลื่นเป็นวงสวิงเดียว"},
 {id:"minp",n:"ใช้แรงน้อยที่สุด",c:"ลูกเร็วแต่ตัวไม่เกร็ง",w:0.8,ch:4,dr:"ตบ 10 ลูกที่แรงราว 60% เน้นความเร็วหัวไม้ แล้วค่อยเพิ่มเป็น 80%"},
 {id:"gaze",n:"สายตาจับลูก",c:"มองลูกจนกระทบ ศีรษะนิ่ง",w:0.8,ch:5,dr:"ให้เพื่อนโยนลูก มองลูกจนถึงจังหวะกระทบโดยไม่เงยตามไม้ 3×10"},
 {id:"setp",n:"ตั้งจุดกระทบไว้ก่อน",c:"ให้ลูกตกเข้ามาหา ต่ำกว่าจุดสูงสุดเล็กน้อย",w:1.2,ch:6,dr:"Wait drill: เข้าไปยืนใต้ลูกก่อน ตั้งไม้รอ แล้วตีที่จุดหน้าตัวเล็กน้อย 3×10"},
 {id:"lag",n:"ทิ้งไม้ไว้ข้างหลัง",c:"ลำตัวหมุนนำ ไม้ค้างหลังก่อนสะบัด",w:1.0,ch:7,dr:"ง้างให้หัวไม้ตกหลัง ขณะหมุนตัวปล่อยไม้ค้างไว้ก่อน แล้วค่อยสะบัด 3×10"}
];
const S=[
 {id:"s1",n:"ตบไม่แรง ลูกไม่หนัก",m:{relax:2,seq:2,torso:1.5,lag:1.5,throw:1}},
 {id:"s2",n:"ลูกแบนหรือโด่ง ไม่พุ่งลง",m:{setp:2,throw:2,gaze:1}},
 {id:"s3",n:"ตีเลท ลูกเลยศีรษะไปแล้ว",m:{setp:2,gaze:1.5,throw:1}},
 {id:"s4",n:"ตบติดเน็ตบ่อย",m:{setp:1.5,gaze:1,minp:1}},
 {id:"s5",n:"ลูกออกข้าง ไม่แม่น",m:{gaze:2,minp:1.5,relax:1}},
 {id:"s6",n:"เมื่อยหรือเจ็บไหล่และศอก",m:{relax:2,torso:1.5,seq:1.5,minp:1}},
 {id:"s7",n:"ตบแล้วกลับมารับลูกไม่ทัน",m:{minp:2,relax:1,torso:1}}
];
const EX={scores:{throw:2,relax:2,torso:3,seq:2,minp:3,gaze:4,setp:2,lag:2},sym:["s1","s3"]};
const KEY="smashlab.v1";
function load(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null}catch(e){return null}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
let st=load(KEY); let isEx=!st; if(!st) st=JSON.parse(JSON.stringify(EX));

const $=id=>document.getElementById(id);
const POSE={
 throw:[{th:-5,arrow:[0,-10],sh:[46,-12],t:"เหวี่ยงไม้ขึ้นไปหาลูก"},{th:22,arrow:[16,9],sh:"hit",t:"ส่งไม้ไปข้างหน้า เฉียงลง"}],
 relax:[{th:15,tense:1,t:"แขนเกร็ง กำด้ามแน่นตลอด"},{th:15,speed:1,t:"แขนหลวม บีบแค่ตอนกระทบ"}],
 torso:[{th:15,open:1,t:"หันหน้าเข้าเน็ต ใช้แต่แขน"},{lag:1,rot:1,t:"ตะแคงตัว ให้สะโพกหมุนนำ"}],
 seq:[{th:15,chain:"arm",t:"ออกแรงที่แขนจุดเดียว"},{th:15,chain:"full",t:"ส่งแรงต่อจากขาขึ้นไปถึงมือ"}],
 minp:[{th:15,tense:1,arrow:[16,4],t:"ฟาดสุดแรงทุกลูก"},{th:15,speed:1,t:"แรง 60–80% แต่หัวไม้เร็ว"}],
 gaze:[{th:15,eye:[20,-14],sh:[64,-8],t:"เงยหน้าตามไม้ ละสายตาจากลูก"},{th:15,sh:"hit",eye:"hit",t:"มองลูกจนถึงจังหวะกระทบ"}],
 setp:[{th:-12,sh:"hit",fall:1,t:"ลูกเลยศีรษะไปแล้ว ตีเลท"},{th:22,sh:"hit",fall:1,t:"รอให้ลูกตกเข้าจุดหน้าตัว"}],
 lag:[{th:-35,arrow:[12,-10],t:"ไม้ไปพร้อมแขน ไม่มีจังหวะสะบัด"},{lag:1,arrow:[10,-14],t:"หัวไม้ค้างหลังก่อน แล้วค่อยสะบัด"}]
};
function fig(o,k,good){
  const c=good?"var(--court)":"var(--warn)",S=[42,40],f=n=>n.toFixed(1);
  let hand,end,elbow=null;
  if(o.lag){elbow=[52,30];hand=[44,22];end=[30,48]}
  else{const r=(o.th||0)*Math.PI/180;hand=[S[0]+28*Math.sin(r),S[1]-28*Math.cos(r)];end=[S[0]+46*Math.sin(r),S[1]-46*Math.cos(r)]}
  const dx=end[0]-hand[0],dy=end[1]-hand[1],len=Math.hypot(dx,dy),u=[dx/len,dy/len];
  const hc=[end[0]+u[0]*6,end[1]+u[1]*6],ang=Math.atan2(dx,-dy)*180/Math.PI;
  const sh=o.sh==="hit"?[hc[0]+u[0]*9+3,hc[1]+u[1]*9]:o.sh;
  const mid=[(S[0]+hand[0])/2,(S[1]+hand[1])/2];
  let g=`<defs><marker id="m${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L9 5L1 9z" fill="${c}"/></marker></defs>`;
  g+=`<line x1="4" y1="94" x2="116" y2="94" stroke="var(--line)" stroke-width="1.5"/>`;
  g+=`<g fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="30,94 40,64 52,94"/>`;
  g+=o.open?`<rect x="31" y="37" width="18" height="27" rx="4"/><polyline points="40,43 30,54"/>`:`<line x1="40" y1="35" x2="40" y2="64"/><polyline points="40,43 30,40 24,30"/>`;
  g+=`<circle cx="40" cy="28" r="6"/>`;
  g+=elbow?`<polyline points="${S} ${elbow} ${hand}"/>`:`<line x1="${S[0]}" y1="${S[1]}" x2="${f(hand[0])}" y2="${f(hand[1])}"/>`;
  g+=`</g><line x1="${f(hand[0])}" y1="${f(hand[1])}" x2="${f(end[0])}" y2="${f(end[1])}" stroke="var(--cork)" stroke-width="2"/>`;
  g+=`<ellipse cx="${f(hc[0])}" cy="${f(hc[1])}" rx="4.5" ry="7" transform="rotate(${f(ang)} ${f(hc[0])} ${f(hc[1])})" fill="none" stroke="var(--cork)" stroke-width="2"/>`;
  if(o.tense){g+=`<polyline points="${f(mid[0]-10)},${f(mid[1]-3)} ${f(mid[0]-7)},${f(mid[1]-7)} ${f(mid[0]-4)},${f(mid[1]-3)} ${f(mid[0]-1)},${f(mid[1]-7)}" fill="none" stroke="${c}" stroke-width="1.5"/><circle cx="${f(hand[0])}" cy="${f(hand[1])}" r="3.2" fill="var(--ink)"/>`}
  if(o.speed){for(let i=0;i<3;i++){g+=`<line x1="${f(hc[0]-18)}" y1="${f(hc[1]-5+i*5)}" x2="${f(hc[0]-9)}" y2="${f(hc[1]-5+i*5)}" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`}}
  if(o.arrow){g+=`<line x1="${f(hc[0])}" y1="${f(hc[1])}" x2="${f(hc[0]+o.arrow[0])}" y2="${f(hc[1]+o.arrow[1])}" stroke="${c}" stroke-width="2" marker-end="url(#m${k})"/>`}
  if(o.chain==="full"){const p=[[48,84],[40,64],[40,50],S,mid,hand];g+=`<polyline points="${p.map(q=>f(q[0])+","+f(q[1])).join(" ")}" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#m${k})"/>`+p.map((q,i)=>`<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${2+i*0.4}" fill="${c}"/>`).join("")}
  if(o.chain==="arm"){g+=`<circle cx="${f(mid[0])}" cy="${f(mid[1])}" r="5" fill="${c}" fill-opacity=".85"/>`}
  if(o.rot){g+=`<path d="M27 70 A13 5 0 0 0 55 70" fill="none" stroke="${c}" stroke-width="2" marker-end="url(#m${k})"/>`}
  if(sh){
    if(o.fall){g+=`<line x1="${f(sh[0]+6)}" y1="${f(sh[1]-20)}" x2="${f(sh[0]+1)}" y2="${f(sh[1]-5)}" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="2 2"/>`}
    g+=`<circle cx="${f(sh[0])}" cy="${f(sh[1])}" r="3.2" fill="var(--cork-soft)" stroke="var(--cork)" stroke-width="1.5"/>`;
  }
  if(o.eye){const t=o.eye==="hit"?sh:o.eye;g+=`<line x1="45" y1="27" x2="${f(t[0])}" y2="${f(t[1])}" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 2"/>`}
  return `<svg viewBox="0 -18 120 116" role="img" aria-label="${o.t}">${g}</svg>`;
}
function pair(id,px){px=px||"";const [b,gd]=POSE[id];return `<figure class="bad">${fig(b,px+id+"b",0)}<figcaption><span class="mk">✗</span> ${b.t}</figcaption></figure><figure class="good">${fig(gd,px+id+"g",1)}<figcaption><span class="mk">✓</span> ${gd.t}</figcaption></figure>`}
const SPK='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
$("chapters").innerHTML=CH.map((c,i)=>`<li><a href="${VID}${c.t}s" target="_blank" rel="noopener">${c.ts}</a><div><b>${c.h}</b><span>${c.d}</span></div><button type="button" class="speak ghost" data-speak="${i}" aria-pressed="false" aria-label="ฟังคำอธิบาย: ${c.h}" title="ฟังคำอธิบาย">${SPK}</button></li>`).join("");
/* read a chapter aloud from pre-recorded Thai audio (audio/ch-N.mp3, made with edge-tts th-TH-PremwadeeNeural from CH); tap again to stop */
const spk=new Audio();spk.preload="none";let spkIdx=null;
function spkReset(){spkIdx=null;document.querySelectorAll("#chapters .speak").forEach(b=>{b.setAttribute("aria-pressed","false");b.classList.remove("on")})}
spk.addEventListener("ended",spkReset);
spk.addEventListener("error",()=>{if(spkIdx==null) return;spkReset();const m=$("speak-msg");m.textContent="เล่นเสียงไม่สำเร็จ ลองใหม่อีกครั้ง";m.hidden=false});
$("chapters").addEventListener("click",e=>{
  const b=e.target.closest("[data-speak]");if(!b) return;const i=+b.dataset.speak,was=spkIdx;
  spk.pause();spkReset();$("speak-msg").hidden=true;if(was===i) return;
  spkIdx=i;b.setAttribute("aria-pressed","true");b.classList.add("on");
  spk.src=`audio/ch-${i}.mp3`;spk.play().catch(()=>{if(spkIdx===i) spkReset()});
});
/* spoken summary of the video/photo analysis: pre-recorded Thai phrases (audio/n-KEY.mp3, edge-tts th-TH-PremwadeeNeural from NARR) strung together per result */
const NARR={
 intro:"สรุปผลการวิเคราะห์ท่าตบ ทีละหัวข้อ",
 m_setp:"จุดกระทบ",m_throw:"ทิศการเคลื่อนของมือตอนกระทบ",m_seq:"ลำดับการส่งแรง",m_torso:"การหมุนลำตัว",m_gaze:"ศีรษะนิ่ง",m_elbow:"ศอกตอนกระทบ",
 v_g:"อยู่ในเกณฑ์ดี",v_m:"พอใช้",v_b:"ควรแก้",v_n:"ข้อมูลไม่พอ วัดจากไฟล์นี้ไม่ได้",
 t_setp_early:"ตีเร็วเกินไป หรือลูกเลยศีรษะ ขยับไปอยู่หลังลูกอีกครึ่งก้าว แล้วรอให้ลูกตกลงมาอยู่หน้าตัว",
 t_setp_late:"จุดกระทบต่ำ หรือยื่นไปข้างหน้าเกิน เข้าไปอยู่ใต้ลูกให้เร็วขึ้นอีกนิด",
 t_throw:"มือยังเหวี่ยงขึ้นไปหาลูก นึกภาพว่ากำลังขว้างไม้ไปที่กลางคอร์ทฝั่งตรงข้าม",
 t_seq:"ซ้อมวงสวิงช้า ๆ ให้สะโพกออกตัวก่อน แล้วส่งแรงต่อไปที่ไหล่ ศอก และข้อมือ",
 t_torso_open:"ตอนง้างยังหันหน้าเข้าเน็ต หมุนไหล่ข้างที่ไม่ได้ตีให้ชี้ไปหาลูกก่อน",
 t_torso_rot:"ลำตัวหมุนเข้ามาน้อย ให้สะโพกและอกหมุนนำ ก่อนแขนเริ่มเหวี่ยง",
 t_gaze:"ศีรษะขยับมากก่อนกระทบ มองลูกจนถึงจังหวะกระทบ อย่าเงยหน้าตามไม้",
 t_elbow:"ศอกงอตอนกระทบ มักเกิดจากลูกเลยตัว หรือจุดกระทบชิดตัวเกินไป เหยียดแขนให้สุดตอนตี",
 m_ext:"แขนเหยียดตอนกระทบ",m_reach:"ความสูงจุดกระทบ",m_lat:"ตำแหน่งลูกซ้ายขวา",m_elbowup:"ยกศอกตอนตั้งท่า",m_follow:"ก้าวตามลูกหลังตบ",
 t_ext:"ศอกยังงอตอนกระทบ เหยียดแขนให้สุด ให้ไม้โดนลูกที่จุดสูงที่สุดที่เอื้อมถึง",
 t_reach:"จุดกระทบยังต่ำ ไปให้ถึงลูกเร็วขึ้น แล้วตีเหนือศีรษะตอนแขนเหยียดสุด",
 t_lat_in:"ลูกเยื้องเข้ามาเหนือศีรษะ ขยับตัวให้ลูกอยู่เหนือไหล่ข้างที่ตี",
 t_lat_out:"ลูกออกไปด้านข้างตัว แขนเหวี่ยงจากด้านข้าง ขยับเข้าไปให้ลูกอยู่เหนือไหล่ข้างที่ตี",
 t_elbowup:"ตอนตั้งท่ายกศอกขึ้นให้สูงระดับไหล่ หน้าไม้เปิดไปข้างหน้า",
 t_follow:"หลังตบให้ก้าวตามลูกไปข้างหน้า อย่าถอยหรือเอนไปข้างหลัง",
 first:"เรื่องที่ควรแก้ก่อน คือ",allgood:"ทุกหัวข้อที่วัดได้อยู่ในเกณฑ์ดี รักษาจังหวะนี้ไว้",
 end:"ซ้อมแล้วถ่ายคลิปมาวิเคราะห์ใหม่ เพื่อดูความคืบหน้า"
};
function narList(){
  if(!lastM||!vScores) return [];
  const scan=lastM.src==="scan",rear=lastM.view==="rear",L=["intro"];let worst=null;
  const ids=rear?(scan?["ext","reach","lat","elbowup","follow"]:["ext","reach","lat"]):scan?["setp","throw","seq","torso","gaze"]:["setp","elbow"];
  const sc=rear?{ext:lastM.es,reach:lastM.rs,lat:lastM.ls,elbowup:lastM.eus,follow:lastM.fws}:Object.assign({},vScores,{elbow:lastM.es});
  const tip=id=>id==="setp"?(lastM.th<10?"t_setp_early":"t_setp_late"):id==="torso"?((scan?lastM.wp:lastM.w)>0.5?"t_torso_open":"t_torso_rot"):id==="lat"?(lastM.lat<0?"t_lat_in":"t_lat_out"):"t_"+id;
  ids.forEach(id=>{const s=sc[id];if(s==null&&!scan&&(id==="elbow"||id==="ext")) return;L.push("m_"+id);
    if(s==null){L.push("v_n");return}
    L.push(s>=4?"v_g":s===3?"v_m":"v_b");
    if(s<=3){L.push(tip(id));if(!worst||s<sc[worst]) worst=id}});
  L.push(...(worst?["first","m_"+worst]:["allgood"]),"end");
  return L;
}
let narQ=[],narOn=false;
const nar=new Audio();
function narBtn(){const b=$("btn-narrate");b.setAttribute("aria-pressed",narOn);b.classList.toggle("on",narOn);b.lastChild.textContent=narOn?" หยุดฟัง":" ฟังสรุปผล"}
function narStop(){narOn=false;narQ=[];nar.pause();narBtn()}
function narNext(){if(!narOn) return;const k=narQ.shift();if(!k){narStop();return}nar.src=`audio/n-${k}.mp3`;nar.play().catch(narStop)}
function narShow(){narStop();$("btn-narrate").hidden=!vScores}
nar.addEventListener("ended",narNext);nar.addEventListener("error",narStop);
$("btn-narrate").addEventListener("click",()=>{
  if(narOn){narStop();return}
  spk.pause();spkReset();narQ=narList();narQ.forEach(k=>{const a=new Audio();a.preload="auto";a.src=`audio/n-${k}.mp3`});
  narOn=true;narBtn();narNext();
});
$("chapters").addEventListener("click",()=>{if(narOn) narStop()},true);
$("factors").innerHTML=F.map(f=>`<div class="factor"><div class="name">${f.n}</div><div class="seg" role="radiogroup" aria-label="${f.n}">${[1,2,3,4,5].map(v=>`<input type="radio" name="f-${f.id}" id="f-${f.id}-${v}" value="${v}"><label for="f-${f.id}-${v}">${v}</label>`).join("")}</div><div class="cue">${f.c}</div><div class="demo">${pair(f.id)}</div></div>`).join("");
$("symptoms").innerHTML=S.map(s=>`<label for="${s.id}"><input type="checkbox" id="${s.id}" value="${s.id}"><span>${s.n}</span></label>`).join("");

function paintInputs(){
  F.forEach(f=>{const el=$(`f-${f.id}-${st.scores[f.id]||3}`); if(el) el.checked=true;});
  S.forEach(s=>{$(s.id).checked=st.sym.includes(s.id)});
  $("ex-badge").hidden=!isEx;
}
function color(v){return v>=4?"var(--good)":v>=3?"var(--mid)":"var(--warn)"}
function analyse(){
  let num=0,den=0; F.forEach(f=>{num+=f.w*st.scores[f.id];den+=f.w*5});
  const overall=Math.round(num/den*100);
  $("overall").textContent=overall;
  const lv=$("level");
  const [t,bg,fg]=overall>=80?["ท่าดี เหลือแค่เก็บรายละเอียด","var(--court-soft)","var(--court)"]:overall>=60?["พื้นฐานพอใช้ แก้จุดอ่อนได้","var(--cork-soft)","var(--cork)"]:["ยังใช้แรงแขนเป็นหลัก","var(--cork-soft)","var(--warn)"];
  lv.textContent=t; lv.style.background=bg; lv.style.color=fg;
  $("bars").innerHTML=F.map(f=>{const v=st.scores[f.id];return `<div class="bar"><span class="lab" title="${f.n}">${f.n}</span><div class="track"><div class="fill" style="width:${v*20}%;background:${color(v)}"></div></div><span class="num">${v}/5</span></div>`}).join("");
  const pr=F.map(f=>{let p=f.w*(5-st.scores[f.id]);const why=[];
    if(st.scores[f.id]<=2) why.push(`ให้คะแนนตัวเอง ${st.scores[f.id]}/5`);
    S.forEach(s=>{if(st.sym.includes(s.id)&&s.m[f.id]){p+=s.m[f.id];why.push(s.n)}});
    return {f,p,why}}).sort((a,b)=>b.p-a.p).slice(0,3);
  $("prio").innerHTML=pr.map((x,i)=>{const c=CH[x.f.ch];return `<div class="pcard"><span class="rank">อันดับ ${i+1} · คะแนนความสำคัญ ${x.p.toFixed(1)}</span><h3>${x.f.n}</h3><p class="why">${x.why.length?"เพราะ: "+x.why.join(" · "):"คะแนนยังไม่เต็ม"}</p><p class="drill">${x.f.dr}</p>${x.f.id==="relax"?gripHTML():""}${animHTML(x.f.id)}<a href="${VID}${c.t}s" target="_blank" rel="noopener">ดูในคลิปช่วง ${c.ts} ↗</a><button type="button" class="ghost chk" data-focus="${x.f.id}">ตรวจท่าซ้อมเรื่องนี้</button></div>`}).join("");
  return overall;
}
function onChange(){
  F.forEach(f=>{const el=document.querySelector(`input[name="f-${f.id}"]:checked`); if(el) st.scores[f.id]=+el.value});
  st.sym=S.filter(s=>$(s.id).checked).map(s=>s.id);
  isEx=false; $("ex-badge").hidden=true; save(KEY,st); analyse();
}
$("factors").addEventListener("change",onChange);
$("symptoms").addEventListener("change",onChange);

/* contact model */
const SX=170,SY=135,R=115,NETX=520,NETY=196,GY=270;
function pt(deg){const r=deg*Math.PI/180;return [SX+R*Math.sin(r),SY-R*Math.cos(r)]}
function arc(a,b){const [x1,y1]=pt(a),[x2,y2]=pt(b);return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`}
$("zones").innerHTML=[[-20,0,"var(--warn)"],[0,10,"var(--mid)"],[10,30,"var(--good)"],[30,45,"var(--mid)"]].map(z=>`<path d="${arc(z[0],z[1])}" fill="none" stroke="${z[2]}" stroke-width="10" stroke-opacity=".35" stroke-linecap="butt"/>`).join("");
function model(){
  const th=+$("theta").value; $("theta-v").textContent=(th>0?"+":"")+th+"°";
  const [cx,cy]=pt(th);
  $("arm").setAttribute("x2",cx.toFixed(1)); $("arm").setAttribute("y2",cy.toFixed(1));
  $("contact").setAttribute("cx",cx.toFixed(1)); $("contact").setAttribute("cy",cy.toFixed(1));
  const a=th-4, ar=a*Math.PI/180;
  let ex=630, ey=cy+Math.tan(ar)*(ex-cx);
  if(ey>GY){ex=cx+(GY-cy)/Math.tan(ar); ey=GY}
  if(ey<4){ex=cx+(4-cy)/Math.tan(ar); ey=4}
  const yNet=cy+Math.tan(ar)*(NETX-cx);
  let out,zone;
  if(ar>0 && ex<NETX){out="ติดเน็ต"}
  else if(yNet>NETY){out="ติดเน็ต"; ex=NETX; ey=yNet}
  else if(a<0){out="ลูกลอยขึ้น"}
  else if(a<6){out="ลูกแบน"}
  else {out="พุ่งลงข้ามเน็ต"}
  zone=th<0?"หลังศีรษะ":th<10?"จุดสูงสุด":th<=30?"โซนแนะนำ":"ต่ำเกินไป";
  const p=$("shuttle-path"); p.setAttribute("x1",cx.toFixed(1)); p.setAttribute("y1",cy.toFixed(1)); p.setAttribute("x2",ex.toFixed(1)); p.setAttribute("y2",ey.toFixed(1));
  $("r-zone").textContent=zone;
  $("r-angle").textContent=(a>=0?"ลง ":"ขึ้น ")+Math.abs(Math.round(a))+"°";
  const o=$("r-out"); o.textContent=out;
  o.style.color=out==="พุ่งลงข้ามเน็ต"?"var(--good)":out==="ลูกแบน"?"var(--mid)":"var(--warn)";
}
$("theta").addEventListener("input",model);

/* video / image pose analysis — runs locally, nothing stored */
const vid=$("vid"),img=$("img"),ov=$("ov"),octx=ov.getContext("2d");
let poseNet=null,kind=null,objUrl=null,frames=null,cIdx=null,lastKP=null,vScores=null,busy=false,lastM=null,runId=0,tallyRun=-1,tally={n:0,ok:0};
const EDGES=[[5,6],[5,7],[7,9],[6,8],[8,10],[5,11],[6,12],[11,12],[11,13],[13,15],[12,14],[14,16]];
const C192=document.createElement("canvas");C192.width=C192.height=192;const c192=C192.getContext("2d",{willReadFrequently:true});
const vs=m=>{$("vl-status").textContent=m};
const okp=p=>p&&p.s>0.3;
const midp=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2,s:Math.min(a.s,b.s)});
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const deg=r=>r*180/Math.PI;
function arm(){return $("hand-l").checked?{sh:5,el:7,wr:9,hp:11}:{sh:6,el:8,wr:10,hp:12}}
function natSize(){return kind==="video"?[vid.videoWidth,vid.videoHeight]:[img.naturalWidth,img.naturalHeight]}
function mediaEl(){return kind==="video"?vid:img}
async function getNet(){
  if(poseNet) return poseNet;
  if(!window.tf) throw new Error("โหลดไลบรารีวิเคราะห์ท่าทางไม่สำเร็จ ลองรีเฟรชหน้า");
  vs("กำลังโหลดโมเดลท่าทาง (ประมาณ 5 MB) โหลดครั้งแรกครั้งเดียว…");
  try{await tf.setBackend("webgl")}catch(e){try{await tf.setBackend("cpu")}catch(e2){}}
  await tf.ready();
  poseNet=await tf.loadGraphModel("models/movenet-lightning.json");
  return poseNet;
}
async function detect(src,w,h){
  const net=await getNet(),Z=192,sc=Z/Math.max(w,h),dw=w*sc,dh=h*sc,ox=(Z-dw)/2,oy=(Z-dh)/2;
  c192.fillStyle="#000";c192.fillRect(0,0,Z,Z);c192.drawImage(src,ox,oy,dw,dh);
  const inp=tf.tidy(()=>tf.browser.fromPixels(C192).expandDims(0).toInt());
  const out=net.execute(inp);const d=await out.data();tf.dispose([inp,out]);
  const kp=[];for(let i=0;i<17;i++){kp.push({x:(d[i*3+1]*Z-ox)/sc,y:(d[i*3]*Z-oy)/sc,s:d[i*3+2]})}
  return kp;
}
function fitOv(){
  const el=mediaEl();if(!el||el.hidden) return;
  const dpr=window.devicePixelRatio||1;
  ov.style.left=el.offsetLeft+"px";ov.style.top=el.offsetTop+"px";
  ov.style.width=el.offsetWidth+"px";ov.style.height=el.offsetHeight+"px";
  ov.width=Math.round(el.offsetWidth*dpr);ov.height=Math.round(el.offsetHeight*dpr);
}
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||"#888"}
function dirOf(kp){
  if($("face-r").checked) return 1; if($("face-l").checked) return -1;
  const n=kp[0],ears=[kp[3],kp[4]].filter(okp);
  if(okp(n)&&ears.length){const ex=ears.reduce((a,p)=>a+p.x,0)/ears.length;return n.x>=ex?1:-1}
  return 1;
}
function drawPose(kp){
  fitOv();octx.clearRect(0,0,ov.width,ov.height);if(!kp) return;
  const [nw,nh]=natSize();const el=mediaEl();const sx=ov.width/nw,sy=ov.height/nh,dpr=window.devicePixelRatio||1;
  const P=p=>[p.x*sx,p.y*sy];const a=arm(),hit=new Set([a.sh+"-"+a.el,a.el+"-"+a.wr]);
  const ink=cssVar("--court"),hot=cssVar("--cork");
  octx.lineCap="round";
  EDGES.forEach(([i,j])=>{if(!okp(kp[i])||!okp(kp[j])) return;const h=hit.has(i+"-"+j);
    octx.strokeStyle=h?hot:ink;octx.lineWidth=(h?5:3.5)*dpr;octx.beginPath();octx.moveTo(...P(kp[i]));octx.lineTo(...P(kp[j]));octx.stroke()});
  kp.forEach((p,i)=>{if(!okp(p)||(i>0&&i<5)) return;octx.fillStyle=i===a.wr?hot:"#fff";octx.strokeStyle=ink;octx.lineWidth=1.5*dpr;octx.beginPath();octx.arc(...P(p),(i===a.wr?6:4)*dpr,0,7);octx.fill();octx.stroke()});
  const S0=kp[a.sh],W0=kp[a.wr];
  if(okp(S0)&&okp(W0)){const L=dist(S0,W0);const [x0,y0]=P(S0);
    octx.setLineDash([6*dpr,5*dpr]);octx.strokeStyle=hot;octx.lineWidth=2*dpr;octx.beginPath();octx.moveTo(x0,y0);octx.lineTo(x0,(S0.y-L)*sy);octx.stroke();octx.setLineDash([]);
    const rm=isRear()?rearMetrics(kp):null,th=Math.round(deg(Math.atan2(dirOf(kp)*(W0.x-S0.x),-(W0.y-S0.y))));
    if(rm){if(rm.el!=null){octx.font=`${14*dpr}px "IBM Plex Mono",monospace`;octx.fillStyle=hot;octx.fillText("ศอก "+Math.round(rm.el)+"°",x0+8*dpr,(S0.y-L*0.55)*sy)}return}
    octx.font=`${14*dpr}px "IBM Plex Mono",monospace`;octx.fillStyle=hot;octx.fillText((th>0?"+":"")+th+"°",x0+8*dpr,(S0.y-L*0.55)*sy);}
}
function zoneOf(th){return th<0?"หลังศีรษะ":th<10?"จุดสูงสุด":th<=30?"โซนแนะนำ":"ต่ำ/หน้าเกินไป"}
function scTheta(th){return th>=10&&th<=30?5:(th>=5&&th<10)||(th>30&&th<=38)?4:(th>=0&&th<5)||(th>38&&th<=45)?3:th>=-10&&th<0?2:1}
function pill(s){return s==null?'<span class="pill n">ข้อมูลไม่พอ</span>':s>=4?'<span class="pill g">ดี</span>':s===3?'<span class="pill m">พอใช้</span>':'<span class="pill b">ควรแก้</span>'}
function row(n,v,s,d){return `<div class="metric"><span class="mn">${n}</span><span class="mv">${v}</span>${pill(s)}<span class="md">${d}</span>${s!=null&&s<=2?`<div class="mthumb" data-mn="${n}"><span class="note">กำลังดึงภาพนิ่งจากวิดีโอ…</span></div>`:""}</div>`}
/* rear view (camera behind the player, facing the net): cues from the Jongnow TH clip with Busanan Ongbamrungphan */
const isRear=()=>$("view-rear").checked;
function rearMetrics(kp){
  const a=arm(),S0=kp[a.sh],E0=kp[a.el],W0=kp[a.wr],O=kp[a.sh===6?5:6];if(!okp(S0)||!okp(W0)) return null;
  let el=null,reach=null,lat=null;
  if(okp(E0)){const u=[S0.x-E0.x,S0.y-E0.y],v=[W0.x-E0.x,W0.y-E0.y];el=deg(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v))))));
    const L=dist(S0,E0)+dist(E0,W0);if(L>0) reach=(S0.y-W0.y)/L}
  if(okp(O)){const sw=Math.abs(S0.x-O.x),out=Math.sign(S0.x-O.x)||1;if(sw>0) lat=(W0.x-S0.x)*out/sw}
  return {el,reach,lat};
}
const scExt=e=>e>=160?5:e>=150?4:e>=135?3:2;
const scReach=r=>r>=0.85?5:r>=0.75?4:r>=0.6?3:2;
const scLat=l=>l>=-0.6&&l<=0.5?5:l>=-0.9&&l<=0.9?3:2;
function rearRows(m){
  const out=[];
  if(m.el!=null){const e=Math.round(m.el);out.push(row("แขนเหยียดตอนกระทบ",`${e}°`,scExt(m.el),e>=150?"แขนเหยียดเกือบสุด ไม้ได้ระยะสูงสุด":"ศอกยังงอ ควรเหยียดแขนให้สุดตอนไม้โดนลูก"))}
  else out.push(row("แขนเหยียดตอนกระทบ","–",null,"มองไม่เห็นศอกข้างที่ตีชัดพอ"));
  if(m.reach!=null) out.push(row("ความสูงจุดกระทบ",`${Math.round(m.reach*100)}%`,scReach(m.reach),"ความสูงของข้อมือเหนือไหล่ เทียบกับความยาวแขน · 100% คือเหยียดตรงขึ้นเหนือศีรษะ"));
  else out.push(row("ความสูงจุดกระทบ","–",null,"มองไม่เห็นแขนข้างที่ตีชัดพอ"));
  if(m.lat!=null){const l=m.lat;out.push(row("ตำแหน่งลูกซ้ายขวา",l<-0.6?"เยื้องเข้าศีรษะ":l>0.5?"ออกข้างตัว":"เหนือไหล่",scLat(l),"ตำแหน่งข้อมือเทียบไหล่ข้างที่ตี (ระยะเท่าความกว้างไหล่) · ควรอยู่เหนือไหล่ข้างที่ตี ไม่อ้อมศีรษะและไม่ออกข้างตัว"))}
  else out.push(row("ตำแหน่งลูกซ้ายขวา","–",null,"มองไม่เห็นไหล่สองข้างชัดพอ"));
  return out;
}
function rearScores(m){return {es:m.el==null?null:scExt(m.el),rs:m.reach==null?null:scReach(m.reach),ls:m.lat==null?null:scLat(m.lat)}}
function rearVScores(r){const v=[r.rs,r.ls].filter(x=>x!=null);return v.length?{setp:Math.min(...v)}:null}
function staticMetrics(kp){
  const a=arm(),S0=kp[a.sh],E0=kp[a.el],W0=kp[a.wr];if(!okp(S0)||!okp(W0)) return null;
  const th=deg(Math.atan2(dirOf(kp)*(W0.x-S0.x),-(W0.y-S0.y)));
  let el=null;if(okp(E0)){const u=[S0.x-E0.x,S0.y-E0.y],v=[W0.x-E0.x,W0.y-E0.y];el=deg(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v))))))}
  let w=null;const smd=okp(kp[5])&&okp(kp[6])?midp(kp[5],kp[6]):null,hmd=okp(kp[11])&&okp(kp[12])?midp(kp[11],kp[12]):null;
  if(smd&&hmd){const T0=dist(smd,hmd);if(T0>0) w=Math.abs(kp[5].x-kp[6].x)/T0}
  return {th,el,w};
}
function showStatic(kp,suffix){
  if(isRear()) return rearStatic(kp,suffix);
  const m=staticMetrics(kp);
  if(!m){narStop();$("btn-narrate").hidden=true;$("metrics").innerHTML="";vs("มองไม่เห็นไหล่หรือข้อมือข้างที่ตีชัดพอ ลองภาพที่เห็นทั้งตัวจากด้านข้าง หรือเปลี่ยนมือที่ตี");$("btn-apply").hidden=true;lastM=null;renderDrill();return}
  const s=scTheta(m.th),thr=Math.round(m.th);
  let h=row("จุดกระทบ (มุมแขนจากแนวตั้ง)",`${thr>0?"+":""}${thr}°`,s,`${zoneOf(m.th)} · คลิปแนะนำให้กระทบต่ำกว่าจุดสูงสุดเล็กน้อยและอยู่หน้าตัว (ราว +10° ถึง +30°)`);
  if(m.el!=null){const e=Math.round(m.el),es=e>=150?5:e>=130?3:2;h+=row("ศอกตอนกระทบ",`${e}°`,es,e>=150?"แขนเหยียดเกือบสุด":e>=130?"ศอกงออยู่บ้าง":"ศอกงอมาก มักเกิดจากลูกเลยตัวหรือจุดกระทบชิดตัวเกินไป")}
  $("metrics").innerHTML=h;fillThumbs("static");
  vScores={setp:s};$("btn-apply").hidden=false;
  lastM={src:kind==="image"?"image":"frame",th:m.th,el:m.el,w:m.w,es:m.el==null?null:Math.round(m.el)>=150?5:Math.round(m.el)>=130?3:2};narShow();renderDrill();
  vs(`วิเคราะห์เฟรมเดียวแล้ว${suffix||""}`);
}
/* stills of frames behind each "ควรแก้" row — kept in the page only, never saved */
let thumbTok=0;
function thumbIndex(name){
  const a=arm(),c=cIdx,tc=frames[c].t,near=t=>nearest(t),inW=(lo,hi)=>frames.map((f,i)=>i).filter(i=>frames[i].t>=tc+lo&&frames[i].t<=tc+hi);
  if(/ลำดับการส่งแรง/.test(name)) return near(tc-0.15);
  if(/หมุนลำตัว|ท่าเตรียม/.test(name)){let bi=near(tc-0.4),bw=1e9;inW(-0.9,-0.12).forEach(i=>{const k=frames[i].kp;if(okp(k[5])&&okp(k[6])){const w=Math.abs(k[5].x-k[6].x);if(w<bw){bw=w;bi=i}}});return bi}
  if(/ศีรษะ/.test(name)){const kc=frames[c].kp;if(!okp(kc[0])||!okp(kc[5])||!okp(kc[6])) return near(tc-0.2);const rel=k=>({x:k[0].x-(k[5].x+k[6].x)/2,y:k[0].y-(k[5].y+k[6].y)/2}),r0=rel(kc);let bi=c,bd=-1;inW(-0.4,0).forEach(i=>{const k=frames[i].kp;if(okp(k[0])&&okp(k[5])&&okp(k[6])){const d=dist(rel(k),r0);if(d>bd){bd=d;bi=i}}});return bi}
  if(/กลับกลางคอร์ท|ก้าวตามลูก/.test(name)) return near(tc+0.6);
  if(/ยกศอก/.test(name)) return near(tc-0.4);
  return c;
}
function snap(src,kp){
  const [nw,nh]=natSize(),W=320,H=Math.round(W*nh/nw),cv=document.createElement("canvas");cv.width=W;cv.height=H;const x=cv.getContext("2d");
  x.drawImage(src,0,0,W,H);if(!kp) return cv.toDataURL("image/jpeg",0.82);
  const sx=W/nw,sy=H/nh,P=p=>[p.x*sx,p.y*sy],a=arm(),hit=new Set([a.sh+"-"+a.el,a.el+"-"+a.wr]),ink=cssVar("--court"),hot=cssVar("--cork");
  x.lineCap="round";
  EDGES.forEach(([i,j])=>{if(!okp(kp[i])||!okp(kp[j])) return;const h=hit.has(i+"-"+j);x.strokeStyle=h?hot:ink;x.lineWidth=h?4:3;x.beginPath();x.moveTo(...P(kp[i]));x.lineTo(...P(kp[j]));x.stroke()});
  kp.forEach((p,i)=>{if(!okp(p)||(i>0&&i<5)) return;x.fillStyle=i===a.wr?hot:"#fff";x.strokeStyle=ink;x.lineWidth=1.2;x.beginPath();x.arc(...P(p),i===a.wr?5:3.2,0,7);x.fill();x.stroke()});
  return cv.toDataURL("image/jpeg",0.82);
}
function thumbFig(url,t){return `<figure><img src="${url}" alt="ภาพนิ่งจากเฟรมที่ควรแก้"${t!=null?` data-t="${t}" tabindex="0" role="button"`:""}><figcaption>${t!=null?`เฟรมที่ ${t.toFixed(2)} วินาที · แตะเพื่อไปที่เฟรมนี้`:"ภาพที่วิเคราะห์"}</figcaption></figure>`}
async function fillThumbs(mode){
  const tok=++thumbTok;
  while(busy){await new Promise(r=>setTimeout(r,120));if(tok!==thumbTok) return}
  const slots=[...document.querySelectorAll("#metrics .mthumb")];if(!slots.length) return;
  try{
    if(mode==="static"){const url=snap(mediaEl(),lastKP);slots.forEach(s=>{s.innerHTML=thumbFig(url,kind==="video"?vid.currentTime:null)});return}
    if(!frames||cIdx==null) return;
    const want=slots.map(s=>thumbIndex(s.dataset.mn)),uniq=[...new Set(want)],cache={};
    setBusy(true);
    for(const fi of uniq){await seekTo(frames[fi].t);if(tok!==thumbTok) break;cache[fi]=snap(vid,frames[fi].kp)}
    slots.forEach((s,i)=>{const fi=want[i];if(cache[fi]&&s.isConnected) s.innerHTML=thumbFig(cache[fi],frames[fi].t)});
    if(tok===thumbTok){await seekTo(frames[cIdx].t);lastKP=frames[cIdx].kp;drawPose(lastKP)}
  }catch(e){slots.forEach(s=>{s.innerHTML='<span class="note">ดึงภาพจากวิดีโอไม่สำเร็จ</span>'})}
  finally{if(busy) setBusy(false)}
}
function goThumb(img){if(kind!=="video"||busy) return;vid.pause();seekTo(+img.dataset.t)}
$("metrics").addEventListener("click",e=>{const im=e.target.closest("img[data-t]");if(im) goThumb(im)});
$("metrics").addEventListener("keydown",e=>{const im=e.target.closest("img[data-t]");if(im&&(e.key==="Enter"||e.key===" ")){e.preventDefault();goThumb(im)}});
function seekTo(t){return new Promise(r=>{let done=false;const fin=()=>{if(done)return;done=true;vid.removeEventListener("seeked",fin);r()};vid.addEventListener("seeked",fin);vid.currentTime=t;setTimeout(fin,2000)})}
function nearest(t){let b=0,bd=1e9;frames.forEach((f,i)=>{const d=Math.abs(f.t-t);if(d<bd){bd=d;b=i}});return b}
function scanAnalyse(){
  const a=arm(),n=frames.length;
  const Ts=frames.map(f=>{const k=f.kp;const sm=okp(k[5])&&okp(k[6])?midp(k[5],k[6]):k[a.sh],hm=okp(k[11])&&okp(k[12])?midp(k[11],k[12]):k[a.hp];return okp(sm)&&okp(hm)?dist(sm,hm):null}).filter(x=>x).sort((x,y)=>x-y);
  if(!Ts.length){vs("จับท่าทางในคลิปไม่ได้ ลองคลิปที่เห็นทั้งตัวจากด้านข้างชัดขึ้น หรือเปลี่ยนมือที่ตี");lastM=null;renderDrill();return false}
  const T=Ts[Math.floor(Ts.length/2)];
  const get=(k,key)=>key==="hip"?(okp(k[11])&&okp(k[12])?midp(k[11],k[12]):k[a.hp]):k[a[key]];
  const sp=key=>frames.map((f,i)=>{if(i===0||i===n-1) return 0;const p=get(frames[i-1].kp,key),q=get(frames[i+1].kp,key);if(!okp(p)||!okp(q)) return 0;return dist(p,q)/(frames[i+1].t-frames[i-1].t)/T});
  const smooth=arr=>arr.map((v,i)=>(arr[Math.max(0,i-1)]+v+arr[Math.min(arr.length-1,i+1)])/3);
  const SP={hip:smooth(sp("hip")),sh:smooth(sp("sh")),el:smooth(sp("el")),wr:smooth(sp("wr"))};
  if(cIdx==null&&isRear()){let best=1e9,bi=0;frames.forEach((f,i)=>{const w=f.kp[a.wr];if(okp(w)&&w.y<best){best=w.y;bi=i}});cIdx=bi}
  if(cIdx==null){let best=-1,bi=0;frames.forEach((f,i)=>{const k=f.kp;const above=okp(k[a.wr])&&okp(k[a.sh])&&k[a.wr].y<k[a.sh].y;const v=SP.wr[i]*(above?1:0.4);if(v>best){best=v;bi=i}});cIdx=bi}
  const c=cIdx,tc=frames[c].t,kc=frames[c].kp,dir=dirOf(kc);
  const inW=(lo,hi)=>frames.map((f,i)=>i).filter(i=>frames[i].t>=tc+lo&&frames[i].t<=tc+hi);
  if(isRear()) return rearScan({a,n,T,SP,c,tc,inW});
  const st0=staticMetrics(kc);const out=[];const sc={};const M={src:"scan"};
  if(st0){const s=scTheta(st0.th),thr=Math.round(st0.th);sc.setp=s;M.th=st0.th;M.el=st0.el;out.push(row("จุดกระทบ",`${thr>0?"+":""}${thr}°`,s,`${zoneOf(st0.th)} · มุมแขนจากแนวตั้งที่เฟรมกระทบ (แนะนำ +10° ถึง +30°)`))}
  const W1=frames[Math.max(0,c-1)].kp[a.wr],W2=frames[Math.min(n-1,c+1)].kp[a.wr];
  if(okp(W1)&&okp(W2)){const phi=Math.round(deg(Math.atan2(-(W2.y-W1.y),dir*(W2.x-W1.x))));const s=phi<=0?5:phi<=15?4:phi<=30?3:phi<=50?2:1;sc.throw=s;M.phi=phi;
    out.push(row("ทิศการเคลื่อนของมือตอนกระทบ",phi>0?`ขึ้น ${phi}°`:`ลง ${-phi}°`,s,s>=4?"มือพุ่งไปข้างหน้า เหมือนการขว้าง":"มือยังเหวี่ยงขึ้นไปหาลูก ทำให้กระทบช้า"))}
  else out.push(row("ทิศการเคลื่อนของมือตอนกระทบ","–",null,"มองไม่เห็นข้อมือชัดพอรอบจังหวะกระทบ"));
  const win=inW(-0.7,0.12);const keys=[["hip","สะโพก"],["sh","ไหล่"],["el","ศอก"],["wr","ข้อมือ"]];
  if(win.length>=4){const pk=keys.map(([k,l])=>{let bi=win[0];win.forEach(i=>{if(SP[k][i]>SP[k][bi]) bi=i});return {l,t:frames[bi].t-tc}});
    let good=0;for(let i=0;i<3;i++) if(pk[i].t<=pk[i+1].t+0.001) good++;const s=[1,2,3,5][good];sc.seq=s;M.good=good;M.pk=pk;M.lagMs=Math.round((pk[3].t-pk[2].t)*1000);
    out.push(row("ลำดับการส่งแรง",`${good}/3 คู่ถูกลำดับ`,s,pk.map(p=>`${p.l} ${p.t>=0?"+":""}${Math.round(p.t*1000)} ms`).join(" → ")+" (ค่าลบ = ก่อนจังหวะกระทบ) · ลำดับที่ดีคือ สะโพก → ไหล่ → ศอก → ข้อมือ"))}
  else out.push(row("ลำดับการส่งแรง","–",null,"คลิปมีเฟรมก่อนจังหวะกระทบไม่พอ"));
  const wid=i=>{const k=frames[i].kp;return okp(k[5])&&okp(k[6])?Math.abs(k[5].x-k[6].x)/T:null};
  const prep=inW(-0.9,-0.12).map(wid).filter(x=>x!=null),atC=inW(-0.05,0.1).map(wid).filter(x=>x!=null);
  if(prep.length&&atC.length){const wp=Math.min(...prep),wc=Math.max(...atC),dl=wc-wp;const s=wp>0.5?2:dl>0.25?5:dl>0.15?4:dl>0.08?3:2;sc.torso=s;M.wp=wp;M.wc=wc;M.dl=dl;
    out.push(row("การหมุนลำตัว",`${wp.toFixed(2)} → ${wc.toFixed(2)}`,s,`ความกว้างไหล่ในภาพ (เทียบความยาวลำตัว) ตอนง้างไปจนถึงตอนกระทบ · ค่าตอนง้างน้อยแปลว่าตะแคงตัวดี ค่าที่เพิ่มขึ้นแปลว่าลำตัวหมุนเข้ามา`))}
  else out.push(row("การหมุนลำตัว","–",null,"มองไม่เห็นไหล่สองข้างชัดพอ"));
  const hw=inW(-0.4,0);const rel=hw.map(i=>{const k=frames[i].kp;return okp(k[0])&&okp(k[5])&&okp(k[6])?{x:k[0].x-(k[5].x+k[6].x)/2,y:k[0].y-(k[5].y+k[6].y)/2}:null}).filter(x=>x);
  if(rel.length>=3){const last=rel[rel.length-1];const r=Math.max(...rel.map(p=>dist(p,last)))/T;const s=r<0.12?5:r<0.2?4:r<0.3?3:r<0.4?2:1;sc.gaze=s;M.head=r;
    out.push(row("ศีรษะนิ่ง",r.toFixed(2),s,"ระยะที่ศีรษะขยับเทียบกับไหล่ ใน 0.4 วินาทีก่อนกระทบ ยิ่งน้อยยิ่งดี"))}
  else out.push(row("ศีรษะนิ่ง","–",null,"มองไม่เห็นศีรษะชัดพอ"));
  lastM=M;$("metrics").innerHTML=out.join("");fillThumbs("scan");vScores=sc;$("btn-apply").hidden=!Object.keys(sc).length;narShow();
  drawSpeed(SP,tc);renderDrill();
  vs(`สแกน ${n} เฟรมแล้ว · จุดกระทบที่ ${tc.toFixed(2)} วินาที ถ้าไม่ตรง เลื่อนวิดีโอไปเฟรมที่ไม้กระทบลูก แล้วกด “ตั้งเฟรมนี้เป็นจุดกระทบ”`);
  return true;
}
function rearStatic(kp,suffix){
  const m=rearMetrics(kp);
  if(!m){narStop();$("btn-narrate").hidden=true;$("metrics").innerHTML="";vs("มองไม่เห็นไหล่หรือข้อมือข้างที่ตีชัดพอ ลองภาพที่เห็นทั้งตัวจากด้านหลัง หรือเปลี่ยนมือที่ตี");$("btn-apply").hidden=true;lastM=null;vScores=null;renderDrill();return}
  const r=rearScores(m);$("metrics").innerHTML=rearRows(m).join("");fillThumbs("static");
  vScores=rearVScores(r);$("btn-apply").hidden=!vScores;
  lastM=Object.assign({src:kind==="image"?"image":"frame",view:"rear"},m,r);narShow();renderDrill();
  vs(`วิเคราะห์เฟรมเดียวจากมุมด้านหลังแล้ว${suffix||""}`);
}
function rearScan(o){
  const {a,n,T,c,tc,inW}=o,kc=frames[c].kp,m=rearMetrics(kc)||{el:null,reach:null,lat:null},r=rearScores(m),out=rearRows(m),M=Object.assign({src:"scan",view:"rear"},m,r);
  const pw=inW(-0.9,-0.1).map(i=>{const k=frames[i].kp,S0=k[a.sh],E0=k[a.el];return okp(S0)&&okp(E0)?(S0.y-E0.y)/T:null}).filter(x=>x!=null);
  if(pw.length){const e=Math.max(...pw),s=e>=0?5:e>=-0.1?4:e>=-0.25?3:2;M.eu=e;M.eus=s;
    out.push(row("ยกศอกตอนตั้งท่า",e>=0?"สูงกว่าไหล่":`ต่ำกว่าไหล่ ${Math.round(-e*100)}%`,s,"ความสูงของศอกเทียบไหล่ ช่วงก่อนตี (เทียบความยาวลำตัว) · ตั้งท่าควรยกศอกขึ้นระดับไหล่ หน้าไม้เปิดไปข้างหน้า"))}
  else out.push(row("ยกศอกตอนตั้งท่า","–",null,"คลิปมีช่วงก่อนกระทบไม่พอ หรือมองไม่เห็นศอก"));
  const tl=i=>{const k=frames[i].kp;const sm=okp(k[5])&&okp(k[6])?midp(k[5],k[6]):null,hm=okp(k[11])&&okp(k[12])?midp(k[11],k[12]):null;return sm&&hm?dist(sm,hm):null};
  const med=v=>{const x=v.filter(y=>y!=null).sort((p,q)=>p-q);return x.length?x[Math.floor(x.length/2)]:null};
  const before=med(inW(-0.15,0).map(tl)),after=med(inW(0.4,0.9).map(tl));
  if(before&&after&&frames[n-1].t-tc>=0.5){const ratio=after/before,s=ratio<=0.95?5:ratio<=0.98?4:ratio<=1.02?3:2;M.fw=ratio;M.fws=s;
    out.push(row("ก้าวตามลูกหลังตบ",ratio<1?`ไปข้างหน้า ${Math.round((1-ratio)*100)}%`:`ถอยหลัง ${Math.round((ratio-1)*100)}%`,s,"ขนาดลำตัวในภาพหลังตบเทียบกับตอนตี (ค่าประมาณ) · ตัวเล็กลงแปลว่าก้าวตามลูกไปทางเน็ต ตัวใหญ่ขึ้นแปลว่าถอยหลังเข้าหากล้อง"))}
  else out.push(row("ก้าวตามลูกหลังตบ","–",null,"คลิปหลังตบสั้นกว่า 0.5 วินาที ถ่ายต่ออีกสักพักหลังตี"));
  lastM=M;$("metrics").innerHTML=out.join("");fillThumbs("scan");vScores=rearVScores(r);$("btn-apply").hidden=!vScores;narShow();
  drawSpeed(o.SP,tc);renderDrill();
  vs(`สแกน ${n} เฟรมแล้ว (มุมด้านหลัง) · จุดกระทบ (ตอนข้อมือสูงสุด) ที่ ${tc.toFixed(2)} วินาที ถ้าไม่ตรง เลื่อนวิดีโอไปเฟรมที่ไม้กระทบลูก แล้วกด “ตั้งเฟรมนี้เป็นจุดกระทบ”`);
  return true;
}
function drawSpeed(SP,tc){
  const t0=frames[0].t,t1=frames[frames.length-1].t||1,X=t=>10+(t-t0)/(t1-t0||1)*300;
  const col={hip:"var(--muted)",sh:"var(--court)",el:"var(--mid)",wr:"var(--cork)"};
  let g=`<line x1="10" y1="108" x2="310" y2="108" stroke="var(--line)"/>`;
  Object.keys(SP).forEach(k=>{const mx=Math.max(...SP[k])||1;g+=`<polyline fill="none" stroke="${col[k]}" stroke-width="${k==="wr"?2:1.5}" points="${frames.map((f,i)=>X(f.t).toFixed(1)+","+(108-SP[k][i]/mx*96).toFixed(1)).join(" ")}"/>`});
  g+=`<line x1="${X(tc).toFixed(1)}" y1="6" x2="${X(tc).toFixed(1)}" y2="108" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="${Math.min(300,X(tc)+4).toFixed(1)}" y="16" font-size="10" fill="var(--ink)">กระทบ</text>`;
  $("speed").innerHTML=g;$("speed-wrap").hidden=false;
}
function resetVL(){narStop();$("btn-narrate").hidden=true;lastM=null;frames=null;cIdx=null;lastKP=null;vScores=null;$("metrics").innerHTML="";$("speed-wrap").hidden=true;$("btn-apply").hidden=true;$("btn-setc").hidden=true;octx.clearRect(0,0,ov.width,ov.height);renderDrill()}
function setBusy(b){busy=b;$("btn-scan").disabled=b||kind!=="video";$("btn-frame").disabled=b||!kind;$("btn-setc").disabled=b;$("btn-clear").disabled=b}
$("media-file").addEventListener("change",e=>{
  const f=e.target.files&&e.target.files[0];if(!f) return;
  resetVL();if(objUrl) URL.revokeObjectURL(objUrl);objUrl=URL.createObjectURL(f);
  if(f.type.startsWith("video/")){
    kind="video";img.hidden=true;img.removeAttribute("src");vid.hidden=false;$("stage-empty").hidden=true;vid.src=objUrl;
    vid.onloadeddata=()=>{fitOv();setBusy(false);const d=vid.duration;vs(isFinite(d)?`วิดีโอยาว ${d.toFixed(1)} วินาที${d>12?" (ตัดให้เหลือ 2–5 วินาทีจะแม่นกว่า)":""} · กด “สแกนทั้งคลิป” เพื่อหาจังหวะกระทบอัตโนมัติ`:"กด “วิเคราะห์เฟรมนี้” ที่เฟรมกระทบลูก")};
    vid.onerror=()=>vs("เปิดวิดีโอนี้ในเบราว์เซอร์ไม่ได้ ลองไฟล์ MP4");
  }else if(f.type.startsWith("image/")){
    kind="image";vid.pause();vid.hidden=true;vid.removeAttribute("src");img.hidden=false;$("stage-empty").hidden=true;img.src=objUrl;
    img.onload=async()=>{fitOv();setBusy(true);try{const [w,h]=natSize();lastKP=await detect(img,w,h);drawPose(lastKP);runId++;showStatic(lastKP,isRear()?" (ภาพนิ่งวัดได้เฉพาะตอนกระทบ ส่วนการยกศอกและการก้าวตามลูกต้องใช้คลิป)":" (ภาพนิ่งวัดได้เฉพาะจุดกระทบและศอก)")}catch(err){vs(err.message||"วิเคราะห์ไม่สำเร็จ")}setBusy(false)};
  }else{kind=null;vs("รองรับเฉพาะไฟล์วิดีโอหรือภาพ")}
  $("btn-clear").hidden=false;
});
/* empty stage doubles as a drop zone: click or drop a file to load it */
const stageEl=$("stage"),stageEmpty=$("stage-empty");
stageEmpty.addEventListener("click",()=>{if(!busy) $("media-file").click()});
stageEmpty.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();if(!busy) $("media-file").click()}});
stageEl.addEventListener("dragover",e=>{if(busy) return;e.preventDefault();stageEl.classList.add("drag")});
stageEl.addEventListener("dragleave",()=>stageEl.classList.remove("drag"));
stageEl.addEventListener("drop",e=>{e.preventDefault();stageEl.classList.remove("drag");const fs=e.dataTransfer&&e.dataTransfer.files;if(busy||!fs||!fs.length) return;const dt=new DataTransfer();dt.items.add(fs[0]);$("media-file").files=dt.files;$("media-file").dispatchEvent(new Event("change"))});
$("btn-clear").addEventListener("click",()=>{
  if(busy) return;thumbTok++;resetVL();
  vid.onloadeddata=vid.onerror=img.onload=null;vid.pause();vid.removeAttribute("src");vid.load();vid.hidden=true;img.removeAttribute("src");img.hidden=true;
  if(objUrl){URL.revokeObjectURL(objUrl);objUrl=null}
  kind=null;$("media-file").value="";$("stage-empty").hidden=false;$("btn-clear").hidden=true;$("assess").hidden=true;setBusy(false);
  vs("ยังไม่ได้เลือกไฟล์ เลือกคลิปท่าตบจากมุมด้านข้าง หรือภาพนิ่งตอนกระทบลูก");
});
$("btn-frame").addEventListener("click",async()=>{
  if(!kind||busy) return;setBusy(true);
  try{if(kind==="video") vid.pause();const [w,h]=natSize();lastKP=await detect(mediaEl(),w,h);drawPose(lastKP);runId++;showStatic(lastKP,kind==="video"?" · กด “สแกนทั้งคลิป” เพื่อวัดลำดับการส่งแรง การหมุนตัว และทิศของมือด้วย":"")}
  catch(err){vs(err.message||"วิเคราะห์ไม่สำเร็จ")}
  setBusy(false);
});
$("btn-scan").addEventListener("click",async()=>{
  if(kind!=="video"||busy) return;const d=vid.duration;if(!isFinite(d)){vs("อ่านความยาววิดีโอไม่ได้ ใช้ “วิเคราะห์เฟรมนี้” แทน");return}
  setBusy(true);resetVL();vid.pause();
  try{await getNet();const step=Math.max(1/24,d/220);const [w,h]=natSize();frames=[];
    for(let t=0;t<=d+1e-6;t+=step){await seekTo(Math.min(t,d-0.001));const kp=await detect(vid,w,h);frames.push({t:vid.currentTime,kp});drawPose(kp);vs(`กำลังสแกน ${Math.min(100,Math.round(t/d*100))}%`)}
    if(frames.length<5){vs("คลิปสั้นเกินไปสำหรับการสแกน");setBusy(false);return}
    runId++;if(scanAnalyse()){$("btn-setc").hidden=false;await seekTo(frames[cIdx].t);lastKP=frames[cIdx].kp;drawPose(lastKP)}
  }catch(err){vs(err.message||"สแกนไม่สำเร็จ")}
  setBusy(false);
});
$("btn-setc").addEventListener("click",()=>{if(!frames||busy) return;cIdx=nearest(vid.currentTime);lastKP=frames[cIdx].kp;drawPose(lastKP);runId++;scanAnalyse()});
vid.addEventListener("seeked",()=>{if(frames&&!busy){lastKP=frames[nearest(vid.currentTime)].kp;drawPose(lastKP)}});
vid.addEventListener("play",()=>{octx.clearRect(0,0,ov.width,ov.height)});
function applyView(){const r=isRear();$("opt-face").hidden=r;$("tips-rear").hidden=!r;$("tips-side").hidden=r;$("rear-note").hidden=!r}
["view-side","view-rear"].forEach(id=>$(id).addEventListener("change",()=>{applyView();cIdx=null;if(lastKP) drawPose(lastKP);if(frames){if(scanAnalyse()&&cIdx!=null){lastKP=frames[cIdx].kp;seekTo(frames[cIdx].t).then(()=>drawPose(lastKP))}}else if(lastKP) showStatic(lastKP)}));
applyView();
["hand-r","hand-l","face-a","face-r","face-l"].forEach(id=>$(id).addEventListener("change",()=>{if(lastKP) drawPose(lastKP);if(frames) scanAnalyse();else if(lastKP) showStatic(lastKP)}));
window.addEventListener("resize",()=>{if(lastKP) drawPose(lastKP)});
$("btn-apply").addEventListener("click",()=>{
  if(!vScores) return;const ks=Object.keys(vScores);
  ks.forEach(k=>{st.scores[k]=vScores[k]});
  isEx=false;paintInputs();save(KEY,st);analyse();
  $("assess").hidden=false;
  const rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;$("assess").scrollIntoView({behavior:rm?"auto":"smooth",block:"start"});
  vs(`ปรับคะแนน ${ks.length} หัวข้อในแบบประเมินแล้ว: ${ks.map(k=>F.find(f=>f.id===k).n).join(", ")}`);
});

/* practice check: judge one drill from the uploaded photo or clip */
const NEED={throw:"วิดีโอ",relax:"เช็คลิสต์",torso:"ภาพท่าง้าง หรือวิดีโอ",seq:"วิดีโอ",minp:"เช็คลิสต์",gaze:"วิดีโอ",setp:"ภาพจังหวะกระทบ หรือวิดีโอ",lag:"วิดีโอ"};
const UPL={throw:"คลิปด้านข้าง 2–5 วินาที ตบหรือ shadow 1 ครั้ง",torso:"ภาพนิ่งตอนง้างไม้ หรือคลิปทั้งจังหวะ",seq:"คลิปด้านข้างตั้งแต่ง้างจนตีเสร็จ",gaze:"คลิปด้านข้างที่เห็นศีรษะชัด",setp:"ภาพนิ่งตรงจังหวะกระทบ หรือคลิปทั้งจังหวะ",lag:"คลิปด้านข้าง (60 fps ได้จะดี)"};
const CKL={
  relax:["ได้ยินเสียงวืดดังตรงจุดกระทบ ไม่ใช่ตอนเริ่มเหวี่ยง","ก่อนตีไม่รู้สึกเกร็งที่ไหล่และปลายแขน","หลังตบ มือคลายด้ามได้ทันที"],
  minp:["ตบด้วยแรงราว 60–80% ไม่ใช่สุดแรง","ตบแล้วตัวไม่เสียหลัก กลับมาพร้อมรับได้","ลูกยังพุ่งลงชัน แม้ไม่ได้ออกแรงเต็มที่"]};
const ckState={relax:[false,false,false],minp:[false,false,false]};
const VL={pass:"ถูกต้อง",near:"ใกล้แล้ว",fail:"ยังไม่ถูก",na:"รอผลวิเคราะห์"};
function judge(id,M){
  const needScan=()=>({v:"na",meas:"เรื่องนี้ต้องใช้วิดีโอ",cue:`อัปโหลด${UPL[id]} แล้วกด “สแกนทั้งคลิป”`});
  if(!M) return {v:"na",meas:"ยังไม่ได้วิเคราะห์ไฟล์",cue:`อัปโหลด${UPL[id]}${kind==="video"?" แล้วกด “สแกนทั้งคลิป”":""}`};
  const r2=x=>x.toFixed(2);
  if(M.view==="rear"){
    if(id!=="setp") return {v:"na",meas:"เรื่องนี้วัดจากมุมด้านหลังไม่ได้",cue:`เปลี่ยนมุมกล้องเป็น “ด้านข้าง” แล้วอัปโหลด${UPL[id]||"คลิปด้านข้าง"}`};
    const s=Math.min(...[M.rs,M.ls].filter(x=>x!=null));if(!isFinite(s)) return {v:"na",meas:"มองไม่เห็นแขนข้างที่ตีชัดพอ",cue:"ลองภาพที่เห็นทั้งตัวจากด้านหลัง"};
    const v=s>=5?"pass":s>=3?"near":"fail";
    return {v,meas:`ความสูงจุดกระทบ ${M.reach!=null?Math.round(M.reach*100)+"%":"–"}${M.el!=null?` · ศอก ${Math.round(M.el)}°`:""}`,target:"เหยียดแขนเหนือศีรษะ (85% ขึ้นไป) และลูกอยู่เหนือไหล่ข้างที่ตี",cue:v==="pass"?"ตีเหนือศีรษะตอนแขนเหยียดสุด ตำแหน่งลูกดี":M.rs!=null&&M.rs<5?"จุดกระทบยังต่ำ ไปให้ถึงลูกเร็วขึ้น แล้วตีเหนือศีรษะตอนแขนเหยียดสุด":M.lat<0?"ลูกเยื้องเข้ามาเหนือศีรษะ ขยับตัวให้ลูกอยู่เหนือไหล่ข้างที่ตี":"ลูกออกไปด้านข้างตัว ขยับเข้าไปให้ลูกอยู่เหนือไหล่ข้างที่ตี"}}
  if(id==="setp"){if(M.th==null) return {v:"na",meas:"มองไม่เห็นแขนข้างที่ตีชัดพอ",cue:"ลองภาพที่เห็นทั้งตัวจากด้านข้าง"};
    const t=Math.round(M.th),v=t>=10&&t<=30?"pass":t>=5&&t<=38?"near":"fail";
    return {v,meas:`มุมจุดกระทบ ${t>0?"+":""}${t}°`,target:"+10° ถึง +30°",cue:v==="pass"?"จุดกระทบอยู่ในโซนแนะนำ รักษาจังหวะรอแบบนี้ไว้":t<10?"ตีเร็วเกินไปหรือลูกเลยศีรษะ ขยับไปอยู่หลังลูกอีกครึ่งก้าว แล้วรอให้ลูกตกลงมาอยู่หน้าตัว":"จุดกระทบต่ำหรือยื่นไปข้างหน้าเกิน เข้าไปอยู่ใต้ลูกให้เร็วขึ้นอีกนิด"}}
  if(id==="throw"){if(M.src!=="scan") return needScan();if(M.phi==null) return {v:"na",meas:"มองไม่เห็นข้อมือรอบจังหวะกระทบ",cue:"ลองคลิปที่เห็นมือชัด และแสงพอ"};
    const p=M.phi,v=p<=15?"pass":p<=30?"near":"fail";
    return {v,meas:`มือเคลื่อน${p>0?"ขึ้น":"ลง"} ${Math.abs(p)}° ตอนกระทบ`,target:"ไปข้างหน้าหรือเฉียงลง (ขึ้นไม่เกิน 15°)",cue:v==="pass"?"วงสวิงพุ่งไปข้างหน้าแบบการขว้างแล้ว":"มือยังเหวี่ยงขึ้นไปหาลูก นึกภาพว่ากำลังขว้างไม้ไปที่กลางคอร์ทฝั่งตรงข้าม"}}
  if(id==="torso"){
    if(M.src==="scan"&&M.dl!=null){const v=M.wp<=0.5&&M.dl>0.15?"pass":M.dl>0.08?"near":"fail";
      return {v,meas:`ความกว้างไหล่ ${r2(M.wp)} → ${r2(M.wc)} (เพิ่ม ${r2(M.dl)})`,target:"ตอนง้างแคบ แล้วเพิ่มขึ้นมากกว่า 0.15",cue:v==="pass"?"ตะแคงตอนง้างและหมุนลำตัวเข้ามาตอนตีได้ดี":M.wp>0.5?"ตอนง้างยังหันหน้าเข้าเน็ต หมุนไหล่ข้างที่ไม่ได้ตีให้ชี้ไปหาลูกก่อน":"ลำตัวหมุนเข้ามาน้อย ให้สะโพกและอกหมุนนำก่อนแขนเริ่มเหวี่ยง"}}
    if(M.w!=null){const v=M.w<0.35?"pass":M.w<0.5?"near":"fail";
      return {v,meas:`ความกว้างไหล่ในภาพ ${r2(M.w)}`,target:"ภาพท่าง้าง ต่ำกว่า 0.35 คือตะแคงตัวดี",cue:v==="pass"?"ตะแคงตัวพอแล้วตอนง้าง":"ยังหันหน้าเข้าเน็ตมากไป หมุนไหล่ข้างที่ไม่ได้ตีให้ชี้ไปหาลูก (ใช้ภาพตอนง้างไม้ ไม่ใช่ตอนกระทบ)"}}
    return {v:"na",meas:"มองไม่เห็นไหล่สองข้างชัดพอ",cue:`อัปโหลด${UPL.torso}`}}
  if(id==="seq"){if(M.src!=="scan") return needScan();if(M.good==null) return {v:"na",meas:"คลิปมีเฟรมก่อนจังหวะกระทบไม่พอ",cue:"ถ่ายให้เห็นตั้งแต่ตอนง้าง"};
    const v=M.good===3?"pass":M.good===2?"near":"fail";let bad=null;for(let i=0;i<3;i++) if(M.pk[i].t>M.pk[i+1].t+0.001){bad=i;break}
    return {v,meas:M.pk.map(p=>p.l).join(" → ")+` (ถูกลำดับ ${M.good}/3 คู่)`,target:"สะโพก → ไหล่ → ศอก → ข้อมือ",cue:bad==null?"ส่งแรงต่อกันถูกลำดับแล้ว":`${M.pk[bad+1].l}เร่งความเร็วก่อน${M.pk[bad].l} ลองทำ shadow ช้า ๆ ให้${M.pk[bad].l}ออกตัวก่อน แล้วค่อยต่อไปที่${M.pk[bad+1].l}`}}
  if(id==="gaze"){if(M.src!=="scan") return needScan();if(M.head==null) return {v:"na",meas:"มองไม่เห็นศีรษะชัดพอ",cue:"ถ่ายให้เห็นศีรษะ ไม่มีอะไรบัง"};
    const v=M.head<0.2?"pass":M.head<0.3?"near":"fail";
    return {v,meas:`ศีรษะขยับ ${r2(M.head)}`,target:"ต่ำกว่า 0.20",cue:v==="pass"?"ศีรษะนิ่งดี สายตาจับลูกได้":"ศีรษะขยับมากก่อนกระทบ มองลูกจนถึงจังหวะกระทบ อย่าเงยหน้าตามไม้"}}
  if(id==="lag"){if(M.src!=="scan") return needScan();if(M.lagMs==null) return {v:"na",meas:"คลิปมีเฟรมก่อนจังหวะกระทบไม่พอ",cue:"ถ่ายให้เห็นตั้งแต่ตอนง้าง"};
    const l=M.lagMs,v=l>=40?"pass":l>=15?"near":"fail";
    return {v,meas:`ข้อมือเร่งความเร็วหลังศอก ${l} ms`,target:"อย่างน้อย 40 ms (ประมาณจากข้อมือ เพราะโมเดลมองไม่เห็นไม้)",cue:v==="pass"?"มีจังหวะทิ้งไม้แล้วสะบัด":"แขนกับไม้ยังไปพร้อมกัน ให้ศอกนำขึ้นไปก่อน แล้วค่อยปล่อยให้มือกับไม้สะบัดตามมา"}}
  return {v:"na",meas:"",cue:""};
}
function renderDrill(){
  const id=$("focus").value,box=$("drill-check");
  if(!id){box.hidden=true;box.innerHTML="";return}
  const f=F.find(x=>x.id===id);box.hidden=false;let v,meas,target="",cue,extra="",foot;
  if(CKL[id]){const n=ckState[id].filter(Boolean).length;v=n===3?"pass":n===2?"near":n===0?"na":"fail";
    meas="ภาพจากกล้องวัดเรื่องนี้ไม่ได้ ใช้เช็คลิสต์หลังซ้อมแต่ละเซต";cue=v==="pass"?"ทำได้ครบทุกข้อ":v==="na"?"ซ้อมแล้วติ๊กข้อที่ทำได้":"ดูข้อที่ยังไม่ได้ติ๊ก แล้วซ้อมเซตต่อไปโดยเน้นข้อนั้น";
    extra=`<div class="ck">${CKL[id].map((t,i)=>`<label for="ck-${id}-${i}"><input type="checkbox" id="ck-${id}-${i}" data-ck="${i}"${ckState[id][i]?" checked":""}><span>${t}</span></label>`).join("")}</div>`;
    foot="เช็คลิสต์ไม่ถูกบันทึก";
  }else{const j=judge(id,lastM);v=j.v;meas=j.meas;target=j.target||"";cue=j.cue;
    if(v!=="na"&&lastM&&runId!==tallyRun){tallyRun=runId;tally.n++;if(v==="pass") tally.ok++}
    foot=`ต้องใช้: ${NEED[id]} · ตรวจไปแล้ว ${tally.n} ครั้งในรอบนี้ ถูกต้อง ${tally.ok} ครั้ง (ไม่บันทึก หายเมื่อปิดหน้า)`;}
  box.innerHTML=`<div class="dc-head"><div><div class="eyebrow">ตรวจท่าซ้อม</div><h3>${f.n}</h3></div><span class="verdict v-${v}">${VL[v]}</span></div>${meas?`<p class="meas">${meas}${target?` · เป้าหมาย ${target}`:""}</p>`:""}<p class="cue">${cue}</p>${extra}${id==="relax"?gripHTML():""}${animHTML(id)}<div class="demo">${pair(id,"dc")}</div><p class="tally">${foot}</p>`;
}
$("focus").addEventListener("change",()=>{tally={n:0,ok:0};tallyRun=-1;renderDrill()});
$("drill-check").addEventListener("change",e=>{const t=e.target;if(!t.matches("input[data-ck]")) return;const id=$("focus").value;ckState[id][+t.dataset.ck]=t.checked;renderDrill();const el=$(t.id);if(el) el.focus()});
$("prio").addEventListener("click",e=>{const b=e.target.closest("[data-focus]");if(!b) return;showTab("video");$("focus").value=b.dataset.focus;$("focus").dispatchEvent(new Event("change"));
  const rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;$("video-lab").scrollIntoView({behavior:rm?"auto":"smooth",block:"start"});$("focus").focus({preventScroll:true})});

/* close-up of the grip: loose fingers vs squeeze at contact */
function gripSVG(k){
  const sq=k!=="loose",col=k==="tight"?"var(--warn)":"var(--court)",px=sq?44:34;
  let g=`<defs><marker id="gm-${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L9 5L1 9z" fill="${col}"/></marker></defs>`;
  g+=`<rect x="${px-11}" y="92" width="22" height="34" rx="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>`;
  g+=`<rect x="64" y="2" width="5" height="16" fill="var(--muted)"/><rect x="58" y="16" width="17" height="106" rx="4" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.6"/>`;
  for(let i=0;i<8;i++) g+=`<line x1="58" y1="${22+i*12}" x2="75" y2="${28+i*12}" stroke="var(--line)" stroke-width="1"/>`;
  g+=`<ellipse cx="${px}" cy="66" rx="15" ry="32" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>`;
  if(!sq) g+=`<rect x="${px+15}" y="44" width="${58-px-15}" height="44" fill="var(--court-soft)" stroke="var(--court)" stroke-dasharray="2 2" stroke-width="1"/>`;
  else g+=`<ellipse cx="${px+9}" cy="66" rx="4" ry="18" fill="${col}" fill-opacity=".4"/>`;
  const fx0=sq?px+6:px+8,fx1=sq?78:81;
  [40,53,66,79].forEach(y=>{
    g+=`<rect x="${fx0}" y="${y}" width="${fx1-fx0}" height="${sq?11:10}" rx="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="${sq?2:1.4}"/>`;
    g+=sq?`<rect x="${fx1-9}" y="${y+2}" width="7" height="7" rx="3" fill="${col}" fill-opacity=".6"/>`:`<circle cx="${fx1-4}" cy="${y+5}" r="2" fill="var(--court)" fill-opacity=".6"/>`;
  });
  g+=`<rect x="${px-4}" y="26" width="26" height="9" rx="4.5" transform="rotate(-20 ${px-4} 30)" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.4"/>`;
  if(sq) g+=`<line x1="6" y1="66" x2="${px-19}" y2="66" stroke="${col}" stroke-width="2" marker-end="url(#gm-${k})"/><line x1="114" y1="66" x2="84" y2="66" stroke="${col}" stroke-width="2" marker-end="url(#gm-${k})"/>`;
  if(k==="tight") g+=`<polyline points="${px-7},100 ${px-3},106 ${px+1},100 ${px+5},106 ${px+9},100" fill="none" stroke="var(--warn)" stroke-width="1.5"/><polyline points="${px-7},112 ${px-3},118 ${px+1},112 ${px+5},118 ${px+9},112" fill="none" stroke="var(--warn)" stroke-width="1.5"/>`;
  return `<svg viewBox="0 0 120 128" role="img" aria-label="ภาพมือจับด้ามไม้">${g}</svg>`;
}
function gripHTML(){
  return `<div class="grip">
  <figure class="good">${gripSVG("loose")}<figcaption><span class="mk">✓</span> ตอนง้างและเหวี่ยง: จับด้วยนิ้ว มีช่องว่างระหว่างด้ามกับฝ่ามือ</figcaption></figure>
  <figure class="good">${gripSVG("squeeze")}<figcaption><span class="mk">✓</span> ตอนกระทบ: บีบนิ้วและฝ่ามือเข้าหาด้ามชั่วครู่ แล้วคลายทันที</figcaption></figure>
  <figure class="bad">${gripSVG("tight")}<figcaption><span class="mk">✗</span> กำแน่นเต็มฝ่ามือตลอดวงสวิง แขนเกร็ง</figcaption></figure></div>`;
}
/* animated drills: one side-view figure, a per-drill overlay, good vs bad */
const KF={
 good:[
  {hip:[76,100],s:[72,63],h:[69,49],e:[90,54],w:[80,40],r:[60,76],o:[98,34]},
  {hip:[84,100],s:[80,62],h:[80,48],e:[100,44],w:[92,40],r:[76,64],o:[94,72]},
  {hip:[90,100],s:[88,62],h:[92,48],e:[95,45],w:[101,29],r:[108,12],o:[82,80]},
  {hip:[95,101],s:[96,66],h:[101,53],e:[112,72],w:[121,86],r:[136,104],o:[78,84]}],
 bad:[
  {hip:[76,100],s:[72,63],h:[69,49],e:[90,54],w:[80,40],r:[60,76],o:[98,34]},
  {hip:[77,100],s:[73,63],h:[70,48],e:[82,42],w:[78,26],r:[74,6],o:[96,40]},
  {hip:[78,100],s:[74,63],h:[71,49],e:[76,44],w:[72,28],r:[66,10],o:[92,60]},
  {hip:[80,100],s:[77,63],h:[75,49],e:[88,46],w:[100,38],r:[118,30],o:[86,78]}]};
const SEG=[[0,0,450,0],[0,1,380,1],[1,2,170,2],[2,3,320,3],[3,3,450,3],[3,0,650,0]];
const SEG_T=SEG.reduce((a,s)=>a+s[2],0),T_HIT=SEG[0][2]+SEG[1][2]+SEG[2][2],T_S1=SEG[0][2];
const ANIMS={
 throw:{bad:"bad",trail:1,good:["ง้าง ศอกสูง หัวไม้ตกหลัง","หมุนสะโพกและอก ดึงศอกขึ้นนำ","กระทบหน้าตัว ไม้ส่งไปข้างหน้าเฉียงลง","ไม้ตามข้ามตัวลงมา น้ำหนักไปเท้าหน้า"],badP:["ง้าง","ยกแขนตรงขึ้นเร็วเกินไป ตัวไม่หมุน","เหวี่ยงขึ้นไปหาลูก กระทบเหนือหรือหลังศีรษะ","ไม้พุ่งขึ้น ลูกแบนหรือลอย"]},
 relax:{bad:"good",good:["ง้าง จับด้ามหลวมด้วยนิ้ว","เหวี่ยงโดยแขนไม่เกร็ง","บีบด้ามแน่นเฉพาะตอนกระทบ","คลายมือทันทีหลังตี"],badP:["กำด้ามแน่นตั้งแต่ง้าง","แขนเกร็ง วงสวิงฝืด","กระทบโดยหัวไม้ไม่ได้เร็วขึ้น","มือยังกำแน่น เมื่อยเร็ว"]},
 torso:{bad:"bad",good:["ยืนตะแคง ไหล่ข้างที่ไม่ได้ตีชี้หาลูก","สะโพกและอกหมุนนำก่อนแขน","ลำตัวหันเข้าเน็ตตอนกระทบ","น้ำหนักไปเท้าหน้า"],badP:["ง้างแต่ตัวยังหันเข้าเน็ต","ตัวนิ่ง ใช้แต่แขน","กระทบด้วยแรงแขนอย่างเดียว","ลูกไม่มีน้ำหนัก"]},
 seq:{bad:"good",good:["เตรียมพร้อม","สะโพกแล้วไหล่ ออกตัวก่อน","ศอกแล้วข้อมือ ต่อเป็นทอด","แรงทั้งหมดไปจบที่หัวไม้"],badP:["เตรียมพร้อม","ร่างกายท่อนล่างไม่ทำงาน","ศอกกับข้อมือออกแรงพร้อมกัน","แรงน้อย และเมื่อยแขน"]},
 minp:{bad:"good",trail:1,good:["ง้างแบบผ่อนคลาย","ใช้แรงราว 70%","หัวไม้เร็วที่สุดตรงจุดกระทบ","ตัวยังทรงตัวได้ พร้อมรับลูกต่อ"],badP:["ตั้งใจฟาดสุดแรง","ทั้งตัวเกร็ง","หัวไม้ไม่เร็วขึ้นแม้ออกแรงมาก","ตัวเสียหลัก กลับมารับไม่ทัน"]},
 gaze:{bad:"good",good:["มองลูกตั้งแต่ลูกเริ่มตก","ศีรษะนิ่ง สายตาตามลูก","มองลูกจนถึงจังหวะกระทบ","ค่อยมองตามทิศลูก"],badP:["มองลูก","หันไปมองไม้ หรือเงยหน้า","ละสายตาก่อนกระทบ","ตีพลาด หรือลูกออกข้าง"]},
 setp:{bad:"bad",good:["เข้าไปอยู่ใต้ลูกก่อน","รอให้ลูกตกลงมา","กระทบในโซนหน้าตัว (วงสีเขียว)","ลูกพุ่งลงข้ามเน็ต"],badP:["ไปถึงลูกช้า","ลูกตกเลยจุดตี","กระทบเหนือหรือหลังศีรษะ","ลูกแบนหรือลอย"]},
 lag:{bad:"good",trail:1,good:["หัวไม้ตกหลัง ศอกสูง","ศอกนำขึ้นไปก่อน ไม้ยังค้างอยู่ข้างหลัง","ไม้สะบัดตามมา เร็วที่สุดตรงจุดกระทบ","ตามข้ามตัวลงมา"],badP:["ไม้ตั้งตรงตามแนวแขน","แขนกับไม้ขึ้นไปพร้อมกัน","ไม่มีจังหวะสะบัด","ลูกช้า ไม่มีน้ำหนัก"]}};
const reduceMo=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
const AN={mode:"good",slow:false,playing:!reduceMo,clock:reduceMo?T_HIT:0,last:null,trails:{}};
function animHTML(id){
  if(!ANIMS[id]) return "";const nm=F.find(x=>x.id===id).n;
  return `<div class="anim" data-anim="${id}"><span class="an-title">ภาพเคลื่อนไหว: ${nm}</span>
  <div class="anim-ctl"><button type="button" data-an="good" aria-pressed="${AN.mode==="good"}">ท่าถูก</button><button type="button" data-an="bad" aria-pressed="${AN.mode==="bad"}">ท่าผิด</button><button type="button" data-an="slow" aria-pressed="${AN.slow}">ช้า ×3</button><button type="button" data-an="play" aria-pressed="${!AN.playing}">${AN.playing?"หยุด":"เล่น"}</button></div>
  <svg viewBox="0 0 220 160" role="img" aria-label="หุ่นสาธิต: ${nm}"></svg>
  <ol class="phases"></ol></div>`;
}
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const ease=(t,k)=>k===2?t*t:t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function poseAt(set,tc){
  let acc=0;for(let i=0;i<SEG.length;i++){const [a,b,d,ph]=SEG[i];if(tc<=acc+d||i===SEG.length-1){const t=Math.min(1,Math.max(0,(tc-acc)/d)),k=ease(t,i===2?2:0),A=KF[set][a],B=KF[set][b],P={};Object.keys(A).forEach(n=>P[n]=lerp(A[n],B[n],k));return {P,ph,seg:i}}acc+=d}
}
const tri=(x,c,w)=>Math.max(0,1-Math.abs(x-c)/w);
function gauge(label,v,col){const f=n=>n.toFixed(1);return `<text x="122" y="15" font-size="10" fill="var(--muted)">${label}</text><rect x="122" y="19" width="80" height="7" rx="3.5" fill="var(--line)"/><rect x="122" y="19" width="${f(80*Math.max(0.04,Math.min(1,v)))}" height="7" rx="3.5" fill="${col}"/>`}
function frameSVG(id,tc){
  const cfg=ANIMS[id],good=AN.mode==="good",set=good?"good":cfg.bad,c=good?"var(--court)":"var(--warn)",f=n=>n.toFixed(1);
  const L=(a,b,col,w,extra)=>`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${extra||""}/>`;
  const {P,ph,seg}=poseAt(set,tc);
  if(id==="lag"&&!good){const d=[P.w[0]-P.e[0],P.w[1]-P.e[1]],n=Math.hypot(...d)||1;P.r=[P.w[0]+d[0]/n*22,P.w[1]+d[1]/n*22]}
  if(id==="minp"&&!good&&seg>=3&&seg<=4){const k=seg===3?(tc-T_HIT)/SEG[3][2]:1;["hip","s","h","e","w","r","o"].forEach(n=>{P[n]=[P[n][0]+9*k,P[n][1]+(n==="hip"?2:7)*k]})}
  if(id==="gaze"&&!good&&(seg===1||seg===2)){const k=seg===1?(tc-T_S1)/SEG[1][2]:1;P.h=[P.h[0]-3*k,P.h[1]-2*k]}
  const bf=[62,150],ff=[114,150],bk=[(P.hip[0]+bf[0])/2-4,125],fk=[(P.hip[0]+ff[0])/2+6,124];
  let g=`<line x1="6" y1="150" x2="214" y2="150" stroke="var(--line)" stroke-width="1.5"/><line x1="206" y1="114" x2="206" y2="150" stroke="var(--muted)" stroke-width="2"/>`;
  const cpG=[KF.good[2].r[0]+3,KF.good[2].r[1]-4],cp=[KF[set][2].r[0]+3,KF[set][2].r[1]-4];
  if(id==="setp") g+=`<circle cx="${cpG[0]}" cy="${cpG[1]+4}" r="13" fill="var(--court-soft)" stroke="var(--court)" stroke-width="1.2" stroke-dasharray="3 2"/>`;
  const tr=AN.trails[id]||[];if(cfg.trail&&tr.length>1) g+=`<polyline points="${tr.map(p=>f(p[0])+","+f(p[1])).join(" ")}" fill="none" stroke="${c}" stroke-width="3" stroke-opacity=".45" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(id==="torso"&&good&&seg>=1&&seg<=2){g+=`<path d="M64 106 A18 6 0 0 0 102 106" fill="none" stroke="${c}" stroke-width="2.2" marker-end="url(#an-m)"/>`}
  const ink="var(--ink)";
  g+=`<defs><marker id="an-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L9 5L1 9z" fill="var(--court)"/></marker></defs>`;
  g+=L(bf,bk,ink,3)+L(bk,P.hip,ink,3)+L(ff,fk,ink,3)+L(fk,P.hip,ink,3)+L(P.hip,P.s,ink,3.2)+L(P.s,P.o,ink,2.6);
  g+=`<circle cx="${f(P.h[0])}" cy="${f(P.h[1])}" r="7" fill="var(--surface)" stroke="${ink}" stroke-width="2.6"/>`;
  g+=L(P.s,P.e,"var(--cork)",3.2)+L(P.e,P.w,"var(--cork)",3.2)+L(P.w,P.r,"var(--cork)",2);
  const ang=Math.atan2(P.r[0]-P.w[0],-(P.r[1]-P.w[1]))*180/Math.PI;
  g+=`<ellipse cx="${f(P.r[0])}" cy="${f(P.r[1])}" rx="5" ry="9" transform="rotate(${f(ang)} ${f(P.r[0])} ${f(P.r[1])})" fill="none" stroke="var(--cork)" stroke-width="2"/>`;
  let sh=null;
  if(tc>=T_S1&&tc<=T_HIT){const k=(tc-T_S1)/(T_HIT-T_S1);sh=[cp[0]+12*(1-k),-12+(cp[1]+12)*k]}
  else if(tc>T_HIT&&tc<T_HIT+700){const a=good?0.45:set==="bad"?-0.08:id==="gaze"?0.05:0.15,sp=good?0.32:0.22,dt=tc-T_HIT;sh=[cp[0]+Math.cos(a)*dt*sp,Math.min(146,cp[1]+Math.sin(a)*dt*sp)]}
  if(sh&&sh[0]<214) g+=`<circle cx="${f(sh[0])}" cy="${f(sh[1])}" r="3.5" fill="var(--cork-soft)" stroke="var(--cork)" stroke-width="1.5"/>`;
  if(id==="relax"){const v=good?0.18+0.72*tri(tc,T_HIT,110):0.92;g+=gauge("แรงบีบด้าม",v,v>0.6?(good?"var(--court)":"var(--warn)"):"var(--court)");
    if(!good){const m=lerp(P.s,P.e,0.5);g+=`<polyline points="${f(m[0]-12)},${f(m[1]-2)} ${f(m[0]-9)},${f(m[1]-6)} ${f(m[0]-6)},${f(m[1]-2)} ${f(m[0]-3)},${f(m[1]-6)}" fill="none" stroke="var(--warn)" stroke-width="1.5"/><circle cx="${f(P.w[0])}" cy="${f(P.w[1])}" r="3.6" fill="var(--warn)"/>`}}
  if(id==="minp"){const v=good?0.35+0.35*Math.min(1,tri(tc,T_HIT,500)*1.4):(tc>T_S1&&tc<T_HIT+SEG[3][2]?1:0.55);g+=gauge("แรงที่ใช้",v,good?"var(--court)":"var(--warn)");
    if(good&&tc>T_HIT-90&&tc<T_HIT+90){for(let i=0;i<3;i++) g+=L([P.r[0]-20,P.r[1]-4+i*5],[P.r[0]-10,P.r[1]-4+i*5],c,1.5)}}
  if(id==="seq"){const pts=[["hip",P.hip,good?520:-1],["s",P.s,good?660:-1],["e",P.e,good?800:930],["w",P.w,good?930:930]];
    pts.forEach(([n,p,t0])=>{if(t0<0) return;const k=tri(tc,t0,160);if(k>0) g+=`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(4+5*k)}" fill="${c}" fill-opacity="${f(0.25+0.6*k)}"/>`});
    if(!good) g+=`<text x="122" y="15" font-size="10" fill="var(--warn)">สะโพกและไหล่ไม่ได้ส่งแรง</text>`;}
  if(id==="gaze"){const tgt=good?(sh||cp):(seg===1||seg===2?P.r:(sh||cp));g+=L([P.h[0]+5,P.h[1]-1],tgt,c,1.3,` stroke-dasharray="3 3"`)}
  g+=`<text x="10" y="16" font-size="11" fill="${c}">${good?"✓ ท่าถูก":"✗ ท่าผิด"}${AN.slow?" · ช้า ×3":""}</text>`;
  return {g,ph,P};
}
function animTick(ts){
  const els=document.querySelectorAll("[data-anim]");
  if(AN.last==null) AN.last=ts;const dt=Math.min(64,ts-AN.last);AN.last=ts;
  if(AN.playing) AN.clock+=dt/(AN.slow?3:1);
  const tc=AN.clock%SEG_T,done={};
  els.forEach(el=>{
    const id=el.dataset.anim;if(!ANIMS[id]) return;
    if(!done[id]){const fr=frameSVG(id,tc);let tr=AN.trails[id]||[];
      if(tr.tc!=null&&tc<tr.tc) tr=[];
      if(tc>T_S1&&tc<T_HIT+SEG[3][2]){tr.push(fr.P.r);if(tr.length>14) tr.shift()}else if(tc>T_HIT+SEG[3][2]+150) tr=[];
      tr.tc=tc;AN.trails[id]=tr;done[id]=fr;}
    const fr=done[id];el.querySelector("svg").innerHTML=fr.g;
    const ol=el.querySelector(".phases"),key=AN.mode+fr.ph;
    if(ol.dataset.k!==key){const list=AN.mode==="good"?ANIMS[id].good:ANIMS[id].badP;ol.innerHTML=list.map((t,i)=>`<li${i===fr.ph?' class="on"':""}>${t}</li>`).join("");ol.dataset.k=key}
  });
  requestAnimationFrame(animTick);
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-an]");if(!b) return;const a=b.dataset.an;
  if(a==="good"||a==="bad"){AN.mode=a;AN.trails={}}
  else if(a==="slow") AN.slow=!AN.slow;
  else if(a==="play") AN.playing=!AN.playing;
  document.querySelectorAll("[data-anim]").forEach(el=>{
    el.querySelector('[data-an="good"]').setAttribute("aria-pressed",AN.mode==="good");
    el.querySelector('[data-an="bad"]').setAttribute("aria-pressed",AN.mode==="bad");
    el.querySelector('[data-an="slow"]').setAttribute("aria-pressed",AN.slow);
    const p=el.querySelector('[data-an="play"]');p.setAttribute("aria-pressed",!AN.playing);p.textContent=AN.playing?"หยุด":"เล่น";
    el.querySelector(".phases").dataset.k="";
  });
});
requestAnimationFrame(animTick);

function fillFocus(){$("focus").innerHTML='<option value="">วิเคราะห์ทุกหัวข้อ</option>'+F.map(f=>`<option value="${f.id}">${f.n}</option>`).join("")}
fillFocus();

/* tabs */
const TABS=["video","smash"];
function showTab(t,focus){TABS.forEach(x=>{const on=x===t;$("tab-"+x).hidden=!on;const b=$("tab-btn-"+x);b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;if(on&&focus) b.focus()});if(t==="video"&&lastKP) requestAnimationFrame(()=>drawPose(lastKP))}
TABS.forEach((t,i)=>{const b=$("tab-btn-"+t);b.addEventListener("click",()=>showTab(t));b.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();showTab(TABS[(i+(e.key==="ArrowRight"?1:TABS.length-1))%TABS.length],true)}})});
showTab(location.hash==="#smash"?"smash":"video");

paintInputs(); analyse(); model();
})();

/* PWA: offline cache + install */
if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})})}
