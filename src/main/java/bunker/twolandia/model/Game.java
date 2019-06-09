package bunker.twolandia.model;

public class Game {
  private String name = "";
  private String description = "";
  private int height = 400;
  private int width = 400;
  private boolean hasData = false; 
  private String world = "";
  
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
    if (obj instanceof Game)
    {
      Game otherGame = (Game) obj;
      return otherGame.getName().equals(this.getName()) && otherGame.getWorld().equals(this.getWorld());
    }
    return false;
  }
}
