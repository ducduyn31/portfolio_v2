import React from "react";

export interface MyRoute {
    path: string;
    component: React.FC<{ routes: any }>;
    routes?: MyRoute[]
}
