/**
 * @enum { Number }
 */
export const CustomElementDOMType = {
  Light: 1,
  Shadow: 2
};

/**
 * Base Class for Web Components.
 * Features:
 *   - Proxy-managed 'state' (object) property
 *   - Automatic signalling of state property changes using Custom Events
 *   - ES String Template based render() method
 *   - Support for Shadow and Light DOM (see domType - CustomElementDOMType)
 */
class CustomElement extends HTMLElement { 
  #renderRoot;

  constructor() {
    super();
    this.#renderRoot = this;
  }

  /**
   * Gets the current render root element (light or shadow DOM)
   */
  get renderRoot() {
    return this.#renderRoot;
  }

  /**
   * Return true in an inherited class to show a skeleton while rendering
   */
  get useSkeleton() {
    return false;
  }

  connectedCallback() {
    const me = this;

    if (me.domType === CustomElementDOMType.Shadow) {
      me.attachShadow({ mode: "open" });
      me.#renderRoot = me.shadowRoot;
    }

    if (typeof me.render === "function") {
      let skeletonTimer;
      const render_internal = async (me) => {
        if (skeletonTimer) clearTimeout(skeletonTimer);
        me.renderRoot.innerHTML = "";
        const template = await me.render.apply(me);

        for (let node of parseHTML(template)) {
          me.renderRoot.appendChild(node);
        }

        if (typeof me.rendered === "function") {
          enQueue(me.rendered.bind(me));
        }
      };
      if (me.useSkeleton) {
        skeletonTimer = setTimeout(() => {
          me.handleSkeleton();
        }, 500);

        enQueue(async () => render_internal(me), 50);
      } else render_internal(me);
    }
  }

  /**
   * Attaches one or more event listeners
   * @param {String} eventNames - name(s) of the event to listen to, space-separated.
   * @param {Event || Object} funcOrObject - function, or object with selectors as keys and functions as values.
   */
  on(eventNames, funcOrObject) {
    eventNames.split(" ").forEach((eventName) => {
      if (typeof funcOrObject === "function")
        this.addEventListener(eventName, func);
      else {
        this.addEventListener(eventName, (e) => {
          Object.keys(funcOrObject).forEach((selector) => {
            if (e.target.closest(selector)) {
              funcOrObject[selector].apply(this, [e]);
            }
          });
        });
      }
    });
  }

  /**
   * @type {CustomElementDOMType}
   */
  set domType(value) {
    this._domType = value;
  }
  get domType() {
    return this._domType;
  }

  handleSkeleton() {
    if (this.useSkeleton === true)
      this.renderRoot.innerHTML = /*html*/ `<section class="skeleton"></section>`;
    else if (typeof this.useSkeleton === "string") {
      this.renderRoot.innerHTML = this.useSkeleton;
    } else if (typeof this.useSkeleton === "function") {
      this.renderRoot.innerHTML = this.useSkeleton();
    }
  }
}

function getCountryAutoComplete(){
  return {
    categories: {
      Shortlisted: {
        trigger: (options) => {
          return options.search.length === 0;
        }, 
        getItems: () => ["Netherlands (the)", "France", "Germany"].map(i=>{return {text:i}})
      },
      All: {
        trigger: (options) => {
          return options.search.length >= 1;
        },  
        getItems: (options) => {
          options.search = (options.search || "").toUpperCase();
          return [
            "Afghanistan",
            "Åland Islands",
            "Albania",
            "Algeria",
            "American Samoa",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antarctica",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia",
            "Bonaire, Sint Eustatius and Saba",
            "Bosnia and Herzegovina",
            "Botswana",
            "Bouvet Island",
            "Brazil",
            "British Indian Ocean Territory",
            "Brunei Darussalam",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cabo Verde",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cayman Islands",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Christmas Island",
            "Cocos Islands",
            "Colombia",
            "Comoros",
            "Congo (Democratic Republic)",
            "Congo",
            "Cook Islands",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Curaçao",
            "Cyprus",
            "Czechia",
            "Côte d'Ivoire",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Eswatini",
            "Ethiopia",
            "Falkland Islands",
            "Faroe Islands",
            "Fiji",
            "Finland",
            "France",
            "French Guiana",
            "French Polynesia",
            "French Southern Territories",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Heard Island and McDonald Islands",
            "Holy See (the)",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Korea (Democratic People's Republic)",
            "Korea (Republic)",
            "Kuwait",
            "Kyrgyzstan",
            "Lao People's Democratic Republic",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macao",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Martinique",
            "Mauritania",
            "Mauritius",
            "Mayotte",
            "Mexico",
            "Micronesia",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Niue",
            "Norfolk Island",
            "Northern Mariana Islands",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestine, State of",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines (the)",
            "Pitcairn",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Republic of North Macedonia",
            "Romania",
            "Russian Federation",
            "Rwanda",
            "Réunion",
            "Saint Barthélemy",
            "Saint Helena, Ascension and Tristan da Cunha",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Martin",
            "Saint Pierre and Miquelon",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Georgia and the South Sandwich Islands",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "Sudan (the)",
            "Suriname",
            "Svalbard and Jan Mayen",
            "Sweden",
            "Switzerland",
            "Syrian Arab Republic",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tokelau",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks and Caicos Islands",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates (the)",
            "United Kingdom",
            "United States Minor Outlying Islands",
            "United States of America",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela",
            "Viet Nam",
            "Virgin Islands (British)",
            "Virgin Islands (U.S.)",
            "Wallis and Futuna",
            "Western Sahara",
            "Yemen",
            "Zambia",
            "Zimbabwe"
          ].map(i=>{
            return {
              text: i
            }
          }).filter(i=>{
            
            return i.text.toUpperCase().startsWith(options.search);
          })
        }
      }
    }
  }
}
/**
 * Generates an HTML NodeList by parsing the given HTML string
 * @param {String} html
 * @returns {NodeListOf<ChildNode>} DOM element
 */
function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
}

/**
 * Checks whether the fiven string is a valid URL.
 * @param {String} txt - the string to evaluate
 * @returns Boolean indeicating whether the string is a URL.
 */
function isUrl(txt) {
  try {
    if (typeof txt !== "string") return false;
    if (txt.indexOf("\n") !== -1 || txt.indexOf(" ") !== -1) return false;
    if (txt.startsWith("#/")) return false;
    new URL(txt, window.location.origin);
    return true;
  } catch {}
  return false;
}

/**
 * Queue work until the main thread is freed up.
 * @param {Function} func
 */
function enQueue(func, milliseconds = 0) {
  setTimeout(func, milliseconds);
}

class AutoComplete {
  cssClasses = {
    result: "ac-suggestion",
    item: "ac-itm"
  };

  constructor(control, textInput, settings) {
    this.settings = settings;
    this.control = control;
    this.htmlElement = textInput;
    this.htmlElement.setAttribute("autocomplete", "off");
    this.htmlElement.style.position = "relative";
    this.categories = settings.categories || {};
    enQueue(this.attach.bind(this));
  }

  on(a, b) {
    this.htmlElement.addEventListener(a, b);
  }

  attach() {
    this.on("input", this.inputHandler.bind(this));
    this.on("click", this.clickHandler.bind(this));
    this.on("focusout", this.blurHandler.bind(this));
    this.on("keyup", this.keyUpHandler.bind(this));
    this.on("keydown", this.keyDownHandler.bind(this));

    this.resultsDiv = document.createElement("div");
    this.resultsDiv.title = ""; // block
    this.resultsDiv.classList.add(this.cssClasses.result);
    this.resultsDiv.style.width = this.control.offsetWidth;
    this.resultsDiv.addEventListener("mousedown", this.resultClick.bind(this));

    let cn = this.control;

    cn.appendChild(this.resultsDiv);

    this.clear();

    cn.setAttribute("data-autocomplete", "on");
  }

  moveResult(add) {
    this.show();
    let all = this.resultsDiv.querySelectorAll("div");
    let length = all.length;
    this.rowIndex = this.rowIndex + add;

    if (this.rowIndex <= 0) this.rowIndex = 0;
    else if (this.rowIndex > length - 1) {
      this.rowIndex = 0;
    }
    all.forEach((r) => {
      r.classList.remove("selected");
    });

    let div = this.getSelectedDiv();
    if (div) {
      div.classList.add("selected");
      div.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    } else {
      this.clickHandler({
        target: this.htmlElement
      });
    }
  }

  getSelectedDiv() {
    return this.resultsDiv.querySelector(`div:nth-child(${this.rowIndex + 1})`);
  }

  // execute action
  selectResult(div) {
    div = div || this.getSelectedDiv();

    if (div) {
      let index = parseInt(div.getAttribute("data-index"));
      this.resultClicked = true;
      let result = this.results[index];

      let handlingCategory = this.categories[result.category] ?? {};
      handlingCategory.action =
        handlingCategory.action ?? this.setText.bind(this);

      if (handlingCategory.newTab) {
        this.tabWindow = window.open("about:blank", "_blank"); // prevent popup blocking
      }

      let options = {
        ...result,
        search: this.htmlElement.value
      };

      div.classList.add("active");

      setTimeout(() => {
        handlingCategory.action(options);
        if (handlingCategory.newTab) {
          if (options.url) {
            this.tabWindow.location.href = options.url;
          } else {
            this.tabWindow.close();
          }
        }

        var event = new Event("change", { bubbles: true });
        this.htmlElement.dispatchEvent(event);

        this.clear();

        const ev = new Event("result-selected", { bubbles: false });
        ev.detail = {
          text: options.text
        };
        this.htmlElement.dispatchEvent(ev);
      }, 0);
    }
  }f

  setText(options) {
    if (this.control.autoCompleteInput) {
      //this.control.autoCompleteInput.value = options.text;
    } else {
      this.control.value = options.text;
    }
    this.hide();
  }

  resultClick(event) {
    this.selectResult(event.target.closest(`.${this.cssClasses.item}`));
  }

  blurHandler(e) {
    setTimeout(() => {
      if (!this.resultClicked) this.clear();

      this.resultClicked = false;
    }, 100);
  }

  clear() {
    this.resultsDiv.innerHTML = "";
    this.resultsDiv.classList.toggle("active", false)
  }

  show() {
    if (!this.resultsDiv.classList.contains("active")) {
      const rect = this.htmlElement.getBoundingClientRect();
      this.resultsDiv.style.top = `${rect.top + rect.height + 4}px`;
      //this.resultsDiv.style.right = `${(window.innerWidth - rect.right)}px`;
      this.resultsDiv.style.left = `${rect.left}px`;
      this.resultsDiv.style.width = `${rect.right - rect.left}px`;
      this.resultsDiv.style.maxWidth = "unset";
      this.resultsDiv.classList.toggle("active", true)
      this.rowIndex = -1;
    }
  }

  hide() {
    this.resultsDiv.classList.toggle("active", false)
  }

  inputHandler(e) {
    this.clear();
    let options = {
      search: e.target.value,
      categories: this.categories
    };

    this.getItems(options, e).then((r) => {
      this.clear();
      this.resultsHandler(r, options);
    });
  }

  keyDownHandler(e) {
    switch (e.key) {
      case "Enter":
        e.stopPropagation();
        e.preventDefault();
        break;
      case "ArrowDown":
        enQueue(this.moveResult(1));
        break;
      case "ArrowUp":
        enQueue(this.moveResult(-1));
        break;
    }
  }

  keyUpHandler(e) {
    switch (e.key) {
      case "Escape":
        this.hide();
        break;
      case "Enter":
        if (this.getSelectedDiv()) {
          this.control.preventEnter = true;
          e.stopPropagation();
          e.preventDefault();
          this.selectResult();
          setTimeout(() => {
            this.control.preventEnter = false;
          }, 10);
        }

        break;
      default:
        //this.toggle();
        break;
    }
  }

  clickHandler(e) {
    this.clear();
    let value = e.target.value;
    this.suggest(value, e);
  }

  /**
   * Shows suggestion box
   * @param {string} value - String to suggest results for
   */
  suggest(value, e) {
    this.htmlElement.focus();
    const options = {
      suggest: true,
      search: value || "",
      categories: this.categories
    };
    this.getItems(options, e).then((r) => {
      this.htmlElement.dispatchEvent(
        new CustomEvent("show-results", {
          detail: {
            results: r
          }
        })
      );

      this.resultsHandler(r, options);
    });
  }

  resultsHandler(r, options) {    
    this.results = r;
    this.rowIndex = -1;
    let index = 0;

    r.forEach((i) => {
      let image = null,
        catHandler = options.categories[i.category] || {};
      if (i.image) {
        i.icon = "ac-img";
        image = `style="background-image: url('${i.image}')"`;
      }
      if (i.element) {
        this.resultsDiv.appendChild(i.element);
      } else {
        i = typeof i === "string" ? { text: i } : i;
        this.resultsDiv.appendChild(
          parseHTML(/*html*/ `
          <div title="${i.tooltip || ""}" data-index="${index}" class="${
            this.cssClasses.item
          }">
            <svg-icon icon="${i.icon}"></svg-icon>
            <span class="text">${this.formatResultItem(
              i,
              options,
              catHandler
            )}</span>
            <span class="category">${i.category || ""}</span>
          </div>`)[0]
        );
      }

      index++;
    });
    if (r.length) {
      this.show();
    }
  }

  formatResultItem(item, options, catHandler) {
    const i = typeof item === "string" ? { text: item } : item;
    let result = i.text;

    if (options.search) {
      result = result.replace("%search%", options.search);
      i.description = i.description?.replace("%search%", options.search);
    }

    result = this.highlight(result, options.search);

    if (i.description) {
      result = `<div>${result}</div><small>${i.description}</small>`;
    }

    if (catHandler.format) {
      result = catHandler.format({
        item: i,
        result: result,
        options: options
      });
    }
    return result;
  }

  highlight(str, find) {
    var reg = new RegExp("(" + find + ")", "gi");
    return str.replace(reg, '<span class="txt-hl">$1</span>');
  }

  async getItems(options, e) {
    const prop = this.settings.map;

    const normalizeItem = (i) => {
      if (typeof i === "string") i = { text: i };

      return i;
    };

    const map = (list) => {
      if (!prop) {
        return list.map((i) => {
          return normalizeItem(i);
        });
      }
      return list.map((i) => {
        return { text: i[prop] };
      });
    };

    const max = (list) => {
      if (this.settings.max && this.settings.max > 0) {
        list.length = this.settings.max;
      }
      return list;
    };

    return new Promise((resolve) => {
      if (isUrl(this.items)) {
        if (this.settings.minlength > 0) {
          if (
            !options.search ||
            options.search.length < this.settings.minlength
          ) {
            resolve([]);
            return;
          }
        }
        let url = this.formatSearch(this.items, options);
        fetch(url).then((x) => {
          if (x.status === 200) {
            x.json().then((items) => {
              items = map(items);

              resolve(
                max(
                  items.filter((i) => {
                    return this.isMatch(options, i);
                  })
                )
              );
            });
            return;
          }
          throw Error(`HTTP error ${x.status} - ${url}`);
        });
      } else if (Array.isArray(this.items)) {
        let simple = true;

        this.items = this.items.map((i) => {
          if (typeof i === "string") {
            return { text: i };
          }
          simple = false;
          return i;
        });
        if (simple) {
          this.control.classList.add("simple");
        }
        resolve(max(map(this.items)));
      } else if (typeof this.items === "function") {
        options.control = this.control;
        let ar = Promise.resolve(this.items(options, e));
        ar.then((ar) => {
          ar = ar.map((i) => {
            return normalizeItem(i);
          });

          ar = map(ar);

          resolve(ar);
        });
      } else {
        return resolve(Promise.resolve(this.items.apply(this, options)));
      }
    });
  }

  async items(options) {
    let arr = [];
    options.results = [];

    for (var c in options.categories) {
      let catHandler = options.categories[c];
      catHandler.trigger =
        catHandler.trigger ??
        ((e) => {
          return true;
        });
      options.results = arr;
      if (catHandler.trigger(options)) {
        let catResults = [];
        try {
          catResults = await catHandler.getItems(options);
        } catch (ex) {
          console.warn(`Error loading items for omniBox category '${c}'.`, ex);
        }

        arr = arr.concat(
          catResults.map((i) => {
            i.category = c;
            return i;
          })
        );
      }
    }

    return arr;
  }

  formatSearch(url, options) {
    if (url.indexOf("%search%")) {
      return url.replace("%search%", options.search || "");
    }

    return url + "?" + this.createQueryParam(options);
  }

  createQueryParam(options) {
    let suggest = options.suggest ? "&suggest=true" : "";
    return `q=${options.text}${suggest}`;
  }

  isMatch(options, i) {
    if (i.text?.indexOf("%search%") >= 0) return true;

    return options.search
      ? i.text?.toLowerCase().indexOf(options.search.toLowerCase()) >= 0
      : options.suggest;
  }
}

/*
 Actual omni-box Web Component
*/
customElements.define(
  "omni-box",
  class OmniBox extends CustomElement {
    render(){
      return /*html*/`<div class="omnibox">
         <input type="search" placeholder="${this.getAttribute('placeholder') || 'Start typing to search...'}" />
      </div>`
    }

    rendered(){
      const input = this.querySelector("input");
      const detail = {
        id: this.getAttribute("id")
      };
      const eventOptions = {
        detail: detail,
        bubbles: true
      }
      this.dispatchEvent(new CustomEvent("omni-box-initializing", eventOptions))
      this.autoComplete = new AutoComplete(this, input, detail.omniBoxOptions).on("result-selected", (e) => {
        input.value = e.detail.text;
        input.closest("label").classList.add("non-empty");
      });
    }
  }
);


// pass in OmniBox options
document.addEventListener("omni-box-initializing", (e) => {
  switch(e.detail.id){
    case "countries-autocomplete":
      e.detail.omniBoxOptions = getCountryAutoComplete(); 
      break;
  }
});
