var PIXI = require("pixi.js");

function Room(x, y)
{
  this.x = x;
  this.y = y;
  this.connectedRooms = [null, null, null, null];
  this.sprite = null;
}

function createRoom(roomData, x, y)
{
  var room = new Room(x, y);



  return room;
}

exports.createRoom = createRoom;
