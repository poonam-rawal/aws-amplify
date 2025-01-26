import React, { useState, useEffect } from 'react';
// import * as Amplify from  'aws-amplify';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; 

import { withAuthenticator } from '@aws-amplify/ui-react';

const {Auth} = Amplify;
const {API} = Amplify;

Amplify.configure(awsconfig);
// Configure Amplify
// Amplify.configure({
//     ...awsconfig,
//     Auth: {
//         ...awsconfig.Auth,
//         oauth: {
//             domain: 'https://63owxhpddl.execute-api.us-east-1.amazonaws.com/production',  // Replace with your actual Cognito domain
//             scope: ['email', 'openid', 'profile'],
//             redirectSignIn: 'http://localhost:3000',  // Your redirect URL
//             redirectSignOut: 'http://localhost:3000',
//             responseType: 'code',  // 'code' for authorization code flow, 'token' for implicit flow
//         },
//     },
// });

// Federated SignIn logic
const federatedSignIn = async () => {
    try {
        const user = await Auth.federatedSignIn();
        console.log('Signed in user:', user);
    } catch (error) {
        console.error('Error signing in:', error);
    }
};

// Auth.federatedSignIn({ provider: 'Google' }) // or other provider
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

function App() {
    // State to hold the data and loading status
    const [itemData, setItemData] = useState(null);
    const [newItem, setNewItem] = useState({ id: '123', name: 'New Item' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to create an item (POST request)
    const createItem = async () => {
        try {
            setLoading(true);
            setError(null);  // Clear any previous errors
            const response = await API.post('ItemsAPI', '/items', {
                body: newItem  // Sending the item as the body
            });
            console.log('Item created:', response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Error creating item: ' + err.message);
        }
    };

    // Function to get an item (GET request)
    const getItem = async (id) => {
        try {
            setLoading(true);
            setError(null);  // Clear any previous errors
            const response = await API.get('ItemsAPI', `/items/${id}`);
            console.log('Item fetched:', response);
            setItemData(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Error fetching item: ' + err.message);
        }
    };

    // Fetch item when the component mounts
    useEffect(() => {
        getItem('123');  // Use the item id you want to fetch
    }, []);

    return (
        <div className="App">
            <h1>Serverless App with AWS Amplify</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Create Item</h2>
                <button onClick={createItem}>Create Item</button>
            </div>

            <div>
                <h2>Item Data</h2>
                {itemData ? (
                    <div>
                        <p>ID: {itemData.id}</p>
                        <p>Name: {itemData.name}</p>
                    </div>
                ) : (
                    <p>No item found.</p>
                )}
            </div>
        </div>
    );
}

export default withAuthenticator(App);