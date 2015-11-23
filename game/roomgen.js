var PIXI = require("pixi.js");

function Room(x, y)
{
  this.x = x;
  this.y = y;
  this.connectedRooms = [null, null, null, null]; // [0]Up, [1]Right, [2]Down, [3]Left
  this.sprite = null;
  this.data = null;
}

function createRoom(roomData, x, y)
{
  var room = new Room(x, y);

  room.data = roomData;

  return room;
}

exports.createRoom = createRoom;
