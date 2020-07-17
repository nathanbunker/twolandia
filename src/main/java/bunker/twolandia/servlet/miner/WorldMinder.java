package bunker.twolandia.servlet.miner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import com.google.gson.Gson;

public class WorldMinder extends Thread {

  private static final boolean RANDOM_WORLD = true;

  public WorldMinder() {
    if (RANDOM_WORLD) {
      int worldHeight = 51;
      int worldWidth = 100;
      int startingSkyHeight = 10;
      world = new Integer[worldHeight][worldWidth];
      double[] skyHeight = new double[worldWidth];
      for (int j = 0; j < worldWidth; j++) {
        skyHeight[j] = startingSkyHeight;
      }

      Random random = new Random();
      int startJ = 0;
      double height = startingSkyHeight;
      double triangleWidth = worldWidth;

      triangulate(skyHeight, random, startJ, height, triangleWidth);

      for (int i = 0; i < worldHeight; i++) {
        for (int j = 0; j < world[i].length; j++) {
          if (skyHeight[j] > i) {
            world[i][j] = BLOCK_AIR;
          } else {
            world[i][j] = BLOCK_STONE;
          }
        }
      }

      int[][] cavePoints = new int[11][2];
      for (int k = 0; k < cavePoints.length; k++) {
        int j = random.nextInt(worldWidth);
        if ((skyHeight[j] + 2) < worldHeight) {
          int i = random.nextInt(worldHeight - ((int) skyHeight[j]) - 2) + ((int) skyHeight[j]) + 1;
          cavePoints[k][0] = i;
          cavePoints[k][1] = j;
        }
      }
      for (int k = 0; k < cavePoints.length; k++) {
        world[cavePoints[k][0]][cavePoints[k][1]] = BLOCK_CAVE_AIR;
      }
      for (int k1 = 0; k1 < cavePoints.length; k1++) {
        System.out
            .println("--> [" + k1 + "] {" + cavePoints[k1][0] + "," + cavePoints[k1][1] + "}");
      }
      for (int k1 = 0; k1 < cavePoints.length; k1++) {
        for (int k2 = k1 + 1; k2 < cavePoints.length; k2++) {

          int distI = Math.abs(cavePoints[k1][0] - cavePoints[k2][0]);
          int distJ = Math.abs(cavePoints[k1][1] - cavePoints[k2][1]);
          System.out.println("--> [" + k1 + ", " + k2 + "] distI = " + distI + " distJ = " + distJ);
          if (distI < 7 && distJ < 25) {
            int sI = cavePoints[k2][0];
            int eI = cavePoints[k1][0];
            if (cavePoints[k1][0] < cavePoints[k2][0]) {
              sI = cavePoints[k1][0];
              eI = cavePoints[k2][0];
            }
            int sJ = cavePoints[k2][1];
            int eJ = cavePoints[k1][1];
            if (cavePoints[k1][1] < cavePoints[k2][1]) {
              sJ = cavePoints[k1][1];
              eJ = cavePoints[k2][1];
            }
            System.out.println("-->   CAVE !!!! {" + sI + "-" + eI + ", " + sJ + "-" + eJ + "}");
            for (int i = sI; i <= eI; i++) {
              for (int j = sJ; j <= eJ; j++) {
                if (world[i][j] != BLOCK_CAVE_AIR && world[i][j] != BLOCK_AIR) {
                  world[i][j] = BLOCK_CAVE_AIR;
                }
              }
            }
          }
        }
      }
    } else {
      Gson gson = new Gson();

      InputStream in = this.getClass().getResourceAsStream("miner.json");
      if (in == null) {
        throw new NullPointerException("Unable to find miner.data");
      }
      InputStreamReader reader = new InputStreamReader(in);
      BufferedReader buf = new BufferedReader(reader);
      world = gson.fromJson(buf, Integer[][].class);
    }
  }

  private void triangulate(double[] skyHeight, Random random, int startJ, double height,
      double triangleWidth) {
    int middleJ = (int) (triangleWidth / 2.0) + startJ;
    double triangleHeight = (random.nextBoolean() ? -1 : 1) * random.nextGaussian() * height;
    if (triangleHeight > 0) {
      double triangleDiff = triangleHeight / (triangleWidth / 2.0);
      for (int j = startJ; j < triangleWidth + startJ; j++) {
        if (j < middleJ) {
          skyHeight[j] += ((j - startJ) * triangleDiff);
        } else {
          skyHeight[j] += ((triangleWidth - (j - startJ)) * triangleDiff);
        }
      }
    }
    if (triangleWidth >= 20) {
      int triangleWidth1 = (int) (triangleWidth / 2);
      int triangleWidth2 = (int) (triangleWidth - triangleWidth1);
      double height1 = Math.abs(skyHeight[startJ] - skyHeight[startJ + triangleWidth1 - 1]);
      double height2 =
          Math.abs(skyHeight[startJ + triangleWidth1] - skyHeight[startJ + triangleWidth2 - 1]);
      if (height1 < 0.5) {
        height1 = height;
      }
      if (height2 < 0.5) {
        height2 = height;
      }
      triangulate(skyHeight, random, startJ, height1, triangleWidth1);
      triangulate(skyHeight, random, startJ + triangleWidth1, height2, triangleWidth2);
    }
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
