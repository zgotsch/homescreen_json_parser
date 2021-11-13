import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import "./App.css";
import useGetParamState from "./useGetParamState";
import {useMemo, useState} from "react";
import ReactPrismjs from "@uiw/react-prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";

function App() {
  const [value, setValue] = useGetParamState("test");
  const [error, setError] = useState<null | string>(null);

  const formatted = useMemo(() => {
    try {
      const formatted = prettier.format(value, {
        parser: "json",
        plugins: [parserBabel],
      });
      setError(null);
      return formatted;
    } catch (e) {
      setError((e as any).message);
      console.log(e);
      return null;
    }
  }, [value]);

  return (
    <div className="root">
      <div className="json-input">
        <div className="explanation">Paste your JSON here...</div>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="json-output">
        <div className="explanation">And see it formatted here!</div>
        {error != null ? (
          <div className="json-parse-error">
            <div>JSON parse error!</div>
            <pre>{error}</pre>
          </div>
        ) : null}
        <ReactPrismjs
          className="formatted-display"
          language="json"
          source={formatted ?? ""}
        />
      </div>
    </div>
  );
}

export default App;
