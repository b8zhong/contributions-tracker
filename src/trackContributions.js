const axios = require('axios');
const fs = require('fs');
const { createCommit } = require('./createCommit');

const GITHUB_API_URL = 'https://api.github.com/graphql';
const WORK_GITHUB_TOKEN = process.env.WORK_GITHUB_TOKEN;
const WORK_GITHUB_USERNAME = process.env.WORK_GITHUB_USERNAME;

async function trackContributions() {
  const lastTrackedPath = './state/last_tracked.json';
  let lastTrackedState = {};
  if (fs.existsSync(lastTrackedPath)) {
    lastTrackedState = JSON.parse(fs.readFileSync(lastTrackedPath, 'utf-8'));
  }

  const query = `
  {
    user(login: "${WORK_GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
  `;

  try {
    const response = await axios.post(
        GITHUB_API_URL,
        { query },
        { headers: { Authorization: `Bearer ${WORK_GITHUB_TOKEN}` } }
    );

    const contributions =
        response.data.data.user.contributionsCollection.contributionCalendar.weeks;

    let commitsToCreate = [];

    contributions.forEach((week) => {
      week.contributionDays.forEach((day) => {
        const { date, contributionCount } = day;

        if (
            contributionCount > 0 &&
            (!lastTrackedState[date] || lastTrackedState[date] < contributionCount)
        ) {
          const newCommits = contributionCount - (lastTrackedState[date] || 0);
          commitsToCreate.push({ date, count: newCommits });
        }
      });
    });

    console.log(`Found ${commitsToCreate.length} days with contributions to track.`);
    console.log('Commits to create:', commitsToCreate);

    if (commitsToCreate.length > 0) {
      await createCommit(commitsToCreate);
    } else {
      console.log('No new contributions to track.');
    }

    commitsToCreate.forEach(({ date, count }) => {
      lastTrackedState[date] = (lastTrackedState[date] || 0) + count;
    });
    fs.writeFileSync(lastTrackedPath, JSON.stringify(lastTrackedState, null, 2));
  } catch (error) {
    console.error('Error fetching contributions:', error);
  }
}

trackContributions();