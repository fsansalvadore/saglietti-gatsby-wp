#!/bin/bash

# Exit if any command fails
set -e

# Run the Gatsby build
gatsby build

# Clean up problematic symlink before Netlify's postBuild hooks
rm -rf .cache/adapters/node_modules/.bin/download-msgpackr-prebuilds
