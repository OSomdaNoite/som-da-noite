const express = require('express');
const Archive = require('../../models/Archives');
const { getArchive } = require('../../controllers/ArchivesControllers');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const archives = await getArchive(Archive);
    res.json(archives);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar arquivos' });
  }
});

module.exports = router;