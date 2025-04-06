// embed.js
import { pipeline } from '@xenova/transformers';
import fs from 'fs/promises';

const data = JSON.parse(await fs.readFile('./data.json', 'utf8'));

const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
  );
  


// Create embeddings
const embedded = [];

for (const item of data) {
  const output = await extractor(item.question, {
    pooling: 'mean',
    normalize: true
  });


  embedded.push({
    question: item.question,
    answer: item.answer,
    vector: Array.from(output.data)
  });
}

// Save embeddings to vectors.json
await fs.writeFile('./vectors.json', JSON.stringify(embedded, null, 2));
console.log('✅ Embeddings saved to vectors.json');
