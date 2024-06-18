import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Spinner from './Spinner';

function TopStories(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [section, setSection] = useState("Home");
    const articlesPerPage = 6;

    useEffect(() => {
        document.title = `${props.section === "home" ? '' : section} Headlines - sk-news-app`;

        async function fetchData() {
            try {
                let url = `https://api.nytimes.com/svc/topstories/v2/${props.section}.json?api-key=${props.apiKey}`;
                let data = await fetch(url);
                let parsedData = await data.json();
                setArticles(parsedData.results);
                setSection(parsedData.section);
                document.title = `sk-news-app - ${props.section === "home" ? '' : section} Headlines`;
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchData();
    }, [props.apiKey, props.section, section]);

    const renderNews = () => {
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        return articles.slice(startIndex, endIndex).map((e) => {
            if (e.title === "" || e.abstract === "" || e.section === "admin") {
                return null;
            } else {
                let imgUrl = e.multimedia?.[1]?.url;
                let formattedDate = new Date(e.published_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/New_York'
                });
                return (
                    <div className='col-md-4' style={{ padding: '10px' }} key={e.uri}>
                        <NewsCard title={e.title} abstract={e.abstract} newsUrl={e.url} imgUrl={imgUrl} author={e.byline} date={formattedDate} />
                    </div>
                );
            }
        });
    };

    const handleNextClick = () => {
        if (page < Math.ceil(articles.length / articlesPerPage)) {
            setPage(page + 1);
        }
    };

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <>
            {articles.length === 0 ? <Spinner /> :
                <div className="container my-3" style={{ padding: "4rem" }}>
                    <h2 id="heading" className="text-center">sk-news-app - {props.section === "home" ? '' : section} Headlines</h2>
                    <div className="row my-3">
                        {renderNews()}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button disabled={page <= 1} onClick={handlePrevClick} className="btn btn-primary">Previous</button>
                        <button disabled={page >= Math.ceil(articles.length / articlesPerPage)} onClick={handleNextClick} className="btn btn-primary">Next</button>
                    </div>
                </div>
            }
        </>
    );
}

export default TopStories;
