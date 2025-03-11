const fs = require('fs');
fs.readFile('data.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }
  const lines = data.split('\n');
  const headers = lines[0].split(',');
  const users = [];
  for (let i = 1; i < lines.length; i++) { 
    const values = lines[i].split(',');
    if (values.length === headers.length) {
        const user = {};
        for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim(); 
            const value = values[j].trim();    
            user[header] = (header === 'age') ? parseInt(value) : value; 
        }
        users.push(user);
    }
  }
  users.sort((a, b) => a.age - b.age); 
  console.log(JSON.stringify(users, null, 2));
});

