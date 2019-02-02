package bunker.twolandia.model;

public class Player {
  private String name = "";
  private int hearts = 100;
  private int points = 0;
  private PlayerShape playerShap = null;

  public int getHearts() {
    return hearts;
  }

  public void setHearts(int hearts) {
    this.hearts = hearts;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
