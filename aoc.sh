#!/bin/bash

year=2021;

# Export environment variables
export $(egrep -v '^#' .env | xargs)

# Create directory and file stubs
directory=$(printf "%02d" $1)
mkdir -p ./$directory
cp ./template.js ./$directory/index.js
touch ./$directory/instructions.txt

# Get input
curl "https://adventofcode.com/$year/day/$1/input" -H "cookie: session=$COOKIE" -o "./$directory/input.txt" 2>/dev/null
