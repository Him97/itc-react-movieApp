import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';
import EntryCard from '../components/EntryCard';
import NotFound from '../components/NotFound';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/home' element={<Home />}></Route>
			<Route path='/signup' element={<Auth />}></Route>
			<Route path='/login' element={<Auth />}></Route>
			<Route path='/profile' element={<Auth />}></Route>
			<Route path='/entry/:id' element={<EntryCard />}></Route>
			<Route path='*' element={<NotFound />}></Route>
		</Routes>
	);
}
