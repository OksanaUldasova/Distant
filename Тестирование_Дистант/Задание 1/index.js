const fs = require('fs');
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }
  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
});

