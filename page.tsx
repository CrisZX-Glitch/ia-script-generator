'use client';

import { useState } from 'react';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedUI, setSelectedUI] = useState('fluent'); // default
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const uiOptions = [
    { value: 'fluent', label: 'Fluent UI (moderna)' },
    { value: 'kavo', label: 'Kavo UI' },
    { value: 'linoria', label: 'Linoria' },
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'drawing', label: 'Drawing API (ESP sem GUI)' },
    { value: 'none', label: 'Sem GUI (código puro)' },
  ];

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert('Coloque sua chave ZXScript e o prompt!');
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          uiLib: selectedUI,
          apiKey: apiKey,
        }),
      });

      const data = await res.json();
      if (data.script) {
        setResult(data.script);
      } else {
        setResult('Erro: ' + (data.error || 'Tente novamente'));
      }
    } catch (err) {
      setResult('Erro de conexão. Verifique sua chave.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-2xl font-black">
              ZX
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">ZXScript</h1>
          </div>
          <p className="text-zinc-400 text-sm">Gerador de Scripts Luau com IA • 2026</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Crie scripts Luau em segundos</h2>
          <p className="text-xl text-zinc-400">Fly, ESP, Aimbot, GUI, Auto-Farm... tudo com IA</p>
        </div>

        {/* Input da chave */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2">Sua Chave ZXScript</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="zx-abc123xyz... (10 créditos grátis ou assinatura)"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-lg focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Select de UI */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Escolha a UI (padrão)</label>
          <select
            value={selectedUI}
            onChange={(e) => setSelectedUI(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-lg focus:outline-none focus:border-violet-500"
          >
            {uiOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-zinc-500 mt-1">Ou descreva outra UI no prompt abaixo</p>
        </div>

        {/* Prompt */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2">O que você quer no script?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Faça um fly + noclip + speed com GUI Fluent, adicione ESP box e tracers"
            rows={5}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-violet-500 resize-y"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 py-4 rounded-2xl text-xl font-semibold disabled:opacity-50 transition"
        >
          {isLoading ? 'Gerando script com IA...' : 'Gerar Script com ZXScript'}
        </button>

        {/* Resultado */}
        {result && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Script Gerado</h3>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-1 rounded-lg"
              >
                Copiar Código
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl overflow-auto text-sm font-mono leading-relaxed text-emerald-300 whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-zinc-500 text-sm border-t border-zinc-800">
        ZXScript © 2026 • Feito com Grok + Next.js • Uso comercial permitido no Netlify Free
      </footer>
    </div>
  );
            }
