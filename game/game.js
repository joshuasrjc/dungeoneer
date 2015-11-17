var PIXI = require("pixi.js");
var Matter = require("matter");
var Keyboard = require("crtrdg-keyboard");
var floorgen = require("./floorgen.js");
roomData = require("./rooms/room.json");

var renderer;
var assetsLoaded = 0;
var totalAssets = 1;

var stage = new PIXI.Container();
floor = null

function loadAssets()
{
  setTimeout(function()
  {
    assetsLoaded++;
  }, 1000);
}


function startGame()
{
  if(assetsLoaded < totalAssets){return}
  document.getElementById("MainMenu").style.display = "none";
  renderer = PIXI.autoDetectRenderer(800,600, {backgroundColor : 0xFF0000});
  document.getElementById("GameArea").appendChild(renderer.view);

  floor = floorgen.generateFloor(5);

  var roomArray = floor.roomArray;

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
  document.getElementById("LoadingScreen").style.display = "none";
  document.getElementById("MainMenu").style.display = "";
  document.getElementById("StartButton").onclick = startGame;
});
