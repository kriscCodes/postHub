import {createClient} from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import "../index.css"
import "../App.css"
const supabaseUrl = "https://gqbibxdsuweyegeujsor.supabase.co";
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlieGRzdXdleWVnZXVqc29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTMzMDcsImV4cCI6MjAxNDA4OTMwN30.BsjMxf7CFUpgPtA3n9fljWvRH2XBb43o6XGuHpPSR2E';
const supabase = createClient(supabaseUrl, supabaseKey);

const CreatePost = () => {

    useEffect(() => {
        async function getPosts() {
            const { data, error } = await supabase.from('Posts').select();
            console.log(data);
        }
        getPosts();
    }, []);

    const [formData, setFormData] = useState({
        title: " ",
        content: " ", 
        url: " "
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const { error } = await supabase
        .from('Posts')
        .insert(formData)
        setFormData({...formData, title: "", content: "", url: ""})
        
    }
    const titleChange = (e) => {
        formData.title = e.target.value;
        setFormData({...formData, title: e.target.value})
    }
    const contentChange = (e) => {
        formData.content = e.target.value;
		setFormData({ ...formData, content: e.target.value });       
    }
    const urlChange = (e) => {
        formData.url = e.target.value;
		setFormData({ ...formData, url: e.target.value });
    }

    return (
			<div className="form">
				<form id="postForm" onSubmit={handleSubmit}>
					<div className="inputContainer" id="title">
						<input
							type="text"
                            id="inputTitle"
							value={formData.title}
							onChange={titleChange}
							placeholder="Title"
							required
						></input>
					</div>
					<div className="inputContainer" id="content">
						<input
							type="text"
                            id="inputContent"
							value={formData.content}
							onChange={contentChange}
							placeholder="Content (Optional)"
							required
						></input>
					</div>
					<div className="inputContainer" id="img">
						<input
							type="text"
                            id="inputImg"
							value={formData.url}
							onChange={urlChange}
							placeholder="Image URL (Optional)"
							required
						></input>
					</div>

					<button type="submit">Create</button>
				</form>
			</div>
		);
}

export default CreatePost