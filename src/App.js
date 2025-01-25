import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';  // This is the file you generated earlier
import { withAuthenticator } from '@aws-amplify/ui-react';

// Configure Amplify
Amplify.configure(awsconfig);

function App() {
    return (
        <div className="App">
            <h1>Welcome to the Serverless Web App!</h1>
            {/* Your app content goes here */}
        </div>
    );
}

export default withAuthenticator(App);
