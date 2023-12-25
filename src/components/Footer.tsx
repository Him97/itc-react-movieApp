import { Box, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

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
				<ButtonBase
					color='inherit'
					style={{ fontFamily: 'Karla' }}
					onClick={() => navigate('/')}
				>
					{t('t-zelaze')}
				</ButtonBase>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
}
