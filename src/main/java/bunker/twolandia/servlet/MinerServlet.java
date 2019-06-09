package bunker.twolandia.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

public class MinerServlet extends HttpServlet {


  private static Integer[][] world = null;
  private static WorldMinder worldMinder = null;

  private void setup() {
    if (world == null) {
      Gson gson = new Gson();

      InputStream in = this.getClass().getResourceAsStream("miner.json");
      if (in == null) {
        throw new NullPointerException("Unable to find miner.data");
      }
      InputStreamReader reader = new InputStreamReader(in);
      BufferedReader buf = new BufferedReader(reader);
      world = gson.fromJson(buf, Integer[][].class);

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

  public static class Player {
    private double x = 0;
    private double y = 0;
    private int lookingRight = 0;
    private int lookingDown = 0;
    private int rest = 0;
    private int jump = 0;
    private boolean starting = true;
    private int holdingBlock = 0;
    private String form = "";
    private String name = "";

    public String getForm() {
      return form;
    }

    public void setForm(String form) {
      this.form = form;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public double getX() {
      return x;
    }

    public void setX(double x) {
      this.x = x;
    }

    public double getY() {
      return y;
    }

    public void setY(double y) {
      this.y = y;
    }

    public int getLookingRight() {
      return lookingRight;
    }

    public void setLookingRight(int lookingRight) {
      this.lookingRight = lookingRight;
    }

    public int getLookingDown() {
      return lookingDown;
    }

    public void setLookingDown(int lookingDown) {
      this.lookingDown = lookingDown;
    }

    public int getRest() {
      return rest;
    }

    public void setRest(int rest) {
      this.rest = rest;
    }

    public int getJump() {
      return jump;
    }

    public void setJump(int jump) {
      this.jump = jump;
    }

    public boolean isStarting() {
      return starting;
    }

    public void setStarting(boolean starting) {
      this.starting = starting;
    }

    public int getHoldingBlock() {
      return holdingBlock;
    }

    public void setHoldingBlock(int holdingBlock) {
      this.holdingBlock = holdingBlock;
    }

    @Override
    public boolean equals(Object obj) {
      if (obj == null) {
        return false;
      }
      if (obj instanceof Player) {
        Player otherPlayer = (Player) obj;
        return otherPlayer.getName().equals(this.getName());
      }
      return super.equals(obj);
    }

  }

  public static final int BLOCK_SIZE = 12;

  public static final int BLOCK_AIR = 0;
  public static final int BLOCK_STONE = 1;
  public static final int BLOCK_DIRT = 2;
  public static final int BLOCK_CAVE_AIR = 3;
  public static final int BLOCK_SAND = 4;
  public static final int BLOCK_WATER = 5;
  public static final int BLOCK_GRASS = 6;
  public static final int BLOCK_COAL = 7;
  public static final int BLOCK_IRON = 8;
  public static final int BLOCK_DIAMOND = 9;
  public static final int BLOCK_SNOW = 10;
  public static final int BLOCK_ICE = 11;
  public static final int BLOCK_WOOD = 12;
  public static final int BLOCK_LEAVES = 13;
  // public static final int BLOCK_ = 14;
  // public static final int BLOCK_ = 15;
  public static final int BLOCK_AMETHYST = 16;
  public static final int BLOCK_FLAMES = 17;

  public static class WorldMinder extends Thread {
    private boolean keepRunning = true;

    public Player getPlayer(String name) {
      synchronized (playerList) {
        for (Player p : playerList) {
          if (p.getName().equals(name)) {
            return p;
          }
        }
        Player player = new Player();
        player.setName(name);
        playerList.add(player);
        return player;
      }

    }

    @Override
    public void run() {
      while (keepRunning) {
        synchronized (playerList) {
          for (Player p : playerList) {
            fallPlayer(p);
          }

          try {
            playerList.wait(17);
          } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
        }
      }
    }

    private void fallPlayer(Player p) {
      int fieldX = (int) (p.x / BLOCK_SIZE);
      int fieldY = (int) (p.y / BLOCK_SIZE);
      int fieldYf = (int) ((p.y + 3) / BLOCK_SIZE);
      int fieldXr = (int) ((p.x + 6) / BLOCK_SIZE);
      if ((world[fieldY][fieldX] == BLOCK_AIR && world[fieldY][fieldXr] == BLOCK_AIR)
          || (world[fieldY][fieldX] == BLOCK_CAVE_AIR
              && world[fieldY][fieldXr] == BLOCK_CAVE_AIR)) {
        // we are standing on the sky!
        // move down by one
        if (p.jump > 0) {
          p.x += p.lookingRight * 3;
          if (p.jump <= 1) {
            p.y -= 1;
            p.jump = 0;
          } else {
            p.y -= p.jump / 2;
            p.jump = p.jump / 2;
          }
        } else {
          if ((world[fieldYf][fieldX] == BLOCK_AIR && world[fieldYf][fieldXr] == BLOCK_AIR)
              || (world[fieldYf][fieldX] == BLOCK_CAVE_AIR
                  && world[fieldYf][fieldXr] == BLOCK_CAVE_AIR)) {
            p.y += 3;
          } else {
            p.y = fieldYf * BLOCK_SIZE;
          }
        }
      } else if (world[fieldY][fieldX] == BLOCK_WATER && world[fieldY][fieldXr] == BLOCK_WATER) {
        // we are in the water, now you should sink
        // move down by one
        p.x += p.lookingRight * 0.5;
        p.y += 0.2;
        if (p.jump > 0) {
          p.y--;
          p.jump--;
        } else {
          p.jump = 0;
        }
      } else if (p.jump > 0) {
        p.x += p.lookingRight * 3;
        if (p.jump == 1) {
          p.y -= 1;
          p.jump = 0;
        } else {
          p.y -= p.jump / 2;
          p.jump = p.jump / 2;
        }
      } else {
        p.jump = 0;
      }
    }
  }

  private static List<Player> playerList = new ArrayList<MinerServlet.Player>();


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    resp.setContentType("application/json");
    PrintWriter out = new PrintWriter(resp.getOutputStream());

    setup();

    String action = req.getParameter(PARAM_ACTION);
    if (action != null) {
      if (action.equals(ACTION_SINK)) {
        for (int i = world.length - 1; i > 0; i--) {
          world[i] = world[i - 1];
        }
      } else if (action.equals(ACTION_MINE) || action.equals(ACTION_PLACE)) {
        int x = Integer.parseInt(req.getParameter(PARAM_X));
        int y = Integer.parseInt(req.getParameter(PARAM_Y));
        int block = Integer.parseInt(req.getParameter(PARAM_BLOCK));
        world[y][x] = block;
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
      out.print("[");
      boolean firstRow = true;
      for (int i = 0; i < world.length; i++) {
        if (!firstRow) {
          out.print(",");
        }
        firstRow = false;
        out.print("[");
        boolean first = true;
        for (int j = 0; j < world[i].length; j++) {
          if (!first) {
            out.print(",");
          }
          first = false;
          out.print(world[i][j]);
        }
        out.print("]");
      }
      out.println("]");
    } else if (show.equals(SHOW_PLAYERS)) {
      Gson gson = new Gson();
      out.println(gson.toJson(playerList));
    }

    out.close();

  }
}
