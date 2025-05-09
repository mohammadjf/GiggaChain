import {useRouteError, isRouteErrorResponse} from 'react-router-dom';
import {Container, Typography, Box, Paper, Button} from '@mui/material';

export default function ClientErrorPage() {
	const error = useRouteError();

	let title = 'Something went wrong';
	let description = 'An unexpected error occurred.';
	let stack: string | undefined = undefined;

	if (isRouteErrorResponse(error)) {
		title = `${error.status} ${error.statusText}`;
		description = typeof error.data === 'string' ? error.data : description;
	} else if (error instanceof Error) {
		description = error.message;
		stack = error.stack;
	}

	const isDev = process.env.NODE_ENV === 'development';

	return (
		<Container maxWidth="sm" sx={{mt: 10}}>
			<Paper elevation={3} sx={{p: 4}}>
				<Box textAlign="center">
					<Typography variant="h4" color="error" gutterBottom>
						{title}
					</Typography>
					<Typography variant="body1" color="textSecondary" sx={{mb: 2}}>
						{description}
					</Typography>
					{isDev && stack && (
						<Box sx={{
							textAlign: 'left',
							mt: 2,
							bgcolor: '#f5f5f5',
							p: 2,
							borderRadius: 1,
							fontFamily: 'monospace',
							overflowX: 'auto'
						}}>
							<Typography variant="subtitle2" color="textSecondary">
								Stack Trace:
							</Typography>
							<pre>{stack}</pre>
						</Box>
					)}
					<Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{mt: 3}}>
						Go Back
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
