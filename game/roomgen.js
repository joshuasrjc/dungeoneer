var PIXI = require("pixi.js");
var Matter = require("./matter.js");
var roomData = require("./rooms/room1.json");
var tileset = new Tileset(roomData);

function Tileset(roomData)
{
  var image = PIXI.Texture.fromImage("./rooms/tileset.png");
  var tilesetData = roomData.tilesets[0];
  var tileWidth = tilesetData.tilewidth;
  var tileHeight = tilesetData.tileheight;
  var w = tilesetData.imagewidth / tileWidth;
  var h = tilesetData.imageheight / tileHeight;

  for(var y = 0 ; y < h ; y++)
  {
    for(var x = 0 ; x < w ; x++)
    {
      var frame = new PIXI.Rectangle(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
      var tex = new PIXI.Texture(image, frame);
      var index = x + y*w + 1;
      this[index] = tex;
    }
  }

  this.tileWidth = tileWidth;
  this.tileHeight = tileHeight;
}

function Room(x, y)
{
  this.x = x;
  this.y = y;
  this.connectedRooms = [null, null, null, null]; // [0]Up, [1]Right, [2]Down, [3]Left
  this.sprite = null;
  this.bodies = [];
}

function createRoom(x, y)
{
  var room = new Room(x, y);
  room.tileset = tileset;

  room.sprite = new PIXI.Container();
  var dungeonTiles = null;
  var dungeonWalls = null;
  var layers = roomData.layers;
  for(var i = 0 ; i < layers.length ; i++)
  {
    var layer = layers[i];

    switch(layer.name)
    {
      case "DungeonTiles":
        dungeonTiles = layer;
        break;
      case "DungeonWalls":
        dungeonWalls = layer;
        break;
    }

    if(layer.name == "DungeonTiles")
    {
      dungeonTiles = layer;
    }

  }

  var w = dungeonTiles.width;
  var h = dungeonTiles.height;
  var tileWidth = room.tileset.tileWidth;
  var tileHeight = room.tileset.tileHeight;

  for(var y = 0 ; y < h ; y++)
  {
    for(var x = 0 ; x < w ; x++)
    {
      var dataIndex = x + y*w;
      var tileIndex = dungeonTiles.data[dataIndex];
      var sprite = new PIXI.Sprite(room.tileset[tileIndex])
      sprite.x = x * tileWidth;
      sprite.y = y * tileHeight;
      room.sprite.addChild(sprite);
    }
  }

  var roomWidth = w * tileWidth;
  var roomHeight = h * tileHeight;

  room.sprite.x = roomWidth * room.x;
  room.sprite.y = roomHeight *room.y;

  var walls = dungeonWalls.objects;
  for(var i = 0 ; i < walls.length ; i++)
  {
    var wall = walls[i];
    var bodyX = wall.x + room.x * roomWidth + wall.width/2;
    var bodyY = wall.y + room.y * roomHeight + wall.height/2;
    var body = Matter.Bodies.rectangle(bodyX, bodyY, wall.width, wall.height);
    body.isStatic = true;
    room.bodies.push(body);
  }

  return room;
}














exports.tileset = tileset;
exports.createRoom = createRoom;
