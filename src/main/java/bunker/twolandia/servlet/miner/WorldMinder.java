package bunker.twolandia.servlet.miner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.google.gson.Gson;

public class WorldMinder extends Thread {

  public WorldMinder() {
    Gson gson = new Gson();

    InputStream in = this.getClass().getResourceAsStream("miner.json");
    if (in == null) {
      throw new NullPointerException("Unable to find miner.data");
    }
    InputStreamReader reader = new InputStreamReader(in);
    BufferedReader buf = new BufferedReader(reader);
    world = gson.fromJson(buf, Integer[][].class);


  }

  private boolean keepRunning = true;
  private List<Player> playerList = new ArrayList<Player>();
  private static Integer[][] world = null;

  public List<Player> getPlayerList() {
    return playerList;
  }

  public void removePlayer(String name) {
    synchronized (playerList) {
      for (Iterator<Player> it = playerList.iterator(); it.hasNext();) {
        Player player = it.next();
        if (player.getName().equals(name)) {
          it.remove();
        }
      }
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


  public void place(int x, int y, int block) {
    world[y][x] = block;
  }

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
        || (world[fieldY][fieldX] == BLOCK_CAVE_AIR && world[fieldY][fieldXr] == BLOCK_CAVE_AIR)) {
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

  public void printWorld(PrintWriter out) {
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
  }
}
