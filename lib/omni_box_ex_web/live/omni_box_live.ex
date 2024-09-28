defmodule OmniBoxExWeb.OmniBoxLive do
  use OmniBoxExWeb, :live_view

  def render(assigns) do
    ~H"""
    <.header>Omnibox Example</.header>
    <div>
      <p>Here comes the omnixbox in a form</p>
    </div>

    <article>
      <h2 class="text text-xl mt-6 mb-3 font-bold">OmniBox Web Component</h2>
      <p>
        This is an extremely versatile autocompletion component with <em>zero</em>
        dependencies, that runs in every browser, and is implemented as a Web Component.
      </p>
      <p>
        It uses the custom tag <code>&lt;omni-box&gt;&lt;/omni-box&gt;</code>
        and can be used in any web project.
      </p>
      <p>
        OmniBox is suitable for simple autocompletion inputs with fixed (Array) data, but can also be used in complex situations where multiple sources such as REST Apis need to be called and the results of multiple calls need to be aggregated.
      </p>
      <p>
        Also, it can be configured to call custom actions on selection of an autocomplete result item, instead of just filling the attached input.
      </p>
      <h3>Features</h3>
      <ul class="list-disc list-inside">
        <li>Web Component</li>
        <li>Zero dependencies</li>
        <li>
          Configurable autocompletion categories, where the autocompletion results are aggregated as you type<br />
          Each category:
          <ul class="list-disc list-inside">
            <li>has a 'getItems' property that can return an Array, a Function or a Promise</li>
            <li>has a sortindex</li>
            <li>can have a trigger function that determines when its 'getItems' is called</li>
            <li>can have custom actions defined for item selection</li>
          </ul>
        </li>
      </ul>
    </article>
    """
  end
end
