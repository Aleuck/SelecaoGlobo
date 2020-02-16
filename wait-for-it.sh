#!/bin/bash
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  exec ./wait-for-it/wait-for-it.sh $1:$2 -t 0;
elif [[ "$OSTYPE" == "darwin"* ]]; then
  exec ./wait-for-it-darwin.sh $1 $2;
else
  echo "Unsupported OS";
  exit 1;
fi
