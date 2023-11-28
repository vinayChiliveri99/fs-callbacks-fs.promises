/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 

    Ensure that the function is invoked as follows: 
        fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles)
*/

const fs = require('fs').promises;
const path = require('path');

function fsProblem1(
  absolutePathOfRandomDirectory,
  randomNumberOfFiles
) {
  fs.mkdir(absolutePathOfRandomDirectory, { recursive: true })
    .then(() => {
      console.log(`created directory at the given absolute path`);

      return createAndDelete(
        absolutePathOfRandomDirectory,
        randomNumberOfFiles,
        (index = 1)
      );
    })
    .catch((err) => console.log(err));
}

function createAndDelete(pathOfDir, noOfFiles, index) {
  let randomFileName = `randomFile${index}.txt`;
  let filePath = path.join(pathOfDir, randomFileName);

  let obj = {
    name: 'random guy',
    age: 20 + index,
  };

  fs.writeFile(filePath, JSON.stringify(obj))
    .then(() => {
      console.log(`created ${randomFileName}`);

      return fs.unlink(filePath);
    })

    .then(() => {
      console.log(`deleted ${randomFileName}`);

      index++;

      if (index <= noOfFiles) {
        return createAndDelete(pathOfDir, noOfFiles, index);
      }
    })

    .catch((err) => {
      console.error(err);
    });
}

// let absolutePath =
//   '/Users/vinaychiliveri/drills/fs-callbacksPromises/folder';
// let numberOfFiles = 10;

// fsProblem1(absolutePath, numberOfFiles);

module.exports = fsProblem1;
