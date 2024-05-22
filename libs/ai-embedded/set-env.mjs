import { readFileSync, writeFileSync } from 'fs';
import { config } from 'dotenv';
import path from 'node:path';

config();

const environmentProdFilePath = path.resolve('./libs/ai-embedded/src/environments/environment.prod.ts');

const variableMap = {
  appUrl: 'APP_URL',
};

const updateEnvironmentFile = (filePath) => {
  let content = readFileSync(filePath, 'utf8');

  Object.keys(variableMap).forEach(key => {
    const envKey = variableMap[key];
    const value = process.env[envKey];
    if (value) {
      const regex = new RegExp(`(${key}:\\s*).*(,)`, 'g');
      content = content.replace(regex, `$1'${value}'$2`);
    }
  });

  writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
};

updateEnvironmentFile(environmentProdFilePath);
