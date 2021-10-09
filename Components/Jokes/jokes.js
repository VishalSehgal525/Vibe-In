const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const NEW_QUOTE = "new_quote";

const newQuote = (data) => ({
  type: NEW_QUOTE,
  data,
});

const defaultState = {
  quote: "",
  author: "",
  image: "",
  left: true,
};

const quoteReducer = (state = defaultState, action) => {
  console.warn(action);
  switch (action.type) {
    case NEW_QUOTE:
      return action.data;
    default:
      return state;
  }
};

const store = Redux.createStore(quoteReducer);

const App = () => {
  return React.createElement(
    "main",
    { id: "main" },
    React.createElement(AppName, null),
    React.createElement(QuoteBoxConnected, null)
  );
};

const AppName = () => {
  return React.createElement("div", { id: "head" }, "Simpsons said...");
};

const QuoteBox = (props) => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(async () => {
    const data = await fetchData();
    props.getNewQuote(data);
  }, []);
  const handleNewQuote = async () => {
    props.getNewQuote(defaultState);
    const data = await fetchData();
    props.getNewQuote(data);
  };
  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(
      "https://thesimpsonsquoteapi.glitch.me/quotes"
    ).then((response) => response.json());
    console.log(data);
    setLoading(false);
    return {
      quote: data[0].quote,
      image: data[0].image,
      author: data[0].character,
      left: data[0].characterDirection === "Right" ? false : true,
    };
  };
  getTwitterLink = () => {
    return (
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + props.quote + '" ' + props.author)
    );
  };
  console.log(props);
  return React.createElement(
    "div",
    { id: "quote-box" },
    React.createElement(
      "div",
      { id: "quote", class: props.left ? "left" : "right" },
      React.createElement("img", {
        id: "author-img",
        src: props.image,
      }),
      React.createElement(
        "div",
        { style: { flex: 1 } },
        React.createElement(
          "div",
          { id: "text" },
          loading ? "Thinking..." : props.quote
        ),
        React.createElement(
          "div",
          { id: "author" },
          loading ? "Wait!" : props.author
        )
      )
    ),

    React.createElement(
      "div",
      { id: "control" },
      React.createElement(
        "a",
        {
          id: "tweet-quote",
          target: "_top",
          href: getTwitterLink(),
        },
        React.createElement("i", { class: "fab fa-twitter" })
      ),

      React.createElement(
        "button",
        { onClick: handleNewQuote, id: "new-quote" },
        "New Joke"
      )
    )
  );
};
const QuoteBoxConnected = connect(
  (state) => {
    console.log(state);
    return state;
  },
  (dispatch) => {
    return {
      getNewQuote: (data) => {
        dispatch(newQuote(data));
      },
    };
  }
)(QuoteBox);

ReactDOM.render(
  React.createElement(
    Provider,
    { store: store },
    React.createElement(App, null)
  ),
  document.getElementById("root")
);
