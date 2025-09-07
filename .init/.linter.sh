#!/bin/bash
cd /home/kavia/workspace/code-generation/noorvaan-candle-e-commerce-platform-72426-72482/noorvaan_web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

