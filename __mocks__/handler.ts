import { endorsementsHandler } from "./handlers/endorsements.handler";
import { usersHandler } from "./handlers/users";

const handlers = [...endorsementsHandler, ...usersHandler];
export default handlers;
