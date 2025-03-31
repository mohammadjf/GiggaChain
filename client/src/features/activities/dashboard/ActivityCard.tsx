import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {Link} from "react-router";

type Props = {
	activity: Activity
}
export default function ActivityFile({activity}: Props) {
	const {deleteActivity} = useActivities();
	
	return (
		<Card sx={{borderRadius: 3}}>
			<CardContent>
				<Typography variant="h5">{activity.title}</Typography>
				<Typography sx={{color: 'text.secondary', mb: 1}}>{activity.date}</Typography>
				<Typography variant="body2">{activity.description}</Typography>
				<Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
			</CardContent>
			<CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
				<Chip label={activity.category} variant="outlined"/>
				<Box display="flex" gap={1}>
					<Button
						size="medium"
						variant="contained"
						component={Link}
						to={`/activities/${activity.id}`}
					>
						View
					</Button>
					<Button
						size="medium"
						variant="contained"
						color="error"
						onClick={() => deleteActivity.mutate(activity.id)}
						disabled={deleteActivity.isPending}
					>
						Delete
					</Button>
				</Box>
			</CardActions>
		</Card>
	)
}