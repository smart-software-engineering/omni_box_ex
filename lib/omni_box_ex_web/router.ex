defmodule OmniBoxExWeb.Router do
  use OmniBoxExWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {OmniBoxExWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", OmniBoxExWeb do
    pipe_through :browser

    get "/", OmniBoxController, :index
    live "/live", OmniBoxLive
  end

  # Other scopes may use custom stacks.
  # scope "/api", OmniBoxExWeb do
  #   pipe_through :api
  # end
end
