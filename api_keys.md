# Hiding API keys in Node and React

-   create .env file and add it to .gitignore
-   set the variables in .env file:

```
WEATHER_API_KEY=your_api_key
WEATHER_API_URL=your_api_url
```

    -   no surounding quotes and no spaces allowed

-   to use the variables in your code:

```
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;
```

-   React variables must be prefixed with REACT*APP*

```
REACT_APP_WEATHER_API_KEY=your_api_key
REACT_APP_WEATHER_API_URL=your_api_url
```

-   to add to Netlify:

    -   go the Netlify site overview
    -   go to deploys/deploy settings
    -   in Build and deploy section, select environment
    -   add the variables to the environment variables
    -   save and trigger a new deploy

-   to add to Heroku:

```
heroku config:set WEATHER_API_KEY=your_api_key
heroku config:set WEATHER_API_URL=your_api_url
```
