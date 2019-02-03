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
import bunker.twolandia.model.Game;
import bunker.twolandia.model.Player;

public class HomeServlet extends HttpServlet {

  private static final String PARAM_GAME_NAME = "gameName";
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
    String gameName = GameFactory.KAHN_ORIGINAL;
    if (req.getParameter(PARAM_GAME_NAME) != null) {
      gameName = req.getParameter(PARAM_GAME_NAME);
    }
    Game game = GameFactory.getGame(gameName);

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
    out.println("      function sketchProc(processing) { ");
    out.println("        processing.setup = function() { ");
    out.println("          processing.size(" + game.getWidth() + ", " + game.getHeight() + ");");
    out.println("        }");
    out.println("        processing.draw = function() { ");
    if (game.isHasData()) {
      inlineJavascript(out, game.getName() + "-" + game.getWorld());
    }
    inlineJavascript(out, game.getName());
    out.println("        }");
    out.println("      }");
    out.println("      var canvas = document.getElementById(\"canvas1\"); ");
    out.println("      var processingInstance = new Processing(canvas, sketchProc) ");
    out.println("    </script>");
    String link = "home?" + PARAM_GAME_NAME + "=";
    out.println("    <ul>");
    out.println(
        "      <li><a href=\"" + link + GameFactory.KAHN_ORIGINAL + "\">Kahn Original</a></li>");
    out.println("      <li><a href=\"" + link + GameFactory.MINE + "\">Mine - Original</a></li>");
    out.println(
        "      <li><a href=\"" + link + GameFactory.MINE_FROSTY + "\">Mine - Frosty</a></li>");
    out.println("    <ul>");
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
