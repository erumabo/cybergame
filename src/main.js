import {Connector} from "./libs/pixi-hammer.js";
import { Worldmap } from "./map/Map.js";
/*
const gameContainer = document.getElementById("game");
const app = new PIXI.Application({ resizeTo: gameContainer });
gameContainer.appendChild(app.view);

const tilemap = new PIXI.tilemap.CompositeTilemap();
app.stage.addChild(tilemap);
let assetsLoaded=false;

let loader = new PIXI.Loader();
loader
  .add(['assets/assets.json'])
  .load((l,r) => assetsLoaded=true)
  .onError.add(console.error);

let detectors = [
  //[ Hammer.Pinch ], 
 [ Hammer.Tap, 'tap' ], 
 [ Hammer.Swipe, 'swipe','swipeleft','swiperight' ]
  ]

var hammertime = new Hammer.Manager( app.view, { recognizers: detectors.map(d=>[d[0]]) });
var c = new Connector(app.view, app.renderer.plugins.interaction, hammertime);
c.registerHandlerTypes(detectors.reduce((f,d)=>f.concat(d.slice(1)), []));

/*
key.on('hammer-swipe', e=>{
  let nX = key.x + e.velocityX*10;
  let nY = key.y + e.velocityY*10;
});
key.on('hammer-swiperight', e=>{
  key.x = Math.min(240, key.x+e.velocityX*10);
});
key.on('hammer-tap',()=>{});
* /

var manager = nipplejs.create({
    zone: gameContainer, // active zone
   //color: String,
    //size: Integer,
  // threshold: Float, // before triggering a directional event
   //fadeTime: Integer, // transition time
   //multitouch: Boolean,
   //maxNumberOfNipples: Number, // when multitouch, what is too many?
   //dataOnly: Boolean, // no dom element whatsoever
   // position: Object, // preset position for 'static' mode
    mode: 'dynamic', // 'dynamic', 'static' or 'semi'
    //restJoystick: Boolean | Object, // Re-center joystick on rest state
  // restOpacity: Number, // opacity when not 'dynamic' and rested
   //lockX: Boolean, // only move on the X axis
   // lockY: Boolean, // only move on the Y axis
    catchDistance: 150, // distance to recycle previous joystick in
    // 'semi' mode
   // shape: String, // 'circle' or 'square'
    //dynamicPage: Boolean, // Enable if the page has dynamically visible elements
   //follow: Boolean, // Makes the joystick follow the thumbstick
  });

function drawTilemap(){
  for(let i=0; i<10; ++i){
    for(let j=0; j<10; j++){
      let r = Math.sin((time+i+j)/30.0)/30.0 < 0;
      tilemap.tile(r?'grass':'dirt', j*32, i*32);
    }
  }
}

let time = 0;
function update(dt) {
  time += dt;
  
  if(assetsLoaded) drawTilemap();
}
app.ticker.add(update);
*/

let map = new Worldmap();
