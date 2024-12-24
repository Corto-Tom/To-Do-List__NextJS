import { useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');  //State used mainly for reseting input fields

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3008/api/routes', { // API call for the wanted route function
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }), // Body of the request, data to push in the database
            });

            if (response.ok) {
                setMessage('Task added successfully!');
                setTitle('');
                setDescription(''); // reseting input fields 
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error(error);
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
            </div>
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
            {message && <p>{message}</p>}
            <Link href="/">
                <button>Home</button>
            </Link>
        </div>
    );  
}
