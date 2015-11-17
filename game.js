var PIXI = require("pixi.js");
var Matter = require("matter");
var Keyboard = require("crtrdg-keyboard");
var pixiTiled = require("pixi-tiled");
var floorgen = require("./floorgen.js");

var renderer;
var assetsLoaded = 0;
var totalAssets = 1;

var stage = new PIXI.Container();
roomImg = null;

startRoom = null;
roomArray = [];

function loadAssets()
{
  PIXI.loader.add("room.json", onRoomLoaded);
  PIXI.loader.load();
}

function onRoomLoaded(res)
{
  roomImg = res.tiledMap;
  //roomImg.scale = {x: 0.2, y: 0.2};
  assetsLoaded++;
}

function startGame()
{
  if(assetsLoaded < totalAssets){return}
  document.getElementById("MainMenu").style.display = "none";
  renderer = PIXI.autoDetectRenderer(800,600, {backgroundColor : 0xFF0000});
  document.getElementById("GameArea").appendChild(renderer.view);

  startRoom = floorgen.generateRooms(5);

  floorgen.addRoomsToArray(startRoom, roomArray);

  alert(roomArray.length);

  for(var i = 0 ; i < roomArray.length ; i++)
  {
    var room = roomArray[i];
    var graphics = new PIXI.Graphics();

    graphics.beginFill(0x0000FF);
    graphics.lineStyle(3,0x000000);
    graphics.drawRect(room.x*20,room.y*20,20,20);
    stage.addChild(graphics);
  }

  stage.x += 400;
  stage.y += 300;

  draw();
}

function draw()
{
  requestAnimationFrame(draw);
  renderer.render(stage);
}

document.addEventListener("DOMContentLoaded", function(event)
{
  loadAssets();
  document.getElementById("Credits").style.display = "none";
  document.getElementById("StartButton").onclick = startGame;
});
