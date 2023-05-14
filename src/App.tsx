import "./App.css";

const response = {
  word: "hello",
  phonetic: "həˈləʊ",
  phonetics: [
    {
      text: "həˈləʊ",
      audio:
        "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
    },
    {
      text: "hɛˈləʊ",
    },
  ],
  origin: "early 19th century: variant of earlier hollo ; related to holla.",
  meanings: [
    {
      partOfSpeech: "exclamation",
      definitions: [
        {
          definition: "used as a greeting or to begin a phone conversation.",
          example: "hello there, Katie!",
          synonyms: [],
          antonyms: [],
        },
      ],
    },
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition: "an utterance of ‘hello’; a greeting.",
          example: "she was getting polite nods and hellos from people",
          synonyms: [],
          antonyms: [],
        },
      ],
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition: "say or shout ‘hello’.",
          example: "I pressed the phone button and helloed",
          synonyms: [],
          antonyms: [],
        },
      ],
    },
  ],
};
function App() {
  const { word, phonetics, origin, meanings } = response;
  return (
    <>
      <div className="header">
        <h1>Dictionary</h1>
        <form className="search-form" action="#" method="get">
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Enter a word..."
          />
          <button type="submit">Go</button>
        </form>
      </div>
      <div className="container">
        <h1 className="word">{word}</h1>
        <div className="pronunciation">
          {phonetics.map(({ text, audio }) => (
            <>
              <div className="text">{text}</div>
              {audio && (
                <div className="audio">
                  <audio src={audio} controls={true} />
                </div>
              )}
            </>
          ))}
        </div>
        <div className="origin">
          <h2>Origin</h2>
          <p>{origin}</p>
        </div>
        <div className="meanings">
          {meanings.map(({ partOfSpeech, definitions }) => (
            <div className="meaning">
              <h2>{partOfSpeech}</h2>
              {definitions.map(
                ({ definition, example, synonyms, antonyms }) => (
                  <div className="definition">
                    <p className="def">{definition}</p>
                    {example && (
                      <p className="example">
                        <strong>Example: </strong>
                        {example}
                      </p>
                    )}
                    {synonyms && (
                      <p className="synonyms">
                        <strong>Synonyms: </strong>
                        {synonyms}
                      </p>
                    )}
                    {antonyms && (
                      <p className="antonyms">
                        <strong>Antonyms: </strong>
                        {antonyms}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
