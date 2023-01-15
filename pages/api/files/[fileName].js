const { readdir, readFile, writeFile, unlink,  } = require('fs').promises;
const { join } = require('path');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { fileName } = req.query;
        if (!fileName.includes('.md')) {
            return res.status(404).json({message: 'Wrong file name!'})
        }
        const filePath = join(process.cwd(), 'data', `${fileName}`);
        try {
            const fileContent = await readFile(filePath, 'utf-8');
            return res.status(200).json({fileContent})
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({message: 'File doesn\'t exist!'})
            }
            return res.status(404).json({message: err.code})
        }
    }

    if (req.method === 'PUT') {
        const { fileName } = req.query;
        const { fileContent } = JSON.parse(req.body);
        const filePath = join(process.cwd(), 'data', `${fileName}`);
        await writeFile(filePath, fileContent)
        return res.status(201).json({message: `File ${fileName} succesfully updated!`, fileName})
    }

    if (req.method === 'DELETE') {
        const { fileName } = req.query;
        if (!fileName || fileName === '') {
            return res.status(403).json({message: 'File name is empty'})
        }
        if (!fileName.includes('.md')) {
            return res.status(404).json({message: 'Wrong file name!'})
        }
        const filePath = join(process.cwd(), 'data', `${fileName}`);
        try {
            await unlink(filePath)
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({message: 'File doesn\'t exist!'})
            }
            return res.status(404).json({message: err.code})
        }
        return res.status(200).json({message: `File ${fileName} successfully removed!`})
    }
    res.status(404).json({message: 'Something went wront! Choose correct method or file name'})
}