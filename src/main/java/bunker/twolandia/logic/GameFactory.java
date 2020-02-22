package bunker.twolandia.logic;

import bunker.twolandia.model.GameAvailable;
import bunker.twolandia.model.GameHandler;
import bunker.twolandia.model.User;

public class GameFactory {
  public static final String KAHN_ORIGINAL = "program";
  public static final String MINE = "mine";
  public static final String MINE_FROSTY = "mineFrosty";
  public static final String MINE_FOREST_CAVE = "mineForestCave";
  public static final String LIFE = "life";
  public static final String MINER = "miner";

  public static GameHandler getGame(String name, User user) {
    GameHandler game = null;
    GameAvailable gameAvailable = GameAvailable.getGameAvailable(name);
    switch (gameAvailable)
    {
      case KAHN_ORIGINAL:
        game = new DefaultGameHandler(gameAvailable, user);
        game.setName(KAHN_ORIGINAL);
        game.setWidth(300);
        game.setHeight(600);
        break;
      case LIFE:
        game = new DefaultGameHandler(gameAvailable, user);
        game.setName(LIFE);
        game.setWidth(1200);
        game.setHeight(600);
        game.setHasData(true);
        game.setWorld("original");
        break;
      case MINE:
        game = new DefaultGameHandler(gameAvailable, user);
        game.setName(MINE);
        game.setWidth(1200);
        game.setHeight(600);
        game.setHasData(true);
        game.setWorld("original");
        break;
      case MINER:
        game = new MinerGameHandler(gameAvailable, user);
        game.setName(MINER);
        game.setWidth(1200);
        game.setHeight(600);
        break;
      case MINE_FOREST_CAVE:
        game = new DefaultGameHandler(gameAvailable, user);
        game.setName(MINE);
        game.setWidth(1200);
        game.setHeight(600);
        game.setHasData(true);
        game.setWorld("forestcave");
        break;
      case MINE_FROSTY:
        game = new DefaultGameHandler(gameAvailable, user);
        game.setName(MINE);
        game.setWidth(1200);
        game.setHeight(600);
        game.setHasData(true);
        game.setWorld("frosty");
        break;
    }
    return game;
  }
}
