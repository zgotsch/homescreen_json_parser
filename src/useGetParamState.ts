import {useEffect, useState} from "react";

export default function useGetParamState(
  paramName: string
): [string, (value: string) => void] {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const [value, setValue] = useState(params.get(paramName) ?? "");

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (value !== "") {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    url.search = params.toString();
    window.history.replaceState(null, "", url.toString());
  }, [paramName, value]);

  return [value, setValue];
}
