const axios = require("axios");

const configFrance = {
    method: "get",
    url: "https://v1.basketball.api-sports.io/leagues?country=France",
    headers: {
        "x-rapidapi-key": "d22ef0645cbfd825854110faddc2a669",
        "x-rapidapi-host": "v1.basketball.api-sports.io",
    },
};

const configUSA = {
    method: "get",
    url: "https://v1.basketball.api-sports.io/leagues?country=USA",
    headers: {
        "x-rapidapi-key": "d22ef0645cbfd825854110faddc2a669",
        "x-rapidapi-host": "v1.basketball.api-sports.io",
    },
};

async function getMatches() {
    const leagues = [];
    try {
        const responseFR = await axios(configFrance);
        const leaguesFR = responseFR.data.response;
        leagues.push(...leaguesFR);

        const responseUSA = await axios(configUSA);
        const leaguesUSA = responseUSA.data.response;
        leagues.push(...leaguesUSA);

        const transformedData = leagues.map((league) => {
            return {
                name: league.name,
                logo: league.logo,
                type: league.type,
                seasons: league.seasons
            };
        });

        return transformedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { getMatches };
