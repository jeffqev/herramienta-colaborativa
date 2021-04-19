FROM node:15.8.0-alpine AS node-build

ARG REACT_APP_RICHTEXT_KEY
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

ENV REACT_APP_RICHTEXT_KEY="$REACT_APP_RICHTEXT_KEY"
RUN npm run build

FROM socialengine/nginx-spa
COPY --from=node-build /app/build/ /app