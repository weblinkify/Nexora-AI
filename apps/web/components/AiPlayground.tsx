"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_AI_RESPONSE } from "@/graphql/mutations";

export function AiPlayground() {
  const [prompt, setPrompt] = useState("");

  const [generateResponse, { data, loading, error }] =
    useMutation(GENERATE_AI_RESPONSE);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    await generateResponse({
      variables: {
        input: prompt
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h2 className="text-xl font-semibold">
          AI Playground
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Send a prompt to the backend AI service.
        </p>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask the AI something..."
          rows={8}
          className="mt-6 w-full resize-none rounded-xl border border-white/10 bg-slate-950 p-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
        />

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Response"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error.message}
          </p>
        )}
      </form>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">
          AI Response
        </h2>

        {!data && !loading && (
          <div className="mt-6 rounded-xl bg-black/20 p-5 text-sm text-slate-500">
            Your AI response will appear here.
          </div>
        )}

        {loading && (
          <div className="mt-6 rounded-xl bg-black/20 p-5 text-sm text-slate-400">
            AI is processing your request...
          </div>
        )}

        {data && (
          <div className="mt-6 rounded-xl bg-black/20 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
              {data.generateAiResponse.content}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs text-slate-500">
                Model: {data.generateAiResponse.model}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Tokens: {data.generateAiResponse.tokensUsed}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
