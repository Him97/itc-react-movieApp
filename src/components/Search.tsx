import * as React from 'react';
import axios from 'axios';
import { GET } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
	Backdrop,
	Box,
	Card,
	CardActions,
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	InputBase,
	Modal,
	NativeSelect,
	Stack,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import ExploreIcon from '@mui/icons-material/Explore';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import useSnackbar from '../utils/useSnackbar';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from '@react-spring/web';
import { debounce } from 'lodash';
import Categories from '../assets/Categories';
import {
	CountryObj,
	EntryObj,
	FadeProps,
	ModalProps,
	SubcategoryObj,
} from './types';

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

export default function Search({ open, handleClose }: ModalProps) {
	const { t } = useTranslation();
	const { SnackbarProps } = useSnackbar();
	const navigate = useNavigate();
	const theme = useTheme();
	const categories = Categories();
	const [countries, setCountries] = React.useState<CountryObj[]>([]);
	const [regions, setRegions] = React.useState<Array<string>>([]);
	const [searchResults, setSearchResults] = React.useState<EntryObj[]>([]);
	const [searchTerm, setSearchTerm] = React.useState<string>('');
	const [filters, setFilters] = React.useState<EntryObj>({
		category: '',
		subcategory: '',
		country: '',
		region: '',
		isurgent: false,
	});

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		minWidth: '50%',
		minHeight: '6.5rem',
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

	const subcategories: SubcategoryObj[] = React.useMemo(() => {
		const selectedCategoryObj = categories.find(
			(categoryObj) => categoryObj.category === filters.category
		);
		return selectedCategoryObj
			? selectedCategoryObj.subcategories.map((subcategory) => ({
					category: filters.category,
					subcategory,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }))
			: [];
	}, [filters.category, categories]);

	React.useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await axios.get(
					'https://countriesnow.space/api/v0.1/countries/positions'
				);
				const data = await response.data;
				if (data.error === false) {
					setCountries(data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getCountries();
	}, []);

	React.useEffect(() => {
		console.log(filters.country);
		const getRegions = async () => {
			if (filters.country !== '') {
				try {
					const response = await axios.post(
						`https://countriesnow.space/api/v0.1/countries/cities`,
						{ country: filters.country }
					);
					const data = await response.data;
					console.log(data);
					if (data.error === false) {
						setRegions(data.data);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		getRegions();
	}, [filters.country]);

	const debouncedSearch = debounce(async () => {
		try {
			const queryParameters = {
				q: searchTerm,
				...filters,
			};
			const queryParamsString = Object.entries(queryParameters)
				.filter(([, value]) => value !== '')
				.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
				.join('&');
			console.log(queryParamsString);
			const response: EntryObj[] = await GET(
				`/entries/search?${queryParamsString}`
			);
			console.log(response);
			setSearchResults(response);
		} catch (error) {
			SnackbarProps(error as string, false);
		}
	}, 1000);

	const handleFilterChange = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		setFilters({
			...filters,
			[event.target.name as string]: event.target.value as string,
		});
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchTerm(value);
		debouncedSearch();
	};

	return (
		<Modal
			keepMounted
			aria-labelledby='search'
			aria-describedby='search'
			open={open}
			onClose={() => {
				handleClose();
				setSearchTerm('');
				setSearchResults([]);
				setFilters({} as EntryObj);
			}}
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
					<Stack direction='row' component='form' justifyContent='center'>
						<FormControlLabel
							value='start'
							control={
								<Checkbox
									icon={<QuickreplyOutlinedIcon />}
									checkedIcon={<QuickreplyIcon />}
								/>
							}
							label={t('t-urgent')}
							labelPlacement='start'
							style={{
								minWidth: '20%',
								justifyContent: 'space-evenly',
							}}
						/>

						<NativeSelect
							id='category'
							name='category'
							title='category'
							aria-label='category'
							color='primary'
							onChange={handleFilterChange}
							defaultValue=''
							style={{ minWidth: '20%', maxWidth: '25%' }}
							IconComponent={CategoryIcon}
						>
							<option disabled value=''>
								{t('t-category')}
							</option>
							{categories.map((categoryObj) => (
								<option key={categoryObj.category} value={categoryObj.category}>
									{categoryObj.category}
								</option>
							))}
						</NativeSelect>
						{filters.category && (
							<NativeSelect
								id='subcategory'
								name='subcategory'
								title='subcategory'
								aria-label='subcategory'
								color='primary'
								onChange={handleFilterChange}
								defaultValue=''
								style={{
									minWidth: '20%',
									maxWidth: '25%',
								}}
								IconComponent={ClassIcon}
							>
								<option disabled value=''>
									{t('t-subcategory')}
								</option>
								{subcategories.map((subcategoryObj) => (
									<option
										key={subcategoryObj.subcategory}
										value={subcategoryObj.subcategory}
									>
										{subcategoryObj.subcategory}
									</option>
								))}
							</NativeSelect>
						)}
						<NativeSelect
							id='country'
							name='country'
							title='country'
							aria-label='country'
							color='primary'
							onChange={handleFilterChange}
							defaultValue=''
							style={{ minWidth: '20%', maxWidth: '25%' }}
							IconComponent={ExploreIcon}
						>
							<option disabled value=''>
								{t('t-country')}
							</option>
							{countries.map((item: CountryObj) => (
								<option key={item.iso2} value={item.name}>
									{item.name}
								</option>
							))}
						</NativeSelect>
						{filters.country && (
							<NativeSelect
								id='region'
								name='region'
								title='region'
								aria-label='region'
								color='primary'
								onChange={handleFilterChange}
								defaultValue=''
								style={{
									minWidth: '20%',
									maxWidth: '25%',
								}}
								IconComponent={LocationCityIcon}
							>
								<option disabled value=''>
									{t('t-region')}
								</option>
								{regions.map((item: string) => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</NativeSelect>
						)}
					</Stack>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
						justifyContent='space-evenly'
					>
						{searchResults.map((entry) => (
							<Grid item>
								<Card
									key={entry.id}
									style={{
										borderRadius: '5px',
										boxShadow:
											theme.palette.mode === 'dark'
												? '0 0 5px 0 rgba(255 ,255 ,255 ,0.5)'
												: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
										backgroundColor: 'transparent',
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
										<IconButton onClick={() => navigate(`/entry/${entry.id}`)}>
											<InfoIcon />
										</IconButton>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
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
	transitionDuration: '1s',
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
