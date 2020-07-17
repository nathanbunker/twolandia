package bunker.twolandia.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import bunker.twolandia.servlet.miner.Player;
import bunker.twolandia.servlet.miner.WorldMinder;

public class MinerServlet extends HttpServlet {

  private static WorldMinder worldMinder = null;
  
  public static WorldMinder getWorldMinder()
  {
    setup();
    return worldMinder;
  }

  private synchronized static void setup() {
    if (worldMinder == null) {
      worldMinder = new WorldMinder();
      worldMinder.start();
    }
  }

  public static final String PARAM_SHOW = "show";
  public static final String SHOW_WORLD = "world";
  public static final String SHOW_PLAYERS = "players";

  public static final String PARAM_ACTION = "action";
  public static final String ACTION_SINK = "sink";
  public static final String ACTION_MINE = "mine";
  public static final String ACTION_PLACE = "place";
  public static final String ACTION_REPORT = "report";

  public static final String PARAM_X = "x";
  public static final String PARAM_Y = "y";
  public static final String PARAM_BLOCK = "block";
  public static final String PARAM_LOOKING_RIGHT = "lookingRight";
  public static final String PARAM_LOOKING_DOWN = "lookingDown";
  public static final String PARAM_HOLDING_BLOCK = "holdingBlock";
  public static final String PARAM_NAME = "name";


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    resp.setContentType("application/json");
    PrintWriter out = new PrintWriter(resp.getOutputStream());

    setup();

    String action = req.getParameter(PARAM_ACTION);
    if (action != null) {
      if (action.equals(ACTION_MINE) || action.equals(ACTION_PLACE)) {
        int x = Integer.parseInt(req.getParameter(PARAM_X));
        int y = Integer.parseInt(req.getParameter(PARAM_Y));
        int block = Integer.parseInt(req.getParameter(PARAM_BLOCK));
        worldMinder.place(x, y, block);
      } else if (action.equals(ACTION_REPORT)) {
        double x = Double.parseDouble(req.getParameter(PARAM_X));
        double y = Double.parseDouble(req.getParameter(PARAM_Y));
        int lookingRight = Integer.parseInt(req.getParameter(PARAM_LOOKING_RIGHT));
        int lookingDown = Integer.parseInt(req.getParameter(PARAM_LOOKING_DOWN));
        int holdingBlock = Integer.parseInt(req.getParameter(PARAM_HOLDING_BLOCK));
        String name = req.getParameter(PARAM_NAME);
        Player player = worldMinder.getPlayer(name);
        player.setX(x);
        player.setY(y);
        player.setLookingRight(lookingRight);
        player.setLookingDown(lookingDown);
        player.setHoldingBlock(holdingBlock);
      }
    }

    String show = req.getParameter(PARAM_SHOW);
    if (show == null) {
      show = SHOW_WORLD;
    }

    if (show.equals(SHOW_WORLD)) {
      worldMinder.printWorld(out);
    } else if (show.equals(SHOW_PLAYERS)) {
      Gson gson = new Gson();
      out.println(gson.toJson(worldMinder.getPlayerList()));
    }

    out.close();
  }
}
