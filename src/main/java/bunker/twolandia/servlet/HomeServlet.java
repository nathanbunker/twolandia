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
import bunker.twolandia.logic.GameFactory;
import bunker.twolandia.model.GameAvailable;
import bunker.twolandia.model.GameHandler;
import bunker.twolandia.model.User;

public class HomeServlet extends HttpServlet {

  private static final String PARAM_GAME_NAME = "gameName";
  private static final String PARAM_USER_NAME = "userName";
  private static final String PARAM_ACTION = "action";

  private static final String ACTION_LOAD_GAME = "Load Game";

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    resp.setContentType("text/html");
    PrintWriter out = new PrintWriter(resp.getOutputStream());
    HttpSession session = req.getSession(true);

    String gameName = GameFactory.KAHN_ORIGINAL;
    if (req.getParameter(PARAM_GAME_NAME) != null) {
      gameName = req.getParameter(PARAM_GAME_NAME);
    }

    GameHandler game = (GameHandler) session.getAttribute("game");

    String action = req.getParameter(PARAM_ACTION);
    String message = null;
    if (action != null) {
      if (action.equals(ACTION_LOAD_GAME)) {
        if (game != null) {
          game.leaveGame();
        }
        game = null;
        String username = req.getParameter(PARAM_USER_NAME);
        if (username.equals("")) {
          message = "Name is required";
        } else {
          User user = new User();
          user.setName(username);
          game = GameFactory.getGame(gameName, user);
        }
      }
    }

    out.println("<html>");
    out.println("  <head>");
    out.println("   <title>Twolandia</title>");
    if (game != null) {
      out.println("   <script src=\"processing.js\"></script>");
    }
    out.println("  </head>");
    out.println("  <body>");
    if (game != null) {
      User user = game.getUser();
      out.println("    <canvas id=\"canvas1\"></canvas>");
      out.println("    <script>");
      out.println("      function sketchProc(processing) { ");
      out.println("        processing.setup = function() { ");
      out.println("          processing.size(" + game.getWidth() + ", " + game.getHeight() + ");");
      out.println("        }");
      out.println("        processing.draw = function() { ");
      out.println("          var playerName = '" + user.getName() + "'; ");
      if (game.isHasData()) {
        inlineJavascript(out, game.getName() + "-" + game.getWorld());
      }
      inlineJavascript(out, game.getName());
      out.println("        }");
      out.println("      }");
      out.println("      var canvas = document.getElementById(\"canvas1\"); ");
      out.println("      var processingInstance = new Processing(canvas, sketchProc) ");
      out.println("    </script>");
    }
    if (message != null) {
      out.println("<p><font color=\"red\">" + message + "</font></p>");
    }
    out.println("    <form method=\"GET\" action=\"home\">");
    out.println("    <table>");
    out.println("      <tr>");
    out.println("        <td>Name</td>");
    String username = game == null ? "" : game.getUser().getName();
    out.println("        <td><input type=\"text\" name=\"" + PARAM_USER_NAME + "\" value=\""
        + username + "\"></td>");
    out.println("      </tr>");
    out.println("      <tr>");
    out.println("        <td>Game</td>");
    out.println("        <td>");
    for (GameAvailable gameAvailable : GameAvailable.values()) {
      out.println("          <input type=\"radio\" name=\"" + PARAM_GAME_NAME + "\" value=\""
          + gameAvailable.getId() + "\""
          + ((game != null && game.getGameAvailable() == gameAvailable) ? " checked" : "") + ">"
          + gameAvailable.getDescription() + "</br>");
    }
    out.println("        </td>");
    out.println("      </tr>");
    out.println("      <tr>");
    out.println("        <td colspan=\"2\" align=\"right\"><input type=\"submit\" name=\""
        + PARAM_ACTION + "\" value=\"" + ACTION_LOAD_GAME + "\"></td>");
    out.println("      </tr>");
    out.println("    </table>");
    out.println("    </form>");
    out.println("  </body>");
    out.println("</html>");

    out.close();
  }

  private void inlineJavascript(PrintWriter out, String s) throws IOException {
    InputStreamReader reader =
        new InputStreamReader(this.getClass().getResourceAsStream(s + ".js"));
    BufferedReader buf = new BufferedReader(reader);
    String line;
    while ((line = buf.readLine()) != null) {
      out.println(line);
    }
  }
}
