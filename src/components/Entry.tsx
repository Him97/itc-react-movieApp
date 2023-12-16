import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Backdrop, Box, ButtonBase, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from '@react-spring/web';
import pic1 from '../assets/images/needhelp.jpg';
import pic2 from '../assets/images/givehelp.jpg';

interface FadeProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: unknown;
	onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
	onExited?: (node: HTMLElement, isAppearing: boolean) => void;
	ownerState?: unknown;
}

interface EntryProps {
	open: boolean;
	handleClose: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
	function Fade(props, ref) {
		const {
			children,
			in: open,
			onClick,
			onEnter,
			onExited,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			ownerState,
			...other
		} = props;
		const style = useSpring({
			from: { opacity: 0 },
			to: { opacity: open ? 1 : 0 },
			onStart: () => {
				if (open && onEnter) {
					onEnter(null as never, true);
				}
			},
			onRest: () => {
				if (!open && onExited) {
					onExited(null as never, true);
				}
			},
		});

		return (
			<animated.div ref={ref} style={style} {...other}>
				{React.cloneElement(children, { onClick })}
			</animated.div>
		);
	}
);

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: 'relative',
	minHeight: '50vh',
	borderRadius: 10, //to delete?
	boxShadow: '24px black', //to delete?
	[theme.breakpoints.down('sm')]: {
		width: '100% !important',
		height: 100,
	},
	'&:hover, &.Mui-focusVisible': {
		zIndex: 1,
		'& .MuiImageBackdrop-root': {
			opacity: 0,
		},
		'& .MuiImageMarked-root': {
			opacity: 0,
		},
		'& .MuiTypo-root': {
			border: '4px solid currentColor',
			borderRadius: 5,
			transitionDuration: '0.5s',
		},
	},
}));

const ImageSrc = styled('span')({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: 'cover',
	backgroundPosition: 'center 40%',
	borderRadius: 1,
});

const Image = styled('div')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 1,
	color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.4,
	borderRadius: 1,
	transition: theme.transitions.create('opacity'),
	transitionDuration: '1s',
}));

const ImageMarked = styled('span')(({ theme }) => ({
	height: 3,
	width: 18,
	backgroundColor: theme.palette.common.white,
	position: 'absolute',
	bottom: -2,
	left: 'calc(50% - 9px)',
	borderRadius: 1,
	transition: theme.transitions.create('opacity'),
	transitionDuration: '1s',
}));

export default function Entry({ open, handleClose }: EntryProps) {
	const { t } = useTranslation();

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		minWidth: '50%',
		minHeight: '50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: 1,
		boxShadow: 24,
		backdropfilter: 'blur(8px)',
	};

	const images = [
		{
			url: pic1,
			title: t('t-need-help'),
			subtitle: t('t-need-help-desc'),
			width: '50%',
			type: false,
		},
		{
			url: pic2,
			title: t('t-give-help'),
			subtitle: t('t-give-help-desc'),
			width: '50%',
			type: true,
		},
	];

	return (
		<Modal
			keepMounted
			aria-labelledby='search'
			aria-describedby='search'
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					TransitionComponent: Fade,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					{images.map((image) => (
						<ImageButton
							focusRipple
							key={image.title}
							style={{
								width: image.width,
								borderRadius: 1,
							}}
						>
							<ImageSrc
								style={{
									backgroundImage: `url(${image.url})`,
								}}
							/>
							<ImageBackdrop className='MuiImageBackdrop-root' />
							<Image className='MuiTypo-root'>
								<Typography
									variant='h5'
									color='inherit'
									sx={{
										position: 'relative',
										p: 4,
										pt: 2,
										pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
									}}
								>
									{image.title}
								</Typography>
								<Typography
									variant='subtitle1'
									color='inherit'
									sx={{
										position: 'relative',
										p: 4,
										pt: 2,
										pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
									}}
								>
									{image.subtitle}
									<ImageMarked className='MuiImageMarked-root' />
								</Typography>
							</Image>
						</ImageButton>
					))}
				</Box>
			</Fade>
		</Modal>
	);
}
