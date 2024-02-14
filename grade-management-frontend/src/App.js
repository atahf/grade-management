import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Create from './routes/Create';
import NotFound from './routes/NotFound';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="content">
					<Routes>
						<Route 
							exact path="/" 
							element={<Home />}
						/>
						<Route 
							exact path="/new-record" 
							element={<Create />}
						/>
						<Route 
							path="*" 
							element={<NotFound />} 
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
