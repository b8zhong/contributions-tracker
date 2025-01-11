const axios = require('axios');
const fs = require('fs');
const path = require('path');

function getGraphQLHeaders() {
  return {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

module.exports = { getGraphQLHeaders};