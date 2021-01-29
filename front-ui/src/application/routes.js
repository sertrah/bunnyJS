import NotFoundPage from "entities/Comodin/NoFoundPage";
import TaskListByUser from "entities/Task/TaskListByUser";
import UserProfile from "entities/User/UserProfile";
import UserList from "entities/User/UserList";

import { ROUTER_PATH_LIST } from "./constants/routerPathList";

const routes = [
  {
    path: ROUTER_PATH_LIST.default,
    component: UserList,
  },
  {
    path: ROUTER_PATH_LIST.notFound,
    component: NotFoundPage,
  },
  {
    path: ROUTER_PATH_LIST.userList,
    component: UserList,
  },
  {
    path: `${ROUTER_PATH_LIST.user}/:id`,
    component: UserProfile,
  },
  {
    path: ROUTER_PATH_LIST.taskList,
    component: TaskListByUser,
  },
];

export default routes;
