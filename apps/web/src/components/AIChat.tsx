"use client";

import { FormEvent, useState } from "react";

type AIResponse = {
  content: string;
  model: string;
};

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            temperature: 0.2,
          }),
        },
      );

      if (!result.ok) {
        throw new Error("AI request failed");
      }

      const data: AIResponse = await result.json();

      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={submit}>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask the AI something..."
          rows={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Generate"}
        </button>
      </form>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {response && (
        <article>
          <p>{response.content}</p>
          <small>Model: {response.model}</small>
        </article>
      )}
    </section>
  );
}