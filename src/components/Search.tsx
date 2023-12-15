import * as React from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import { ThemeContext } from '@emotion/react';
import {
	Backdrop,
	Box,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Modal,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from '@react-spring/web';
import { debounce } from 'lodash';

interface FadeProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: (node: HTMLElement, isAppearing: boolean) => void;
	onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
	onExited?: (node: HTMLElement, isAppearing: boolean) => void;
	ownerState?: unknown;
}

interface SearchProps {
	open: boolean;
	handleClose: () => void;
}

interface SearchResult {
	isGivingHelp: boolean;
	category: string;
	country: string;
	availability: string;
	title: string;
	description: string;
	isUrgent: boolean;
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
	const theme = React.useContext(ThemeContext);
	const [searchResults, setSearchResults] = React.useState<object>([]);
	const [searchTerm, setSearchTerm] = React.useState<string>('');

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		minWidth: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor:
			theme.palette.mode === 'dark'
				? 'rgba(0, 0, 0, 0.8)'
				: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 1,
		boxShadow: 24,
		backdropfilter: 'blur(8px)',
	};

	const debouncedSearch = debounce(async (term: string) => {
		try {
			const response = await axios.get(`/entry?search=${term}`);
			setSearchResults(response.data);
		} catch (error) {
			console.error('Error searching:', error);
		}
	}, 2000);

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
					{searchResults &&
						searchResults.map((result: SearchResult) => (
							<List style={{ border: '1px solid black' }}>
								<ListItem>
									<ListItemIcon>
										<VolunteerActivismIcon />
									</ListItemIcon>
									<ListItemText
										primary={result.title}
										secondary={result.description}
									/>
								</ListItem>
							</List>
						))}
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
	marginRight: theme.spacing(2),
	marginLeft: 0,
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
