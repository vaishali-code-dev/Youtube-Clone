const GOOGLE_API_KEY = "AIzaSyDIT1MokolxCcpjjSFOKBTeUHrOzIADpjM"

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=US&key=" +
    GOOGLE_API_KEY;


export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_FILTER_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=" +
    GOOGLE_API_KEY + "&q="


export const comments = [
    {
        title: "comment",
        owner: "Vaishali",
        comments: [
            {
                title: "comment",
                owner: "Vaishali",
                comments: [
                    {
                        title: "comment",
                        owner: "Vaishali",
                        comments: [{
                            title: "comment",
                            owner: "Vaishali",
                        },
                        {
                            title: "comment",
                            owner: "Vaishali",
                        }
                        ]
                    },
                    {
                        title: "comment",
                        owner: "Vaishali",
                    }
                ]
            },
            {
                title: "comment",
                owner: "Vaishali",
            }
        ]
    },
    {
        title: "comment",
        owner: "Vaishali",
    },
    {
        title: "comment",
        owner: "Vaishali",
    },
    {
        title: "comment",
        owner: "Vaishali",
    }
]
