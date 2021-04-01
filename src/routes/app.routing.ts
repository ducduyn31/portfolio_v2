import {MyRoute} from "../interfaces/MyRoute";
import HomePage from "../pages/home/home.page";
import ProjectsPage from "../pages/projects/projects.page";

export const routes: MyRoute[] = [
    {
        path: '/home',
        component: HomePage,
    },
    {
        path: '/projects',
        component: ProjectsPage,
    },
];
