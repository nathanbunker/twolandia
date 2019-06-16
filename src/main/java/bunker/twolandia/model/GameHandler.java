package bunker.twolandia.model;

public abstract class GameHandler {
  protected String name = "";
  protected String description = "";
  protected int height = 400;
  protected int width = 400;
  protected boolean hasData = false; 
  protected String world = "";
  protected User user = null;
  protected GameAvailable gameAvailable;
  
  public GameAvailable getGameAvailable() {
    return gameAvailable;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public GameHandler(GameAvailable gameAvailable, User user)
  {
    this.gameAvailable = gameAvailable;
    this.user = user;
    this.description = gameAvailable.getDescription();
  }
  
  public abstract void changeName(String newName);
  
  public abstract void leaveGame();
  
  public String getWorld() {
    return world;
  }
  public void setWorld(String world) {
    this.world = world;
  }
  public boolean isHasData() {
    return hasData;
  }
  public void setHasData(boolean hasData) {
    this.hasData = hasData;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }
  public int getHeight() {
    return height;
  }
  public void setHeight(int height) {
    this.height = height;
  }
  public int getWidth() {
    return width;
  }
  public void setWidth(int width) {
    this.width = width;
  }
  
  @Override
  public boolean equals(Object obj) {
    if (obj == null)
    {
      return false;
    }
    if (obj instanceof GameHandler)
    {
      GameHandler otherGame = (GameHandler) obj;
      return otherGame.getName().equals(this.getName()) && otherGame.getWorld().equals(this.getWorld());
    }
    return false;
  }
}
