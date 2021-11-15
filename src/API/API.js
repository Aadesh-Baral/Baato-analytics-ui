

const authHeader = () => {
    const url = "https://api-staging.baato.io/api/v1/account/login";
    const userInfo = {
        "emailAddress": "arogyakoirala+test@gmail.com",
        "password": "123456"
    }
            const fetchData = async () => {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(userInfo),
                    });
                    const json = await response.json();
                    console.log(json['data']['jwt']);
                    return {Authorization: 'Bearer '+ json['data']['jwt']}
                    } catch (error) {
                    console.log("error", error);
                    }
            };
            return fetchData();
}


export default authHeader;