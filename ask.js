// ask.js
import { pipeline } from '@xenova/transformers';
import fs from 'fs/promises';

// Load embedded Q&A data
const data = JSON.parse(await fs.readFile('./vectors.json', 'utf8'));

// Load sentence transformer
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// Read user question from CLI
const userQuestion = process.argv[2] || 'How do I make a neckline with piping?';

// Embed the user's question
const result = await extractor(userQuestion, {
  pooling: 'mean',
  normalize: true
});
const userVector = Array.from(result.data);

// Cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, aNorm = 0, bNorm = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    aNorm += a[i] ** 2;
    bNorm += b[i] ** 2;
  }
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

// Find best match
let bestMatch = null;
let bestScore = -1;

for (const item of data) {

  const similarity = cosineSimilarity(userVector, item.vector);
  if (similarity > bestScore) {
    bestScore = similarity;
    bestMatch = item;
  }
}


// Show result
console.log(`🧵 You asked: ${userQuestion}`);
if (bestMatch) {
  console.log(`💡 Closest question: ${bestMatch.question}`);
  console.log(`🪡 Answer: ${bestMatch.answer}`);
  console.log(`🎯 Confidence: ${bestScore.toFixed(4)}`);
} else {
  console.log(`❌ No match found.`);
}
