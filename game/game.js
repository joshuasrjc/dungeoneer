var PIXI = require("pixi.js");
//PIXI.BaseTexture.SCALE_MODE.DEFAULT = PIXI.BaseTexture.SCALE_MODE.NEAREST;
var floorgen = require("./floorgen.js");
var GameEngine = require("./engine/GameEngine.js");
PlayerPrefab = require("./prefabs/Player.json");
roomData = require("./rooms/room1.json");

var renderer;
var assetsLoaded = 0;
var totalAssets = 1;

scene = GameEngine.createScene();
var stage = new PIXI.Container();
test_doc = document.body;
floor = null;
player = null;

function startGame()
{
  if(assetsLoaded < totalAssets){return}
  document.getElementById("MainMenu").style.display = "none";

  floor = floorgen.generateFloor(5);

  var roomArray = floor.roomArray;

  for(var i = 0 ; i < roomArray.length ; i++)
  {
    var room = roomArray[i];
    scene.canvas.addChild(room.sprite);
    scene.addBodies(room.bodies);
  }

  player = GameEngine.createGameObject(PlayerPrefab);
  scene.addGameObject(player);
}


function loadAssets()
{
  setTimeout(function()
  {
    assetsLoaded++;
    doneLoading();
  }, 300);
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
