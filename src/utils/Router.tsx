import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';

export default function Router({ theme }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home theme={theme} />}></Route>
				<Route path='/home' element={<Home theme={theme} />}></Route>
				<Route path='/signup' element={<Auth theme={theme} />}></Route>
				<Route path='/login' element={<Auth theme={theme} />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
