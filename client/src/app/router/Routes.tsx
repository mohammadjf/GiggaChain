import {createBrowserRouter, Navigate} from "react-router";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import TestErrors from "../../features/errors/TestErrors.tsx";
import ClientErrorPage from "../../features/errors/ClientErrorPage.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		errorElement: <ClientErrorPage/>,
		children: [
			{path: '', element: <HomePage/>},
			{path: 'activities', element: <ActivityDashboard/>},
			{path: 'createActivity', element: <ActivityForm key='create'/>},
			{path: 'manage/:id', element: <ActivityForm/>},
			{path: 'activities/:id', element: <ActivityDetailPage/>},
			{path: 'errors', element: <TestErrors/>},
			{path: 'not-found', element: <NotFound/>},
			{path: 'server-error', element: <ServerError/>},
			{path: '*', element: <Navigate replace to='/not-found'/>},
		],
	}
]);