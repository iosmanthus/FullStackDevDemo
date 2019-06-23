import React from 'react';
import {Form, Input, Icon} from "antd";
import MovieList from "@/components/MovieList";
import {connect} from "dva";

const namespace = 'rank';

class SimpleInput extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleInput(values);
      }
    })
  };

  render() {
    return (
      <Form layout={"horizontal"} onSubmit={this.handleSubmit}>
        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Rank'}>
          {
            this.props.form.getFieldDecorator('rank', {
              rules: [
                {
                  required: true,
                  message: 'Please input rank!'
                }],
            })(<Input prefix={<Icon type={'search'}/>} placeholder="Rank"/>)
          }
        </Form.Item>
      </Form>
    );
  }
}

const DataInput = Form.create()(SimpleInput);

const mapStateToProps = (state) => {
  const movieList = state[namespace].data;
  return {
    movieList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (query) => {
      const action = {
        type: `${namespace}/syncMovieList`,
        payload: query
      };
      dispatch(action);
    }
  }
};

@connect(mapStateToProps,mapDispatchToProps)
class Rank extends React.Component {
  render() {
    return (
      <div>
        <DataInput handleInput={this.props.handleInput}/>
        <MovieList movieList={this.props.movieList}/>
      </div>
    );
  }
}

export default Rank;

