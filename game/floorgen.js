var roomgen = require("./roomgen.js");
var roomData = require("./rooms/room.json");

function Floor()
{
  this.startingRoom = null;
  this.roomArray = [];
}

// Generates a tree of rooms and returns the head node.
// n is the depth of the tree.
function generateFloor(n)
{
  var floor = new Floor();
  floor.startingRoom = roomgen.createRoom(roomData, 0, 0);

  branchRoom(floor.startingRoom, n);
  addRoomsToArray(floor.startingRoom, floor.roomArray);

  return floor;
}

function branchRoom(room, n)
{
  n--;
  if(n <= 0){return};

  // Number of branches = floor( 4*r^2 ) + 1
  // Where r is a random number between 0 and 1.
  var r = Math.random()
  var nBranches = Math.floor(4*r*r) + 1;
  var emptyConnections = new Connections();

  for(var i = 0 ; i < nBranches ; i++)
  {
    var index = emptyConnections.randomConnection();
    branchRoom(spawnBranch(room, index), n);
  }
}

function Connections()
{
  var conns = [0, 1, 2, 3];
  this.randomConnection = function()
  {
    var i = Math.floor(Math.random() * conns.length);
    return conns.splice(i, 1);
  }
}

function spawnBranch(room, i)
{
  var spawnedRoom = roomgen.createRoom(roomData, room.x, room.y);

  if(i == 0)
  {
    spawnedRoom.y--;
  }
  else if(i == 1)
  {
    spawnedRoom.x++;
  }
  else if(i == 2)
  {
    spawnedRoom.y++;
  }
  else if(i == 3)
  {
    spawnedRoom.x--;
  }

  room.connectedRooms[i] = spawnedRoom;
  return spawnedRoom;
}

function addRoomsToArray(room, array)
{
  array.push(room);

  for(var i = 0 ; i < 3 ; i++)
  {
    var subRoom = room.connectedRooms[i];
    if(subRoom != null)
    {
      addRoomsToArray(subRoom, array);
    }
  }
}


exports.generateFloor = generateFloor;
