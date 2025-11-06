import {Box, Button, Paper, Typography} from "@mui/material";
import {useEffect} from "react";
import {useActivities} from "../../../lib/hooks/useActivities";
import {useNavigate, useParams} from "react-router";
import {Resolver, useForm} from "react-hook-form";
import {activitySchema, ActivitySchema} from "../../../lib/Schemas/ActivitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import SelectInput from "../../../app/shared/components/SelectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/components/DateTimeInput.tsx";
import LocationInput from "../../../app/shared/components/LocationInput.tsx";

export default function ActivityForm() {
	const navigate = useNavigate();
	const {control, reset, handleSubmit} = useForm<ActivitySchema>({
		resolver: zodResolver(activitySchema) as Resolver<ActivitySchema>
	});
	const {id} = useParams();
	const {activity, isLoadingActivity, createActivity, updateActivity} = useActivities(id);

	useEffect(() => {
		if (activity) reset({
			...activity,
			location: {
				city: activity.city,
				venue: activity.venue,
				latitude: activity.latitude,
				longitude: activity.longitude
			}
		});
	}, [activity, reset]);

	const onSubmit = (data: ActivitySchema) => {
		const {location, ...rest} = data;
		const flattenedData = {...rest, ...location};
		try {
			if (activity) {
				updateActivity.mutate({...activity, ...flattenedData}, {
					onSuccess: () => navigate(`/activities/${activity.id}`),
				});
			} else {
				createActivity.mutate(flattenedData, {
					onSuccess: (id) => navigate(`/activities/${id}`),
				})
			}
		} catch (error) {
			console.error(error);
		}
	}
	
	if (isLoadingActivity) return <Typography>Loading activity...</Typography>

	return (
		<Paper sx={{borderRadius: 3, padding: 3}}>
			<Typography variant="h5" gutterBottom color="primary">
				Create activity
			</Typography>
			<Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
				<TextInput label='Title' control={control} name='title'/>
				<TextInput label='Description' control={control} name='description' multiline rows={3}/>
				<Box display='flex' gap={3}>
					<SelectInput items={categoryOptions} label='Category' control={control} name='category'/>
					<DateTimeInput label='Date' control={control} name='date'/>
				</Box>
				<LocationInput label='Enter the location' control={control} name='location'/>

				<Box display='flex' justifyContent='end' gap={3}>
					<Button color='inherit'>Cancel</Button>
					<Button
						type="submit"
						color="success"
						variant="contained"
						disabled={updateActivity.isPending || createActivity.isPending}>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
