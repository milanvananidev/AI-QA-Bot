# 🧵 AI Q&A Bot (POC)

This is a **Proof-of-Concept (POC)** for a simple AI chatbot that answers stitching-related questions using sentence embeddings and cosine similarity.

Built with [@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers) and runs fully in Node.js. No server, no external API calls. Just raw vectors and some math ✌️

---

## 📀 Setup

```bash
git clone https://github.com/milanvananidev/AI-QA-Bot.git
cd vector-embeddings
npm install @xenova/transformers
```

Make sure your `package.json` has `"type": "module"` or things will break 💨

---

## 📦 Files

- `data.json` — your raw Q&A list
- `embed.js` — creates vectors and saves to `vectors.json`
- `ask.js` — runs your question and finds the closest match
- `vectors.json` — auto-generated embeddings

---

## ✨ Usage

### 1. Embed your Q&A

```bash
node embed.js
```

This reads `data.json` and saves embeddings to `vectors.json`

---

### 2. Ask a question

```bash
node ask.js "How to make a piping neckline?"
```

Sample output:

```
🧵 You asked: How to make a piping neckline?
💡 Closest question: What is the process of making a piping neckline?
�� Answer: Cut a bias strip, fold it in half, and stitch it around the neckline edge.
🎯 Confidence: 0.9374
```

---

## 🧠 How it works

- Embeds your data using `Xenova/all-MiniLM-L6-v2`
- Embeds the user’s question
- Compares them using cosine similarity
- Returns the closest one

---

## ⚠️ POC Notes

- English only for now — multilingual support coming later
- Not optimized for scale
- Good for testing, not prod

---

## ✨ Coming Soon?

- Hindi model fine-tuning (or switch to a multilingual model)
- Web/Mobile UI
- Vector DB for speed

---

## 👋 License

MIT. Use it, remix it, stitch it.

