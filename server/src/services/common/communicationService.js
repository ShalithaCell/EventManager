const axios = require('axios');
const qs = require('querystring');
const _ = require('lodash');
const linkedInSecret = require('../../../credentials.linkedin');
const InMemoryDb = require('../database/inMemoryDb');

const CommunicationService = {
    GetLinkedInAccessToken : async (code, state) =>
    {
        const requestBody = {
            grant_type    : 'authorization_code',
            code,
            redirect_uri  : linkedInSecret.redirect_url,
            client_id     : linkedInSecret.client_id,
            client_secret : linkedInSecret.client_secret,
        };

        const config = {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
        };

        axios.post('https://www.linkedin.com/oauth/v2/accessToken', qs.stringify(requestBody), config)
            .then(async (result) =>
            {
                // Do somthing
                // eslint-disable-next-line camelcase
                const { access_token, expires_in } = result.data;

                let accessTokens;

                try
                {
                    accessTokens = await InMemoryDb.get('accessTokens');
                }
                catch (e)
                {
                    console.error(e);
                }

                let newAuthDict;

                if (accessTokens)
                {
                    newAuthDict = [
                        ...accessTokens,
                        {
                            access_token,
                            expires_in,
                            state,
                        },
                    ];
                }
                else
                {
                    newAuthDict = [
                        {
                            access_token,
                            expires_in,
                            state,
                        },
                    ];
                }

                await InMemoryDb.save('accessTokens', newAuthDict);

                await CommunicationService.GetLinkedInProfileID(state);
                await CommunicationService.GetLinkedInProfileURN(state);
            })
            .catch((err) =>
            {
                // Do somthing
            });
    },
    GetLinkedInProfileID : async (state) =>
    {
        const accessTokens = await InMemoryDb.get('accessTokens');
        const fetchedObj = _.find(accessTokens, { state });

        const config = {
            headers : {
                Authorization : `Bearer ${fetchedObj.access_token}`,
            },
        };

        axios.get('https://api.linkedin.com/v2/me', config)
            .then(async (result) =>
            {
                // eslint-disable-next-line camelcase
                const { id } = result.data;

                const profileIds = await InMemoryDb.get('profileIds');

                let newAuthDict;

                if (profileIds)
                {
                    newAuthDict = [
                        ...profileIds,
                        {
                            id,
                            state,
                        },
                    ];
                }
                else
                {
                    newAuthDict = [
                        {
                            id,
                            state,
                        },
                    ];
                }

                await InMemoryDb.save('profileIds', newAuthDict);
            })
            .catch((err) =>
            {
                // Do somthing
            });
    },
    GetLinkedInProfileURN : async (state) =>
    {
        const accessTokens = await InMemoryDb.get('accessTokens');
        const fetchedObj = _.find(accessTokens, { state });

        const config = {
            headers : {
                Authorization : `Bearer ${fetchedObj.access_token}`,
            },
        };

        axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', config)
            .then(async (result) =>
            {
                // eslint-disable-next-line camelcase
                const { handle } = result.data.elements[0];

                const URNS = await InMemoryDb.get('URN');

                let newAuthDict;

                if (URNS)
                {
                    newAuthDict = [
                        ...URNS,
                        {
                            handle,
                            state,
                        },
                    ];
                }
                else
                {
                    newAuthDict = [
                        {
                            handle,
                            state,
                        },
                    ];
                }

                await InMemoryDb.save('URN', newAuthDict);
            })
            .catch((err) =>
            {
                // Do somthing
            });
    },
    PostLinkedInPost : async (state, post) =>
    {
        const URNList = await InMemoryDb.get('profileIds');
        const URN = _.find(URNList, { state });

        const accessTokens = await InMemoryDb.get('accessTokens');
        const fetchedObj = _.find(accessTokens, { state });

        const text = `Another great event with #event_manager \n ${post.Summary} \n\n  
                        ${post.Description} \n\n Location : ${post.Location} \n
                        Start : ${post.Start} \n \n\n Category : ${post.Category}`;

        const requestBody = {
            author          : `urn:li:person:${URN.id}`,
            lifecycleState  : "PUBLISHED",
            specificContent : {
                "com.linkedin.ugc.ShareContent" : {
                    shareCommentary : {
                        text,
                    },
                    shareMediaCategory : "NONE",
                },
            },
            visibility : {
                "com.linkedin.ugc.MemberNetworkVisibility" : "PUBLIC",
            },
        };

        const config = {
            headers : {
                Authorization               : `Bearer ${fetchedObj.access_token}`,
                'Content-Type'              : 'application/json',
                'X-Restli-Protocol-Version' : '2.0.0',
                'x-li-format'               : 'json',
            },
        };

        axios.post('https://api.linkedin.com/v2/ugcPosts', requestBody, config)
            .then(async (result) =>
            {
                const { status } = result.status;
            })
            .catch((err) =>
            {
                // Do somthing
                console.log(err);
            });
    },
};

module.exports = CommunicationService;
