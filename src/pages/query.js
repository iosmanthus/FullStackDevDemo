import React from 'react';
import {Form, Input, Icon} from "antd";
import MovieList from "@/components/MovieList";
import {connect} from "dva";

const namespace = 'query';

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
        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Movie name'}>
          {
            this.props.form.getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input movie name!'
                }],
            })(<Input prefix={<Icon type={'search'}/>} placeholder="Movie name"/>)
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
class Query extends React.Component {
  render() {
    return (
      <div>
        <DataInput handleInput={this.props.handleInput}/>
        <MovieList movieList={this.props.movieList}/>
      </div>
    );
  }
}

export default Query;
