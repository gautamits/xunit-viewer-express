FROM node AS builder

# Create app directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY .  .

FROM node
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/views ./views
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/config.js ./config.js
CMD ["node","index.js"]