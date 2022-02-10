import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
export default class News extends Component {

  
  constructor(props) {
    super(props)
  
    this.state = {
       articles:[],
       page:1,
       loading:true,
       totalResults:0
    }
  }
  async updateNews(){
    let data= await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    let parseData= await data.json();
    this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false})

  }
  async componentDidMount(){
    this.updateNews();
  }
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    let data= await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    let parseData= await data.json();
    this.setState({articles:this.state.articles.concat(parseData.articles),totalResults:parseData.totalResults})
  };

  render() {
                
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "75px 0px"}}> Top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headings</h1>
       {this.state.loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}>
            <div className='container'>
              <div className='row'>
                {this.state.articles.map((element)=>{
                    return <div className='col md-4' key={element.url}>
                              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2022/02/09/1600x900/gavaskar-rohit-india_1644421814546_1644421819878.jpg"} url={element.url?element.url:""}/>
                            </div>
                })}
              </div>
           </div>
          </InfiniteScroll>
                
     </div>

    
    )
  }
}
