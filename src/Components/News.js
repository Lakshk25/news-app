import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      props.setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json()
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles)
      settotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100);
    }
    catch (e) {
      console.log("error occured" + e);
    }
  }

  useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews()
    // esling-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    totalResults(parsedData.totalResults)
  }

  return (
    <>
      <h1 className='text-center'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={!articles ? "" : articles.length}
        next={fetchMoreData}
        hasMore={!articles ? "" : articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">

          <div className="row">
            {!articles ? <h1 className='text-center'> api limit reached  <Spinner /></h1>
              : articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "unknown" : element.author} date={element.publishedAt} />
                </div>
              })
            }
          </div>
        </div>
      </InfiniteScroll>

    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general'
}
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
}

export default News