import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
	const { t } = useTranslation();
	const theme = React.useContext<object>(ThemeContext);

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
			py={3}
			px={2}
			position='fixed'
			bottom='0'
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
