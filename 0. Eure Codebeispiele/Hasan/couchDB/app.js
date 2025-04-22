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


  (async () => {
    try {
      const newTier = {
        tierart: 'Elefant',
        tiername: 'Dumbo'
      };
  
      const response = await db.insert(newTier);  
      console.log(`Neues Tier gespeichert: ${response.id}`);
    } catch (error) {
      console.error('Fehler beim Hinzufügen:', error);
    }
  })();
  

  
  (async () => {
    try {
      const docId = '61f7256776ef2a020c472c445c00c8f1'; 
      const doc = await db.get(docId); 
  
     
      const response = await db.destroy(doc._id, doc._rev);
      console.log(`🗑️ Dokument mit ID "${docId}" wurde gelöscht.`);
    } catch (error) {
      console.error('❌ Fehler beim Löschen des Dokuments:', error);
    }
  })();