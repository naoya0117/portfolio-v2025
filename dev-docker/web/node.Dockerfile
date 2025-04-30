FROM node:24.0-bookworm-slim

ARG UID=1000
ARG GID=1000

# 非特権ユーザのuid, gidをビルド引数から取得した値に変更
RUN groupmod -g $GID node && usermod -u $UID node \
    && chown -R $UID:$GID /home/node

COPY --chmod=755 ./bin/* /usr/local/bin/

# 非特権ユーザでアプリケーションを実行
USER $UID

WORKDIR /web

# 開発サーバを起動
CMD ["/usr/local/bin/startContainer.sh"]
