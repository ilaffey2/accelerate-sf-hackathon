"use client";

import { useState, useCallback } from "react";

type QueryStep = {
  summary?: string;
  table?: string;
  sql?: string;
};

export async function postRaw(
  url: string,
  question: string,
  options?: RequestInit
) {
  console.log("posting raw");
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
    ...options,
  });
}

export function useStreamingQuery() {
  const [querySteps, setQuerySteps] = useState<QueryStep[]>([{}]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleTranslate = useCallback(async (question: string) => {
    try {
      setIsLoading(true);
      const response = await postRaw(
        "https://hermit-sharp-bengal.ngrok-free.app/query",
        question
      );
      const reader = response.body!.getReader();

      const decoder = (chunk: any) => {
        const d = new TextDecoder();
        return d.decode(chunk, { stream: true });
      };

      let result = [{}];

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) {
          setIsLoading(false);
          break;
        }

        result = [...result, decoder(value)];
        setQuerySteps(result);
      }
    } catch (e: any) {
      setError(e);
    }
  }, []);

  return { querySteps, trigger: handleTranslate, isLoading, error };
}
