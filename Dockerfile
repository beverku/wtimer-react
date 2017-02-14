#FROM node:6.9.5
FROM armhf/node:6.9.5
MAINTAINER Ryan Bever


WORKDIR /usr/src/app

# Expose the app port
ENV PORT=8000
EXPOSE 8000

# Set the default app start command
CMD npm start

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Build the app
COPY . /usr/src/app
RUN npm run build
