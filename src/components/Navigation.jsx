import {Link} from "react-router-dom"

const Navigation = () => {
    return (
			<div className="nav">
				<h1>PostHub</h1>
				<input type="text" id="searchInput" placeholder="Search"></input>
				<div className="links">
					<Link className="links" to="/">Home</Link>
					<Link className="links" to="/create">Create New Post</Link>
				</div>
			</div>
		);
}

export default Navigation