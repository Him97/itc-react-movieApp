import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';
import NotFound from '../components/NotFound';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/home' element={<Home />}></Route>
				<Route path='/signup' element={<Auth />}></Route>
				<Route path='/login' element={<Auth />}></Route>
				<Route path='/profile' element={<Auth />}></Route>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
