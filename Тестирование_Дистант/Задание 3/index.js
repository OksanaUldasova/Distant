const fs = require('fs');
function analyzeLogFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
    }
    const lines = data.split('\n');
    const logCounts = {
      INFO: 0,
      WARNING: 0,
      ERROR: 0,
    };
    const errorMessages = [];
    const logRegex = /\[(.*?)\] \[(.*?)\] (.*)/;

    for (const line of lines) {
      if (line.trim() === '') continue;
      const match = line.match(logRegex);
      if (match) {
        const [, timestamp, type, message] = match;
        if (logCounts.hasOwnProperty(type)) {
          logCounts[type]++;
        }
        if (type === 'ERROR') {
          errorMessages.push(`[${timestamp}] ${message}`);
        }
      }
    }
    console.log('Статистика по логам:');
    for (const type in logCounts) {
      console.log(`${type}: ${logCounts[type]}`);
    }
    console.log();
    console.log('Список ошибок:');
    for (const errorMessage of errorMessages) {
      console.log(errorMessage);
    }
  });
}
analyzeLogFile('log.txt');
