defmodule OmniBoxExWeb.OmniBoxController do
  use OmniBoxExWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", layout: false)
  end
end
