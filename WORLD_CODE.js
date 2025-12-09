
missions={}; // storing missions
carLogicIntervals = {}; // car processor
carFuelLevels = {}; // car fuel levels processor (You probably dont need to pay attention on this tho)
lowFuelWarned = {} // neither this
response="NONE (404)" // nothing
global={
  vaultCooldown:{}, // robbing bank vault cooldown. 
        riotCooldown:300000, // prisoners riot cooldown. 
        lastRiotTime:0, // last time a riot had happened (changes when a riot happens)
        casinoCooldown:{} // casino cooldown.
       } 
bp=[] // put banned players here.

function fn(e){ // format number into readable formats.
  if("number"!=typeof e||isNaN(e))return"0";
  const r = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  let t=0;
  for(;e>=1e3&&t<r.length-1;)e/=1e3,t++;
  return`${Math.round(10*e)/10}${r[t]}`}

wdL={} 
jailIntervals={} // prisoners check processor. 
keyCooldowns = {};
IS_CUFFED={} // "prisoner": is_cuffed (boolean)
JAIL_POS={} // player's jail position.
ITEMS_BEFORE={} // items before
onPlayerLeave=(myId)=>{ // when the player leaves
delete CL[api.getPlayerDbId(myId)] // delete player from  criminals
delete PC[api.getPlayerDbId(myId)] // delete player from police.
}
function updateRole(e){ // update player's role.
  const o=DB(e),
  l=!0===CL[o],i=!0===PC[o];
  setRole(e,l?"Criminal":i?"Police":"No Role!",l?"orange":i?"blue":"gray")
}

DEVS_NJ=[]; // developers

// FUNCTION ALIASES ===========================
EN=api.getEntityName, 
A=api,SWI="startsWith",
INC="includes",
PI=api.getPlayerIds,
FE="forEach",
SP=api.setPosition,
GP=api.getPosition,
SM=api.sendMessage,
BM=api.broadcastMessage,
LI={color:"#2EEB82"},
SH=api.setHealth,
RD={color:"#FF9D87"},
GI=api.giveItem,
DB=api.getPlayerDbId,
PH="push",
HI=api.getHeldItem,
GB=api.getBlock
// =============================================

// ======= MODIFIED VERSION OF SULFROX'S SETTIMEOUT IMPLEMENTATION
"use strict";
let tik=0,itn=0,sin=0,tdd={},tid=0,tos={},iid=0,ivs={};
function tick(){for(++tik;itn<=tik;sin=0,++itn){if(!(itn in tdd))continue;
                                                let arr=tdd[itn],len=arr.length;
                                                for(;sin<len;++sin){
                                                  const key=arr[sin];
                                                  if(key in tos){
                                                    try{tos[key].fn()
                                                       }catch(err){
                                                      
                                                       }delete tos[key]
                                                  }
                                                }delete tdd[itn]
                                               }for(let id in ivs){
  let obj=ivs[id];
  if(tik>=obj.nxt){
    try{obj.fn()}catch(err){}
    obj.nxt=tik+Math.floor(obj.dly/50)
  }
}
               }
function setTimeout(fn,dly){
  if("function"!=typeof fn)throw new TypeError("not a function");
  const nxt=tik+Math.floor(dly/50),id=++tid;
  return(tdd[nxt]||=[]).push(id),tos[id]={fn:fn},id}

function clearTimeout(id){
  delete tos[id]
}

function setInterval(fn,dly){
  if("function"!=typeof fn)throw new TypeError("not a function");
  const id=++iid;
  return ivs[id]={fn:fn,dly:dly,nxt:tik+Math.floor(dly/50)},id}

function clearInterval(id){delete ivs[id]}

// ========

onPlayerAttemptOpenChest=(_,i,o,p,m)=>{ // when the player attempts to open a chest
if(m)return "preventOpen" // if moonstone chest, return
}

PC={}, // police
  CL={}, // criminals
  BSC=0

onPlayerDropItem=(aple)=>{ // when the player drops a item.
let r=DB(aple) // the dbId of the player.
if(PC[r]){ // if player is a police
SM(aple,"no dropping!",RD) // prevent drop
return "preventDrop";
}
}

// giant mess. i recommend to use your own ranks implementation.
onPlayerChat=(a,e,l)=>{
  let r=DB(a),
    o=EN(a),
    n=PC[r],
    t=CL[r],
    E=DEVS_NJ[INC](o),
    C="_ChcTM_"===EN(a),
    s=["wana_ramadhan_puasa","Huzza_MIG"].includes(o)
    ,y="ObiloxYT"===o,
    I="Ajaxx__Llearn"===o,
    L="Aarow445"===o;
  return BM([
    {str:L?"[Guard Manager] ":
      I?"[☎Job Application] ":
      y?"[🍀OWNER] ":
      s?"[CHILD KIDNAPPER] ":
      E?"[💻DEV]":
      n?"[🚨POLICE] ":
      t?`[🔏CRIMINAL ${fn(getWantedLevel(a)/1e3)}] `:
      C?"[MONKI🍌] ":
      "",
     style:{
       color:L?"gray":
         I?"gold":
         y?"lime":
         s?"RED":
         C?"brown":
         E?"gray":
         n?"blue":
         t?"orange":
         ""}
    },{
      str:o+": ",
      style:{
        color:o==="MayBeTheWolf"?"Red":
          C?"YELLOW":
          E?"cyan":
          n?"blue":
          t?"yellow":
          "#CEF3FF"
      }
    },{
      str:e,
      style:{
        color:"white"
      }
    }
  ]
           ),!1};

playerCommand=(e,t)=>{ // connect to playerCommandHandler
try{
return playerCommandHandler(e,t)
}catch(e){SM(myId,"CODE NOT LOADED YET!",RD) // warn 
         }
}
XS=[10268,10257], // x axises
  YS=[75,70], // y axises
  ZS=[9980,9985,9990,9995,10000,10010] // z axises
onPlayerJoin=(ID,A)=>{ // when player joins
if(!(A==="NO")){SP(ID,10266, 71, 10028)} // if code is not loaded, teleport him to loadibg 
if(global.codeLoaded){SP(ID,[10263, 71, 10028])} // when loaded, teleport to main spawn
try{ 
if(bp.includes(EN(ID))){
api.kickPlayer(ID,"You are banned.") // player is banned
}
carLogicHandler(ID) // start handling carlogic.
  //set right info text.
api.setClientOption(ID,"RightInfoText",[{str:"JAIL",style:{color:"orange",fontSize:"50px"}},{str:"BREAK\n",style:{color:"cyan",fontSize:"50px"}},{str:`Welcome to Jailbreak, 
${EN(ID)}!\n`,style:{fontSize:"20px",color:"white"}},
{str:"1. 🔓 Escape the prison!",style:{color:"#00ff00"}},{str:"\n2. 💥 Riot if needed.",style:{color:"#ff5555"}},{str:"\n3. 🚔 Avoid the police \n(unless you're the police 👮‍♂️)",style:{color:"#aaaaff"}},{str:"\n💰 Rob, run, repeat.",style:{color:"#ffff00"}},{str:"\n🏆 Be the most wanted!",style:{color:"#ffcc00"}},{str:"\nNEW: Prestige! 🔃👑✨\n",style:{color:"#00ffff"}},{str:"Use /commands for all the commands!"},{str:"\nNeon",style:{color:"magenta",fontSize:"10px"}},{str:"Jet",style:{color:"cyan",fontSize:"10px"}},{str:" Studios",style:{fontSize:"10px"}}]);
showWantedLevel(ID) // show player's wanted level in chat.
showBalance(ID) // show player's balance in chat.
showRebirths(ID)// show player's rebirth in chat.
api.setWalkThroughType(ID, "Patterned Light Gray Glass", false) // let player walkthrough light gray glass.  [RECOMMENDED TO REMOVE]
api.setWalkThroughType(ID, "Patterned Red Glass", false) // let player walkthrough red glass.  [RECOMMENDED TO REMOVE]
api.setWalkThroughType(ID, "_Red Bed Head|meta|rot3", false)  // let player walkthrough red bed.  [RECOMMENDED TO REMOVE]
api.setWalkThroughType(ID, "Red Bed|meta|rot3", false)  // let player walkthrough red bed.  [RECOMMENDED TO REMOVE]
setRole(ID,"No Role!","Gray")  // set player's role to none.
} catch(e){SM(ID,"Please Click to load code!",RD)} // warn player
}

onPlayerChangeBlock=(e,n,o,r,a,t)=>{try{ // when player changes a block (breaking, deleting, opening a door)
return blockChangeHandler(e,n,o,r,a,t); // connect
}catch(f){SM(e,"PLEASE LOAD THE CODE!",RD)}}; // warn

onPlayerDamagingOtherPlayer = (AID,DID,DMG) => { // when player damaging other player
try{
return onPlayerDamagingOtherPlayerHandler(AID,DID,DMG) // connect
} catch(e){ 
SM(AID,"PLEASE LOAD THE CODE!",RD) // warn
}
}
ROB_COOLDOWN=1000, // robbing cooldown
  lastRobTime={}; // last time a player robbed.
onPlayerAttemptAltAction=(e,a,o,t,i)=>{ // when player attempts right clicks
try{
return onPlayerAttemptAltActionHandler(e,a,o,t,i) //connect
}catch(r){
SM(e,`PLEASE LOAD THE CODE! (Error: ${r})`,RD) // warn
}
};

function unCuff(e){ // uncuff player
const t=DB(e)
delete IS_CUFFED[t],api.setPlayerPose(e,"standing"),api.setClientOption(e,"speedMultiplier",1);const l="updateEntityNodeMeshAttachment";A[l](e,"TorsoNode",null),A[l](e,"ArmRightMesh",null),A[l](e,"ArmLeftMesh",null),SM(e,"✅ SUCCESSFULLY UNCUFFED!",LI)
}

LAST_SMOKE_TIME=0;const SMOKE_COOLDOWN=3e4; // smoke grenade config
const lastClickTime = {}; // last time a player clicked
const clickCount = {}; // click count
const clickTimeout = {}; // click timeout
const CLICK_SPAM_LIMIT = 60; // spam limit
const SPAM_RESET_MS = 500; // reset ms

onPlayerClick = (playerId) => { // when player clicks
const id = DB(playerId); // player's db

const now = Date.now();
if (!lastClickTime[id]) lastClickTime[id] = now; // initialize var
if (!clickCount[id]) clickCount[id] = 0; // initialize var

if (now - lastClickTime[id] < 250) { 
clickCount[id]++;
} else {
clickCount[id] = 1;
}
lastClickTime[id] = now;
if (clickCount[id] >= CLICK_SPAM_LIMIT) {
api.kickPlayer(playerId, "⚠️ Please dont click that fast!"); //kick
clickCount[id] = 0;
return;
}
if (IS_CUFFED[id]) {
if (Math.floor(Math.random() * 100) === 0) {
unCuff(playerId); // uncuff player (1% chance)
api.setClientOption(playerId, "middleTextLower", "");
} else {
SM(playerId, "❌ COULDN'T BREAK THE CUFF! CLICK MORE!", RD); // err
}
}
clearTimeout(clickTimeout[id]);
clickTimeout[id] = setTimeout(() => {
clickCount[id] = 0;
}, SPAM_RESET_MS);
},
 
onPlayerKilledOtherPlayer=(e,o)=>{addCoins(e,getWantedLevel(o)),addWantedLevel(e,CL[DB(e)]===true?100:0),unCuff(o)
setCoins(o,Math.round(getCoins(o)/2))
},
onPlayerThrowableHitTerrain=(e,o,i)=>{ // when player throws smth
try{
return onPlayerThrowableHitTerrainHandler(e,o,i) // connect
} catch(f){SM(e,`PLEASE LOAD THE CODE! (ERROR: ${f})`,RD)} //warn
};
