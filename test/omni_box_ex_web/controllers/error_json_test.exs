defmodule OmniBoxExWeb.ErrorJSONTest do
  use OmniBoxExWeb.ConnCase, async: true

  test "renders 404" do
    assert OmniBoxExWeb.ErrorJSON.render("404.json", %{}) == %{errors: %{detail: "Not Found"}}
  end

  test "renders 500" do
    assert OmniBoxExWeb.ErrorJSON.render("500.json", %{}) ==
             %{errors: %{detail: "Internal Server Error"}}
  end
end
