const awsconfig = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_o9QTdJGpm',
        userPoolWebClientId: 'cga7pglb3p5v06p5u8ndvugoo',
    },
    API: {
        endpoints: [
            {
                name: 'ItemsAPI',
                endpoint: 'https://63owxhpddl.execute-api.us-east-1.amazonaws.com/production',
            },
        ],
    },
};

export default awsconfig;