import Create from './components/Create';
import Home from './components/Home.jsx';
import Post from './components/Post.jsx';
import Update from './components/Update.jsx';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {

  return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/create" element={<Create />} />
					<Route path="/" element={<Home />} />
					<Route path="/:postId" element={<Post />}></Route>
					<Route path="/:postId/update" element={<Update />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App
