#!/bin/bash

year=2021;

# Get this from 'session' cookie in Chrome devtools
export $(egrep -v '^#' .env | xargs)

directory=$(printf "%02d" $1)

# Create directory and empty source files
mkdir -p ./$directory
cp ./template.js ./$directory/index.js
touch ./$directory/instructions.txt

# Get input
curl "https://adventofcode.com/$year/day/$1/input" -H "cookie: session=$COOKIE" -o "./$directory/input.txt" 2>/dev/null
