FROM node:24.4-bookworm-slim

ARG UID=1000
ARG GID=1000

RUN getent group ${GID} || groupadd -g ${GID} nonroot && \
  getent passwd ${UID} && /usr/sbin/userdel -r $(getent passwd ${UID} | cut -d: -f1) || \
  /usr/sbin/useradd -u ${UID} -g ${GID} -m -s /bin/bash nonroot

RUN mkdir /.npm && chown ${UID}:${GID} /.npm

USER nonroot
WORKDIR /www
