package bunker.twolandia.servlet.miner;


public class Player {
  protected double x = 0;
  protected double y = 0;
  protected int lookingRight = 0;
  protected int lookingDown = 0;
  protected int rest = 0;
  protected int jump = 0;
  protected boolean starting = true;
  protected int holdingBlock = 0;
  protected String form = "";
  protected String name = "";

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

