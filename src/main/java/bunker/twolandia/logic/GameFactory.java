package bunker.twolandia.logic;

import bunker.twolandia.model.Game;

public class GameFactory {
  public static final String KAHN_ORIGINAL = "program";
  public static final String MINE = "mine";
  public static final String MINE_FROSTY = "mineFrosty";
  public static final String MINE_FOREST_CAVE = "mineForestCave";
  public static final String LIFE = "life";

  public static Game getGame(String name) {
    Game game = null;
    if (name.equals(KAHN_ORIGINAL)) {
      game = new Game();
      game.setDescription("Kahn Original");
      game.setName(KAHN_ORIGINAL);
      game.setWidth(400);
      game.setHeight(400);
    } else if (name.equals(MINE)) {
      game = new Game();
      game.setDescription("Mine - Original");
      game.setName(MINE);
      game.setWidth(1200);
      game.setHeight(600);
      game.setHasData(true);
      game.setWorld("original");
    } else if (name.equals(MINE_FROSTY)) {
      game = new Game();
      game.setDescription("Mine - Frosty");
      game.setName(MINE);
      game.setWidth(1200);
      game.setHeight(600);
      game.setHasData(true);
      game.setWorld("frosty");
    } else if (name.equals(MINE_FOREST_CAVE)) {
      game = new Game();
      game.setDescription("Mine - Forest Cave");
      game.setName(MINE);
      game.setWidth(1200);
      game.setHeight(600);
      game.setHasData(true);
      game.setWorld("forestcave");
    } else if (name.equals(LIFE)) {
      game = new Game();
      game.setDescription("Life - Original");
      game.setName(LIFE);
      game.setWidth(1200);
      game.setHeight(600);
      game.setHasData(true);
      game.setWorld("original");
    }
    return game;
  }
}
