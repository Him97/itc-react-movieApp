import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
	const { t } = useTranslation();
	const theme = useTheme();

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
			mt='auto'
			p={3}
		>
			<Typography color='text.secondary' maxWidth='sm'>
				{t('t-copyright')}
				{' © '}
				<Link color='inherit' href='/'>
					{t('t-zelaze')}
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
}
