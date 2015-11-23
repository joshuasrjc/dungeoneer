var roomgen = require("./roomgen.js");

function Floor(n)
{
  var floor = this;
  floor.n = n;
  floor.startingRoom = roomgen.createRoom(0, 0);
  floor.maxWidth = 2*n + 1;
  floor.roomArray = [];
  floor.occupied = new Array(floor.maxWidth * floor.maxWidth);

  for(var i = 0 ; i < floor.occupied ; i++)
  {
    occupied[i] = false;
  }

  floor.branchRoom = function(room, n)
  {
    n--;
    if(n <= 0){return;}

    // Number of branches = floor( 4*r^2 ) + 1
    // Where r is a random number between 0 and 1.
    var r = Math.random()
    var nBranches = Math.floor(4*r*r) + 1;
    var emptyConnections = new Connections();

    for(var i = 0 ; i < nBranches ; i++)
    {
      var index = emptyConnections.randomConnection();
      var spawnedRoom = floor.spawnBranch(room, index);
      if(spawnedRoom != null)
      {
        floor.branchRoom(spawnedRoom, n);
      }
    }
  }

  floor.addRoomsToArray = function(room, array)
  {
    array.push(room);

    for(var i = 0 ; i < room.connectedRooms.length ; i++)
    {
      var subRoom = room.connectedRooms[i];
      if(subRoom != null)
      {
        floor.addRoomsToArray(subRoom, array);
      }
    }
  }

  floor.addRoomToOccupied = function(room)
  {
    var pos = (room.x+floor.n) + (room.y+floor.n) * floor.maxWidth;
    floor.occupied[pos] = true;
  }

  floor.isOccupied = function(x,y)
  {
    var pos = (x+floor.n) + (y+floor.n) * floor.maxWidth;
    return false;
    return floor.occupied[pos];
  }

  floor.spawnBranch = function(room, i)
  {
     // [0]Up, [1]Right, [2]Down, [3]Left
    var x = room.x;
    var y = room.y;
    if(i%2 == 0)
    {
      y += i-1
    }
    else
    {
      x += 2-i
    }

    if(floor.isOccupied(x,y))
    {
      return null;
    }

    var spawnedRoom = roomgen.createRoom(x, y);
    room.connectedRooms[i] = spawnedRoom;
    floor.addRoomToOccupied(spawnedRoom);
    return spawnedRoom;
  }

  floor.addRoomToOccupied(floor.startingRoom);
  floor.branchRoom(floor.startingRoom, n);
  floor.addRoomsToArray(floor.startingRoom, floor.roomArray);
}

// Generates a tree of rooms and returns the head node.
// n is the depth of the tree.
function generateFloor(n)
{
  return new Floor(n);
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


exports.generateFloor = generateFloor;
