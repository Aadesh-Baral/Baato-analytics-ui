import {BaseURL, userInfo} from '../constants';

export const authHeader = () => {
    const url = BaseURL + "account/login";

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
                    // console.log(json['data']['jwt']);
                    return {Authorization: 'Bearer '+ json['data']['jwt']}
                    } catch (error) {
                    console.log("error", error);
                    }
            };
            return fetchData();
}

// Fetch top district data
export const analyticsDistrict = ()=> {
    const url = BaseURL + "admin/analytics/district?userId=11&limit=5"
    const fetchData = async () => {
        try {
            const token = await authHeader();
            const response = await fetch(url, {
                headers: token
            });
            const json = await response.json();
            return json['data']['content']
        } catch (error) {
            console.log("error", error);
            }
    };
    return fetchData();
}


// Fetch top municipality data
export const analyticsMunicipality = ()=> {
    const url = BaseURL + "admin/analytics/municpality?userId=11&limit=5"
    const fetchData = async () => {
        try {
            const token = await authHeader();
            const response = await fetch(url, {
                headers: token
            });
            const json = await response.json();
            return json['data']['content']
        } catch (error) {
            console.log("error", error);
            }
    };
    return fetchData();
}


// Fetch data for Heatmap
export const analyticsHeatmap = ()=> {
    const url = BaseURL + "admin/analytics/heatmap?userId=11"
    const fetchData = async () => {
        try {
            const token = await authHeader();
            const response = await fetch(url, {
                headers: token
            });
            const json = await response.json();
            return json['data']['content']
        } catch (error) {
            console.log("error", error);
            }
    };
    return fetchData();
}



