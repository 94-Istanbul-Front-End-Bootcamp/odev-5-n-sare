import React, { Component } from "react";
import { Header } from '../container';
import { TweetForm } from '../component/tweetForm';
import { TweetList } from '../component/tweetList';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            tweetText: "",
            tweets: [],
            currentUser: [],
        }
        this.onChangeTweetForm = this.onChangeTweetForm.bind(this);
        this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
        
    }
    
    handleTweetSubmit(){
        let userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData)
        let tweet;
      
              tweet={
                
                "name": userData.name,
                "username": userData.username,
                "tweetContent": this.state.tweetText,
                "likeCount": 0,
                "retweetCount": 0,
                "replyCount": 0,
                "dateTime": "2021-07-01 09:17:20"
            };
            this.setState(prevState => ({
                tweets: [tweet , ...prevState.tweets]
              }))
        
            
         
    }

    componentWillMount() {
        
        fetch('tweetData.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ tweets: data });
            })
            .catch(err => console.log(err));
    }

    onChangeTweetForm(event) {
        this.setState({ tweetText: event.target.value });
    }


    render() {
        const { tweetText, tweets, currentUser } = this.state;

        return (
            <div className="latestTweets">
                <Header title="Home" />
                
                <TweetForm
                    tweetText={tweetText}
                    onChangeTweetForm={this.onChangeTweetForm}
                    handleTweetSubmit={this.handleTweetSubmit} />
                <div className="latestTweets__divisor" />
                {
                    tweets.length > 0 ? (
                        <TweetList tweets={tweets} />
                    ) : (
                        <span>Loading...</span>
                    )
                }
            </div>
        );
    }
}

export default Home;