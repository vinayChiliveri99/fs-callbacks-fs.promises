/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require('fs').promises;

const path = 'lipsum.txt';

function problem2(path) {
  // 1. Read the given file lipsum.txt

  fs.readFile(path, 'utf-8')

    .then((data) => {
      // console.log(data);
      console.log(`Read the ${path}`);

      // 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

      const UpperCase = data.toUpperCase();

      fs.writeFile('lipsumUpperCase.txt', UpperCase);
    })
    .then(() => {
      console.log('Created lipsumUpperCase text file');

      fs.writeFile('./filenames.txt', 'lipsumUpperCase.txt', 'utf-8');
    })
    .then(() => {
      console.log(
        'filenames.txt is created and lipsumUpperCase name is added to it.'
      );
      // 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

      const UpperCasedata = fs.readFile(
        'lipsumUpperCase.txt',
        'utf-8'
      );
      return UpperCasedata;
    })
    .then((data) => {
      const lowercaseSentences = data
        .toLowerCase()
        .split('. ')
        .join('\n');

      fs.writeFile(
        './lipsumLowerCaseSentences.txt',
        lowercaseSentences,
        'utf-8'
      );
    })
    .then((data) => {
      console.log('Created lipsumLowerCaseSentences text file');

      fs.appendFile(
        './filenames.txt',
        '\n' + 'lipsumLowerCaseSentences.txt',
        'utf-8'
      );
    })
    .then(() => {
      console.log(
        'lipsumLowerCaseSentences name is added to filenames.txt.'
      );

      // 4.  Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt.

      return fs.readFile('./filenames.txt', 'utf-8');
    })
    .then((data) => {
      const filePaths = data.split('\n');

      let totalContent = [];
      let finalData;

      let count = 0;

      for (let i = 0; i < filePaths.length; i++) {
        fs.readFile(filePaths[i], 'utf-8')
          .then((data) => {
            let content = data
              .split(' ')
              .filter((element) => element != '');

            totalContent = [...totalContent, ...content];

            count++;

            if (count === filePaths.length) {
              finalData = totalContent.sort().join('\n');

              return fs.writeFile(
                './lipsumSorted.txt',
                finalData,
                'utf-8'
              );
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .then(() => {
      console.log('Created lipsumSorted text file');

      fs.appendFile(
        './filenames.txt',
        '\n' + 'lipsumSorted.txt',
        'utf-8'
      );
    })
    .then(() => {
      console.log('lipsumSorted name is added to filenames.txt.');

      // 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

      const content = fs.readFile('./filenames.txt', 'utf-8');
      return content;
    })
    .then((data) => {
      const filePaths = data.toString().split('\n');

      function readAndDelete(filePaths, index, length) {
        fs.unlink(filePaths[index])
          .then(() => {
            console.log(`deleted ${filePaths[index]}`);
            index++;

            if (index < length) {
              readAndDelete(filePaths, index, length);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

      readAndDelete(filePaths, (index = 0), filePaths.length);
    })
    .catch((err) => {
      console.error(err);
    });
}

// problem2(path);

module.exports = problem2;
