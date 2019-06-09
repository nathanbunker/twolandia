package bunker.twolandia.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

public class MinerServlet extends HttpServlet {


  private static Integer[][] world = null;

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

    }
  }

  public static final String PARAM_SHOW = "show";
  public static final String SHOW_WORLD = "world";

  public static final String PARAM_ACTION = "action";
  public static final String ACTION_SINK = "sink";

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
    }

    out.close();

  }
}
