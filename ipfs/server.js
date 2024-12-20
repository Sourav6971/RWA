const express = require('express');
const multer = require('multer');
const { createHelia } = require('helia');
const { unixfs } = require('@helia/unixfs');

const app = express();
const upload = multer();
const hashmap = new Map();
let heliaNode; // Store the Helia node instance

// Create Helia node once
async function initializeHelia() {
    heliaNode = await createHelia();
    return unixfs(heliaNode);
}


app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!heliaNode) {
            const fs = await initializeHelia();
            const data = req.file.buffer;
            const cid = await fs.addBytes(data);
            hashmap.set(req.file.originalname, cid);
            res.status(201).send(`Your file has been uploaded with CID: ${cid}`);
        } else {
            const fs = unixfs(heliaNode);
            const data = req.file.buffer;
            const cid = await fs.addBytes(data);
            hashmap.set(req.file.originalname, cid);
            res.status(201).send(`Your file has been uploaded with CID: ${cid}`);
        }
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Error uploading file');
    }
});


app.get('/fetch', async (req, res) => {
    try {
        if (!heliaNode) {
            res.status(500).send('Helia node not initialized');
            return;
        }
        const fs = unixfs(heliaNode);
        const filename = req.body.filename;
        const cid = hashmap.get(filename);

        if (!cid) {
            res.status(404).send('File not found');
            return;
        }

        let text = '';
        const decoder = new TextDecoder();

        for await (const chunk of fs.cat(cid)) {
            text += decoder.decode(chunk, { stream: true });
        }

        res.status(200).send(text);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Error fetching file');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
