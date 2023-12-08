import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer({ theme }) {
	return (
		<Box
			component='footer'
			width='100%'
			display='flex'
			justifyContent='center'
			bgcolor={
				theme.palette.mode === 'dark'
					? 'rgba(0, 0, 0, 0.7)'
					: 'rgba(255, 255, 255, 0.7)'
			}
			sx={{
				py: 3,
				px: 2,
				mt: 'auto',
			}}
		>
			<Typography color='text.secondary' maxWidth='sm'>
				{'Copyright © '}
				<Link color='inherit' href='/'>
					Zeleze
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
}
