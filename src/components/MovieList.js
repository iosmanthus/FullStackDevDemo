import React from 'react';
import {Card} from "antd";

class MovieList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.movieList.map(movie => {
            return (
              <Card>
                <div>
                  <strong>
                    {'Movie name: ' + movie.name}
                    <br/>
                    {'Release time: ' + movie.release_time}
                    <br/>
                    {'Director: ' + movie.director}
                    <br/>
                    {'Rate: ' + movie.rate}
                  </strong>
                </div>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default MovieList;
