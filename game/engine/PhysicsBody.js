function PhysicsBody(gameObject, componentData)
{
  this.gameObject = gameObject;

  this.position = componentData.position;

  this.start = function(scene)
  {

  }

  this.update = function(scene)
  {

  }

  this.stop = function(scene)
  {

  }
}

function createComponent()
{
  return new PhysicsBody(gameObject, componentData);
}

exports.createComponent = createComponent;
