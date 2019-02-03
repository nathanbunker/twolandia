package bunker.twolandia.logic;

import bunker.twolandia.model.Game;

public class GameFactory {
  public static final String KAHN_ORIGINAL = "program";
  public static final String MINE = "mine";

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
      game.setDescription("Mine");
      game.setName(MINE);
      game.setWidth(1200);
      game.setHeight(600);
    }
    return game;
  }
}
