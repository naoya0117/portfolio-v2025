#!/bin/env bash

# 依存関係のインストール
[ ! -d "node_modules" ] && npm i -D

# 開発サーバの起動
npm run dev
