## Automatically log your time in Clockify

There is no build step, clone the repo and install dependencies:

```
git clone URL
yarn install
```

Script can be run with:

```
yarn start
```

How to use:

1. Generate an API key from your profile -> https://app.clockify.me/user/settings
2. Update config.json with this data, inside the API_KEY property
3. Update the PROJECT_NAME property with the name of the project you want to log time for
4. If needed, add/update the values inside the VACATION property
5. Running the script, will add a log entry from 9 to 5, for the current day

Scheduling this to run daily can be done in
