import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const supabaseUrl = 'https://gqbibxdsuweyegeujsor.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlieGRzdXdleWVnZXVqc29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTMzMDcsImV4cCI6MjAxNDA4OTMwN30.BsjMxf7CFUpgPtA3n9fljWvRH2XBb43o6XGuHpPSR2E';
const supabase = createClient(supabaseUrl, supabaseKey);
import "../index.css";
const Post = () => {
	const [userPosts, setUserPosts] = useState([]);
	useEffect(() => {
		async function getAll() {
			const { data, error } = await supabase.from('Posts').select();
			setUserPosts(data);
		}
		getAll();
	}, []);
	console.log(userPosts);
	userPosts.map((post, id) => {
		console.log(post.title, id, post.time);
	});

	const timeDiff = (date) => {
		const now = new Date();
		const postDate = new Date(date);
		let timeDiff;


		if (now < postDate) {
			timeDiff = postDate - now
		} else {
			timeDiff = now - postDate;
		}

		const hoursDifference = Math.floor(timeDiff / (1000 * 60 * 60));
		const daysDifference = Math.floor(hoursDifference / 24);
		const weeksDifference = Math.floor(daysDifference / 7);
		const monthsDifference = Math.floor(daysDifference / 30);
		const yearDifference = Math.floor(daysDifference / 365);

		if (daysDifference < 1) {
			let measure = ` hours`
			return hoursDifference + measure;
		}

		else if (daysDifference  >= 1) {
			let measure = ` days`
			return daysDifference + measure;
		}

		else if (daysDifference >= 7) {
			let measure = ` weeks`;
			return weeksDifference + measure;
		}

		else if (daysDifference >= 30) {
			let measure = ` months`;
			return monthsDifference + measure;		}

		else if (daysDifference >= 365) {
			let measure = ` years`;
			return yearDifference + measure;
		}
		
	}
	return (
		<div className="timeline">
			{userPosts.map((post, id) => {
				return (
					<div className="postCard" key={id}>
						<Link to={`/${post.id}`}>
							<h3>Posted {timeDiff(post.time)} ago</h3>
							<h1>{post.title}</h1>
							<p>{post.likes} upvotes</p>
							{/* <img src={post.url}></img> */}
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Post;
