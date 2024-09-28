defmodule OmniBoxExWeb.OmniBoxHTML do
  @moduledoc """
  This module contains pages rendered by PageController.

  See the `page_html` directory for all templates available.
  """
  use OmniBoxExWeb, :html

  embed_templates "omni_box_html/*"
end
