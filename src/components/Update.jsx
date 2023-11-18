import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import '../index.css'
const supabaseUrl = 'https://gqbibxdsuweyegeujsor.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlieGRzdXdleWVnZXVqc29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTMzMDcsImV4cCI6MjAxNDA4OTMwN30.BsjMxf7CFUpgPtA3n9fljWvRH2XBb43o6XGuHpPSR2E';
const supabase = createClient(supabaseUrl, supabaseKey);
const Update = () => {
	const params = useParams();
	const userId = params.postId;
    const [details, setDetails] = useState({
        title: "",  
        content:"", 
        url:"",})
	useEffect(() => {
		async function getAll() {
			const { data, error } = await supabase
				.from('Posts')
				.select()
				.eq('id', userId);
            setDetails(data[0])
            console.log(details);
		}
		getAll();
	}, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const {error} = await supabase.from("Posts").update({
            title: details.title,
            content: details.content,
            url: details.url
        }).eq("id", userId);
        if (error) {
            console.log(error)
        } else {
            console.log("hi")
        }
    }

    const changeTitle = (e) => {
        setDetails({...details, title: e.target.value});
        console.log(details)
    }
    const changeContent = (e) => {
        setDetails({ ...details, content: e.target.value });
		console.log(details);
    }
    const changeImg = (e) => {
        setDetails({ ...details, url: e.target.value });
		console.log(details);
    }
    return (
			<>
				<Navigation />
				<div className="form">
					<form id="postForm" onSubmit={handleUpdate}>
						<div className="inputContainer" id="title">
							<input
								type="text"
								id="inputTitle"
								value={details.title}
								onChange={changeTitle}
								placeholder="Title"
								required
							></input>
						</div>
						<div className="inputContainer" id="content">
							<input
								type="text"
								id="inputContent"
								value={details.content}
								onChange={changeContent}
								placeholder="Content (Optional)"
								required
							></input>
						</div>
						<div className="inputContainer" id="img">
							<input
								type="text"
								id="inputImg"
								value={details.url}
								onChange={changeImg}
								placeholder="Image URL (Optional)"
								required
							></input>
						</div>

						<button type="submit">Create</button>
					</form>
				</div>
			</>
		);
};

export default Update;
