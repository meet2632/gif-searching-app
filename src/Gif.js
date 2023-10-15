import React from 'react'
import axios from 'axios'
import Right from './arrowRight.svg'
import Left from './arrowLeft.svg'
import Home from './Home.svg'
import { Search } from './Search'
import { fetchTrending } from './Giftrending'


export default function Gif() {

    // STATES
    const [data, setData] = React.useState([]);
    const [title, setTitle] = React.useState('Gif');
    const [loader, setLoader] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(8)
    const [totalCount, setTotalCount] = React.useState(0)
    const [search, setSearch] = React.useState('');
    const [trending, setTrending] = React.useState(false)
    const [trendSearch, setTrendSearch] = React.useState(false)
    const [tSearch] = React.useState([])

    // FETCHING FROM GIPHY API
    const fetchData = async (title) => {
        let URL = `https://api.giphy.com/v1/gifs/search?q=${title}&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${offset}`;
        // ERROR HANDLING TRY - CATCH 
        try {
            let fetchGif = await axios(URL);
            let fetchRes = await fetchGif;
            if (fetchRes.status === 200) {
                setData(fetchRes.data.data)
                setTotalCount(fetchRes.data.pagination.total_count)
                setLoader(false)
                // Call new content
                content()
                if (trending) {
                    setTrending(false)
                    setOffset(0)
                }
                // Set trend searching
                setTrendSearch(false)
            }
        }
        catch (error) {
            if (error) throw error
        }
    }


    React.useEffect(() => {
        if (trending) {
            fetchTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)
        }
        if (!trending) {
            fetchData(title)
        }
    }, [offset])


    // Scroll on top function
    const onTop = () => {
        let options = { top: 0, left: 0, behavior: 'smooth' };
        window.scrollTo(options);
    }

    // Handle Next Pagination
    const handleNext = () => {
        setLoader(true);
        setOffset(offset + limit)
        onTop()
    }

    // Handle prev Pagination
    const handlePrev = () => {
        // Loader true
        setLoader(true);
        setOffset(offset - limit)
        onTop()
    }


    // ─── RENDER CONTENT 
    const content = () => {
        switch (true) {
            // If loader is true show loader spinner
            case loader:
                return <div>Loading...</div>
            // If data array more than zero loop through
            case data.length > 0:
                return data.map(g => {
                    return (
                        <div className='gif-card' key={g.id}>
                            <details>
                                <summary>Show Info</summary>
                                <h4>{g.title !== undefined ? (g.title.charAt(0).toUpperCase() + g.title.slice(1)) : ''}</h4>
                            </details>
                            <img className='image' src={g.images.fixed_width.url} alt="gif" />
                        </div>
                    )
                })
            // Otherwise return default
            default:
                return data
        }
    }


    // ─── RETURN ALL
    return (
        <div>
            <header>
                <a href="/catalog">
                    <img className='svg' src={Home} alt="home" />
                </a>
                <div className='gif-title'>
                    <h1 className='gif-title-h1'>GIF SEARCH</h1>
                </div>
                <Search search={search} setSearch={setSearch} fetchData={fetchData} setTitle={setTitle} />
            </header>
            <button className='gif-btn-trending' onClick={() => fetchTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)}>Trending</button>
            <div className='gif-wrap'>
                {trendSearch ?
                    (
                        <div className='gif-trend-search'>
                            <ul>
                                {tSearch.map((t, i) => <li key={i}><strong>{i + 1}</strong> {t.toUpperCase()}</li>)}
                            </ul>
                        </div>
                    )
                    :
                    ''
                }
                {content()}
            </div>

            {/*Image button Pagination*/}
            <div className="pagination">
                {
                    totalCount === 0 ?
                        ''
                        :
                        offset < limit ?
                            <img onClick={handleNext} className='svg' src={Right} alt="right" />
                            :
                            offset >= totalCount ?
                                <img onClick={handlePrev} className='svg' src={Left} alt="left" />
                                :
                                <>
                                    <img onClick={handlePrev} className='svg' src={Left} alt="left" />
                                    <img onClick={handleNext} className='svg' src={Right} alt="right" />
                                </>
                }
            </div>
        </div>
    )
}