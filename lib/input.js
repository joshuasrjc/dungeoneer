var Input = {};

function Key(keyCode)
{
  this.keyCode = keyCode;
  this.isDown = false;
};

Input.keys = {};

Input.addKey = function(keyName, keyCode)
{
  Input.keys[keyName] = new Key(keyCode);
};

function onKeyUp(e)
{
  for(var key in Input.keys)
  {
    if(Input.keys.hasOwnProperty(key))
    {
      if(key.keyCode == e.keyCode)
      {
        key.isDown = false;
      }
    }
  }
}

function onKeyDown(e)
{
  for(var key in Input.keys)
  {
    if(Input.keys.hasOwnProperty(key))
    {
      if(key.keyCode == e.keyCode)
      {
        key.isDown = true;
      }
    }
  }
}

document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("keydown", onKeyDown, false);

window.Input = Input;
