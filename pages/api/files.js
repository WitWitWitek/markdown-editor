const { readdir, readFile, writeFile, unlink } = require('fs').promises;
const { join } = require('path');
const FILE_NAME_REGEX = /^\s|\s|[\\/:*?”<>|]/gi
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const result = await readdir('./data')
        return res.status(200).json({data: result})
    }

    if (req.method === 'POST') {
        const filesList = await readdir('./data')
        const { fileName, fileContent } = JSON.parse(req.body);
        const fileNameValidated = fileName.replace(FILE_NAME_REGEX, '_')
        if (filesList.length >= 30) {
            return res.status(403).json({message: 'Operation resticted. Maximum amount of files is 30.'})
        }
        if (!fileName.split('.')[0] || fileName.split('.')[0] === '') {
            return res.status(403).json({message: 'File name is empty'})
        }
        const filePath = join(process.cwd(), 'data', `${fileNameValidated}`);
        await writeFile(filePath, fileContent)
        return res.status(201).json({message: `File ${fileNameValidated} succesfully created!`, fileName: fileNameValidated})
    }
}