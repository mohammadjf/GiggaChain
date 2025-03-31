import {createBrowserRouter} from "react-router";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/Form/ActivityForm.tsx";
import ActivityDetail from "../../features/activities/details/ActivityDetail.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: '', element: <HomePage />},
			{ path: '/activities', element: <ActivityDashboard />},
			{ path: '/createActivity', element: <ActivityForm key='create' />},
			{ path: '/manage/:id', element: <ActivityForm />},
			{ path: '/activities/:id', element: <ActivityDetail />}
		],
	}
]);