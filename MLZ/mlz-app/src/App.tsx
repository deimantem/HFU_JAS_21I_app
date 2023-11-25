import React, { useState, useEffect } from 'react';

interface Entity {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const [data, setData] = useState<Entity[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/entities');
            const jsonData: Entity[] = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Your App Header</h1>
                <ul>
                    {data.map(entity => (
                        <li key={entity.id}>{entity.name}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
};

export default App;