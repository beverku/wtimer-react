# wtimer-react
Workout timer using ReactJS


# Develop
```npm run dev```

# Production
```npm start```

# Production Docker
```
docker kill wtimer-react-web
docker rm wtimer-react-web
docker build -t wtimer-react:{version}
docker run -d -p 8000:8000 --restart=unless-stopped --name wtimer-react-web wtimer-react
```
