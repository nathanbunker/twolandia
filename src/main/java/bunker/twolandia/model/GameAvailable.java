package bunker.twolandia.model;

public enum GameAvailable {
                           KAHN_ORIGINAL("program", "Kahn Original"),
                           MINE("mine", "Mine - Original"),
                           MINE_FROSTY("mineFrosty", "Mine - Frosty"),
                           MINE_FOREST_CAVE("mineForestCave", "Mine - Forest Cave"),
                           LIFE("life", "Life - Original"),
                           MINER("miner", "Miner - Frosty");
  private String id = "";
  private String description = "";

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  private GameAvailable(String id, String description) {
    this.id = id;
    this.description = description;
  }
  
  public static GameAvailable getGameAvailable(String id)
  {
    for (GameAvailable ga : GameAvailable.values())
    {
     if (ga.getId().equals(id))
     {
       return ga;
     }
    }
    return null;
  }

}
