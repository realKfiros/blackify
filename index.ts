import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import QRCode from 'qrcode';
import glob from 'glob';

const getFiles = (src, callback): void => {
    glob(src + '/**/*.*', callback);
}

(async (): Promise<void> => {
    const answers = await inquirer.prompt([
        {
            name: 'path',
            message: 'Type the path of the directory that you want to blackify:'
        }
    ]);

    if (!fs.existsSync('./blackify'))
        fs.mkdirSync('./blackify');

    getFiles(answers.path, async (err, files) => {
        if (err) {
            console.log('Error', err);
            process.exit(1);
        }

        console.log(files);

        for (let file of files)
        {
            let data = fs.readFileSync(file, 'utf8');
            data = data.replace(/(\r\n|\n|\r|\t)/gm, '');
            const splitData = data.match(/[\s\S]{1,1000}/g) || [];

            for (let i = 0; i < splitData.length; i++)
            {
                const url = await QRCode.toDataURL(splitData[i]);
                const newUrl = url.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFileSync(`./blackify/${path.basename(file)}${i}.png`, newUrl, {encoding: 'base64'});
            }
        }

        process.exit(0);
    });
})();
