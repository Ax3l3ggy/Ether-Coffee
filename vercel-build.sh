#!/bin/bash

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install --bin-dir $HOME/.local/bin --install-dir $HOME/.aws-cli
export PATH=$HOME/.local/bin:$PATH

# Get CodeArtifact token
export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain scale --domain-owner 307185671274 --query authorizationToken --output text)

# Install dependencies and build
yarn install && yarn build
