var PIXI = require("./lib/pixi.js");
var Matter = require("./lib/matter.js");
var floorgen = require("./floorgen.js");
roomData = require("./rooms/room1.json");

var renderer;
var assetsLoaded = 0;
var totalAssets = 1;

var stage = new PIXI.Container();
var engine = new Matter.Engine.create(document.body);
test_doc = document.body;
floor = null;

function startGame()
{
  if(assetsLoaded < totalAssets){return}
  document.getElementById("MainMenu").style.display = "none";
  renderer = PIXI.autoDetectRenderer(800,600, {backgroundColor : 0x000000});
  document.getElementById("GameArea").appendChild(renderer.view);

  floor = floorgen.generateFloor(5);

  var roomArray = floor.roomArray;

  for(var i = 0 ; i < roomArray.length ; i++)
  {
    var room = roomArray[i];
    stage.addChild(room.sprite);
    Matter.World.add(engine.world, room.bodies);
  }

  //stage.scale.x = 1/9;
  //stage.scale.y = 1/9;

  //stage.x = 400;
  //stage.y = 300;

  Matter.Engine.run(engine);
  draw();
}

function draw()
{
  requestAnimationFrame(draw);
  renderer.render(stage);
}

function loadAssets()
{
  doneLoading();
}

function doneLoading()
{
  document.getElementById("Credits").style.display = "none";
  document.getElementById("LoadingScreen").style.display = "none";
  document.getElementById("MainMenu").style.display = "";
  document.getElementById("StartButton").onclick = startGame;
}

document.addEventListener("DOMContentLoaded", function(event)
{
  loadAssets();
});

alert("hello");
