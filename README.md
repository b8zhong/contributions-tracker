# Contribution Tracker for Work Commits

[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#) [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Example Contributions](assets/example-contributions.png)

> Maybe your company requires you to follow strict security policies or use a specific email address for work contributions. Maybe you're concerned about accidentally exposing sensitive company information by using your personal account. Or perhaps you simply want to keep your work and personal contributions separate.

Automate the tracking of another user's (e.g., your work account's) commits by creating corresponding commits in your personal repository to maintain an accurate contribution graph.

---

## Features

- **Automated Tracking**: Schedules daily checks for commits in your work account.
- **Ghost Commits**: Mirrors contributions in your personal repository without linking sensitive data from your work account.
- **Secure**: Relies on GitHub Actions secrets for safe authentication.

> **Note**:
> This application only handles commits. If you have more pull requests, issues, or code reviews, only commits will appear on the activity overview.

---

## Prerequisites

- **Node.js**: Ensure Node.js v18 or higher is installed.
- **GitHub Personal Access Tokens (PATs)**: Required for both your work and personal accounts.
- **Enable Private Contributions**: Ensure that private contributions are visible on your work account's GitHub profile (Settings > Profile > Contribution settings).
  
---

## Setup

### 1. Fork the Repository

1. Fork the repository to your GitHub account.

### 2. Set Up GitHub Actions Secrets

Go to your forked repository on GitHub and navigate to:
**Settings > Secrets and variables > Actions > New repository secret**.

Add the following secrets:

| Secret Name            | Description                                            |
|------------------------|--------------------------------------------------------|
| `WORK_GITHUB_TOKEN`    | Personal Access Token (PAT) for your work account.     |
| `WORK_GITHUB_USERNAME` | Username for your work GitHub account.                 |
| `GITHUB_TOKEN`         | Personal Access Token (PAT) for your personal account. |
### 3. Enable Private Contributions (Optional)

If your work repository is private, ensure private contributions are enabled on your work account:
1. Go to **Settings > Profile > Contribution settings** on your work account.
2. Check the box for **"Include private contributions on my profile"**.

---

Once these steps are complete, the workflow will automatically run daily to track and mirror contributions. No further local setup is required unless you want to customize things yourself.

## Usage

### Automated Runs
- The workflow automatically tracks contributions daily and pushes commits to your personal repository.

### Manual Trigger
- You can manually trigger the workflow via the Actions tab on GitHub.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements. Planned features include support for tracking contributions from other platforms like GitLab.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
