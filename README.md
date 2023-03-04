## Automatically log your time in Clockify

There is no build step, clone the repo and install dependencies:

```
git clone git@github.com:adrianfaciu/trackify.git
yarn install
```

Script can be run with:

```
yarn start
```

The script will check if it should add a time entry for today. 
It will not add one if it's weekend, if you are in vacation or if it's a public holiday.
If none of the above are true, it will add a time entry from 9 to 5, for the specified project.


How to use:

1. Generate an API key from your profile -> https://app.clockify.me/user/settings
2. Update config.json with this data, inside the API_KEY property
3. Update the PROJECT_NAME property with the name of the project you want to log time for
4. If needed, add/update the values inside the VACATION property
5. Running the script, will add a log entry from 9 to 5, for the current day

Scheduling this to run daily can be done in different ways, depending on operating system and how complex you need it to be.
One option is to use Task Till Dawn app -> https://www.oliver-matuschin.de/en/downloads/freeware-task-till-dawn
