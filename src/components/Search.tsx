import * as React from 'react';
import { GET } from '../utils/api';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
	Backdrop,
	Box,
	Card,
	CardActions,
	IconButton,
	InputBase,
	Modal,
	Stack,
	ToggleButton,
	Typography,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from '@react-spring/web';
import { debounce } from 'lodash';

interface FadeProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: unknown;
	onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
	onExited?: (node: HTMLElement, isAppearing: boolean) => void;
	ownerState?: unknown;
}

interface SearchProps {
	open: boolean;
	handleClose: () => void;
}

interface SearchResult {
	id: number;
	isGivingHelp: boolean;
	category: string;
	country: string;
	region: string;
	availability: string;
	title: string;
	description: string;
	isUrgent: boolean;
	image: string;
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

export default function Search({ open, handleClose }: SearchProps) {
	const { t } = useTranslation();
	const theme = useTheme();
	const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
	const [searchTerm, setSearchTerm] = React.useState<string>('');

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		minWidth: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor:
			theme.palette.mode === 'dark'
				? 'rgba(0, 0, 0, 0.5)'
				: 'rgba(255, 255, 255, 0.5)',
		boxShadow:
			theme.palette.mode === 'dark'
				? '0 0 5px 0 rgba(255 ,255 ,255 ,0.5)'
				: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
		borderRadius: 1,
		backdropfilter: 'blur(8px)',
	};

	const debouncedSearch = debounce(async (term: string) => {
		try {
			const response: SearchResult[] = await GET(`/entries/search?q=${term}`);
			setSearchResults(response);
		} catch (error) {
			console.error('Error searching:', error);
		}
	}, 1000);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchTerm(value);
		debouncedSearch(value);
	};

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
					<SearchBar>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder={t('t-search') + '...'}
							inputProps={{ 'aria-label': 'search' }}
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</SearchBar>
					<Stack>
						<ToggleButton value='check'>Urgent</ToggleButton>
					</Stack>
					<Masonry columns={3} spacing={2} sx={{ border: '1px solid black' }}>
						{searchResults.map((entry, index) => (
							<Card
								key={index}
								style={{
									borderRadius: '5px',
									boxShadow:
										theme.palette.mode === 'dark'
											? '0 0 5px 0 rgba(255 ,255 ,255 ,0.5)'
											: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
									backgroundColor: 'transparent',
									border: '1px solid black',
								}}
							>
								<img
									srcSet={`${entry.image}?w=162&auto=format&dpr=2 2x`}
									src={`${entry.image}?w=162&auto=format`}
									alt={entry.title}
									width='100%'
									style={{
										display: entry.image ? 'block' : 'none',
										borderRadius: '5px',
									}}
								/>
								<CardActions
									sx={{
										display: 'flex',
										flexDirection: 'column',
										p: 0,
										justifyContent: 'space-between',
										alignItems: 'center',
										position: 'relative',
									}}
								>
									<img
										src={entry.image}
										alt={entry.title}
										width='100%'
										height='100%'
										style={{
											visibility: entry.image ? 'visible' : 'hidden',
											position: 'absolute',
											filter: 'blur(25px)',
										}}
									/>
									<Stack zIndex={1} p={2} width='100%'>
										<Typography align='left' variant='h5'>
											{entry.title}
										</Typography>
										<Typography align='left'>{entry.category}</Typography>
										<Typography align='left'>
											{entry.country + ' ' + entry.region}
										</Typography>
									</Stack>
									<IconButton>
										<InfoIcon />
									</IconButton>
								</CardActions>
							</Card>
						))}
					</Masonry>
				</Box>
			</Fade>
		</Modal>
	);
}

const SearchBar = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	width: '100%',
	minHeight: '4rem',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));
