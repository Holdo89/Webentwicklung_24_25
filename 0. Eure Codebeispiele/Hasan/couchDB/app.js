const nano = require('nano')('http://admin:passme@localhost:5984');
const db = nano.db.use('tiere');

(async () => {
  try {
    const allDocs = await db.list({ include_docs: true });
    console.log('📋 Tiere aus der Datenbank:');
    allDocs.rows.forEach(row => {
      const doc = row.doc;
      console.log(`• ${doc.tierart}: ${doc.tiername}`);
    });
  } catch (err) {
    console.error('Fehler beim Abrufen:', err);
  }

  
})();
