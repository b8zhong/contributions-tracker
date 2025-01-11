const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function runCommand(command) {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    console.log(`Command: ${command}`);
    console.log(`Output: ${output}`);
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    throw error;
  }
}

async function createCommit(commitsToCreate) {
  try {
    const dummyFilePath = path.resolve(__dirname, '../dummy.txt');

    if (!fs.existsSync(dummyFilePath)) {
      fs.writeFileSync(dummyFilePath, '');
      console.log('dummy.txt created as it was not found.');
    }

    for (const { date, count } of commitsToCreate) {
      for (let i = 0; i < count; i++) {
        console.log(`Creating commit ${i + 1} for date ${date}`);

        fs.appendFileSync(dummyFilePath, `Commit on ${date} #${i + 1}\n`);

        console.log('Staging changes...');
        runCommand('git add dummy.txt state/last_tracked.json');

        console.log('Creating commit...');
        runCommand(
            `GIT_AUTHOR_DATE="${date}T12:00:00" GIT_COMMITTER_DATE="${date}T12:00:00" git commit -m "Automated ghost commit for ${date}"`
        );
      }
    }

    console.log('Pushing changes to the remote repository...');
    runCommand('git push origin main');
    console.log('All commits pushed successfully!');
  } catch (error) {
    console.error('Error during commit creation:', error.message);
    throw error;
  }
}

module.exports = { createCommit };