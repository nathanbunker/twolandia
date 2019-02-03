package bunker.twolandia.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import bunker.twolandia.model.Player;

public class HomeServlet extends HttpServlet {

  private static final String PARAM_PLAYER_NAME = "playerName";
  private static final String PARAM_ACTION = "action";

  private static final String ACTION_SAVE = "Save";

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    resp.setContentType("text/html");
    PrintWriter out = new PrintWriter(resp.getOutputStream());
    HttpSession session = req.getSession(true);

    Integer count = (Integer) session.getAttribute("count");
    if (count == null) {
      count = 1;
    } else {
      count = count + 1;
    }
    session.setAttribute("count", count);

    Player player = (Player) session.getAttribute("player");
    if (player == null) {
      player = new Player();
      session.setAttribute("player", player);
    }

    String action = req.getParameter(PARAM_ACTION);
    if (action != null) {
      if (action.equals(ACTION_SAVE)) {
        player.setName(req.getParameter(PARAM_PLAYER_NAME));
      }
    }

    out.println("<html>");
    out.println("  <head>");
    out.println("   <title>Twolandia</title>");
    out.println("   <script src=\"processing.js\"></script>");
    out.println("  </head>");
    out.println("  <body>");
    out.println("    <canvas id=\"canvas1\"></canvas>");
    out.println("    <script>");
    out.println("      var circleWidth = 10; ");
    out.println("      var factor = 1; ");
    out.println("      function sketchProc(processing) { ");
    out.println("        processing.setup = function() { ");
    out.println("          processing.size(400, 400);");
    out.println("        }");
    out.println("        processing.draw = function() { ");
    InputStreamReader reader =
        new InputStreamReader(this.getClass().getResourceAsStream("program.js"));
    BufferedReader buf = new BufferedReader(reader);
    String line;
    while ((line = buf.readLine()) != null) {
      out.println(line);
    }
    out.println("        }");
    out.println("      }");
    out.println("      var canvas = document.getElementById(\"canvas1\"); ");
    out.println("      var processingInstance = new Processing(canvas, sketchProc) ");
    out.println("    </script>");
    out.println("  </body>");
    out.println("</html>");

    out.close();
  }
}
