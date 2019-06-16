package bunker.twolandia.logic;

import bunker.twolandia.model.GameAvailable;
import bunker.twolandia.model.GameHandler;
import bunker.twolandia.model.User;
import bunker.twolandia.servlet.MinerServlet;
import bunker.twolandia.servlet.miner.Player;

public class MinerGameHandler extends GameHandler {

  public MinerGameHandler(GameAvailable gameAvailable, User user) {
    super(gameAvailable, user);
  }

  @Override
  public void changeName(String newName) {
    Player player = MinerServlet.getWorldMinder().getPlayer(user.getName());
    if (player != null) {
      player.setName(newName);
    }
  }

  @Override
  public void leaveGame() {
    MinerServlet.getWorldMinder().removePlayer(user.getName());
  }

}
