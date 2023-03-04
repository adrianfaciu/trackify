import Clockify, {
  WorkspaceType,
  ProjectType,
  NewTimeEntryType,
} from "clockify-ts";
import {
  addHours,
  compareAsc,
  isWeekend,
  startOfToday,
  addDays,
} from "date-fns";

import config from "../config.json";

const clockify = new Clockify(config.API_KEY);

async function main() {
  if (!shouldLogTimeEntry()) {
    process.exit(0);
  }

  const { userWorkspace, userProject } = await getWorkspaceAndProject();
  await logTime(userWorkspace, userProject);

  console.log("Logged time entry");
}

main();

function logTime(workspace: WorkspaceType, project: ProjectType) {
  const timeEntry: NewTimeEntryType = {
    start: addHours(startOfToday(), 9),
    end: addHours(startOfToday(), 17),
    projectId: project.id,
    description: "",
    tagIds: [],
    taskId: "",
  };

  return clockify.workspace.withId(workspace.id).timeEntries.post(timeEntry);
}

function shouldLogTimeEntry() {
  if (isWeekend(new Date())) {
    console.warn("No log because it's weekend");
    return false;
  }

  const isHoliday = config.PUBLIC_HOLIDAYS.some(
    (holiday) => compareAsc(new Date(holiday.date), new Date()) === 0
  );
  if (isHoliday) {
    console.warn("No log because it's holiday");
    return false;
  }

  const isVacation = config.VACATION.some((vacation) => {
    const vacationStartDate = new Date(vacation.date);
    return (
      compareAsc(new Date(), vacationStartDate) >= 0 &&
      compareAsc(new Date(), addDays(vacationStartDate, vacation.duration)) <= 0
    );
  });
  if (isVacation) {
    console.warn("No log because you are on vacation");
    return false;
  }

  return true;
}

async function getWorkspaceAndProject() {
  const workspaces = await clockify.workspace.get();
  const userWorkspace = workspaces.find(
    (proj) => proj.name.toLowerCase() === config.WORKSPACE_NAME.toLowerCase()
  );

  if (!userWorkspace) {
    console.warn("Invalid workspace name");
    process.exit(1);
  }

  const projects = await clockify.workspace
    .withId(userWorkspace.id)
    .projects.get();
  const userProject = projects.find(
    (proj) => proj.name.toLowerCase() === config.PROJECT_NAME.toLowerCase()
  );

  if (!userProject) {
    console.warn("Invalid project name");
    process.exit(1);
  }

  return { userWorkspace, userProject };
}
