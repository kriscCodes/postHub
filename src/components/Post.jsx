import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Navigation from "./Navigation.jsx";
import "../index.css"
const supabaseUrl = 'https://gqbibxdsuweyegeujsor.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlieGRzdXdleWVnZXVqc29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTMzMDcsImV4cCI6MjAxNDA4OTMwN30.BsjMxf7CFUpgPtA3n9fljWvRH2XBb43o6XGuHpPSR2E';
const supabase = createClient(supabaseUrl, supabaseKey);
const Post = () => {
    const [likes, setLikes] = useState(0);
    const params = useParams();
    const userId = params.postId;
	// const [userPosts, setUserPosts] = useState([]);
    const [details, setDetails] = useState({
        title: "",
        content: "",
        imgUrl: "",
        likes: 0
    })
	useEffect(() => {
		async function getAll() {
			const { data, error } = await supabase.from('Posts').select().eq("id", userId);
			
            setDetails({
                title: data[0].title,
                content: data[0].content,
                imgUrl: data[0].url,
                likes: data[0].likes
            })
            console.log(details)
		}
		getAll();
	}, []);

    const handleUpvote = async (e) => {
        e.preventDefault()
        
        setDetails({...details, likes: details.likes + 1})
        
        console.log(details.likes)
        const {data, error} = await supabase.from("Posts").update({
            likes: likes
        }).eq("id", userId);
        
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.from("Posts").delete().eq("id", userId);
    }

   

    return (
			<>
				<Navigation />
				<div className="updateCard">
					<h1>{details.title}</h1>
					<p>{details.content}</p>
					<img id="updateImg" src={details.imgUrl}></img>
					<div id="buttons">
						<button onClick={handleUpvote} id="upvote">
							Upvote {details.likes}
						</button>
						<div className="right">
							<button className="elementsRight" onClick={handleDelete}>
								Delete
							</button>
							<Link className="elementsRight" to={`/${userId}/update`}>
								<button>Update</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
}

export default Post