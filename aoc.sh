#!/bin/bash

year=2021;

# Get this from 'session' cookie in Chrome devtools
cookie=53616c7465645f5f6e1a467b7b454a846908f1f3ef3e34f5b6190cb06b2e6a04438adfe99dea7ada7fe3d84fdbd29c8c;

directory=$(printf "%02d" $1)

# Create directory and empty source files
mkdir -p ./$directory
touch ./$directory/part1.js
touch ./$directory/part2.js
touch ./$directory/instructions.txt

# Get input
curl "https://adventofcode.com/$year/day/$1/input" -H "cookie: session=$cookie" -o "./$directory/input.txt" 2>/dev/null
