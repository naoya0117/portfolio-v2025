ARG BASE_IMAGE=debian:bookworm-slim
FROM  ${BASE_IMAGE}

USER root

# dockerクライアントのインストール
COPY --from=docker:28.2-cli /usr/local/bin/docker /usr/local/bin/docker

RUN which node || (\
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get update && \
  apt-get install -y nodejs \
  )

ARG UID=1000
ARG GID=1000

# 非特権ユーザの設定
RUN (getent passwd ${UID} && /usr/sbin/userdel -r $(getent passwd ${UID} | cut -d: -f1) || true) && \
  (getent group ${GID} || groupadd -g ${GID} nonroot) && \
  /usr/sbin/useradd -u ${UID} -g ${GID} -m -s /bin/bash nonroot

ARG DOCKER_GID=2375

# 非特権ユーザにDockerへのアクセス権限を与える
RUN (getent group ${DOCKER_GID} || /usr/sbin/groupadd -g ${DOCKER_GID} docker) && \
  /usr/sbin/usermod -aG $(getent group ${DOCKER_GID} | cut -d: -f1) nonroot

USER nonroot

ENV PATH="/home/nonroot/.npm-global/bin:${PATH}"

RUN  npm config set prefix '~/.npm-global' && \
  npm install -g @anthropic-ai/claude-code

RUN  claude mcp add playwright -- docker run -i --rm mcp/playwright
