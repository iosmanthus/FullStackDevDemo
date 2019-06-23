import React from "react";
import {Form, Input, Button} from 'antd';
import MovieList from '../components/MovieList';

import {connect} from "dva";


const namespace = 'edit';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class SimpleInput extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['rate'] = Number(values['rate']);
        this.props.handleInput(values)
      }
    });
    this.props.form.resetFields();
  };

  render() {
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Movie name'}>
          {
            this.props.form.getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input movie name!'
                }],
            })(<Input placeholder="Movie name"/>)
          }
        </Form.Item>

        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Release time'}>
          {
            this.props.form.getFieldDecorator('release_time', {
              rules: [
                {
                  required: true,
                  message: 'Please input release time!'
                }
              ],
            })(<Input placeholder="Release time"/>)
          }
        </Form.Item>

        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Director'}>
          {
            this.props.form.getFieldDecorator('director', {
              rules: [
                {
                  required: true,
                  message: 'Please input director!'
                }
              ],
            })(<Input placeholder="Director"/>)
          }
        </Form.Item>

        <Form.Item wrapperCol={{span: 5}} labelCol={{span: 3}} label={'Rate'}>
          {
            this.props.form.getFieldDecorator('rate', {
              rules: [
                {
                  required: true,
                  message: 'Please input rate!'
                }
              ],
            })(<Input placeholder="Rate"/>)
          }
        </Form.Item>

        <Form.Item wrapperCol={{offset: 2}}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(this.props.form.getFieldsError())}
          >
            Submit
          </Button>
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
    handleInput: (newMovie) => {
      const action = {
        type: `${namespace}/syncMovieList`,
        payload: newMovie
      };
      dispatch(action);
    }
  }
};


@connect(mapStateToProps, mapDispatchToProps)
class Edit extends React.Component {
  render() {
    return (
      <div>
        <DataInput handleInput={this.props.handleInput}/>
        <MovieList movieList={this.props.movieList}/>
      </div>
    );
  }
}

export default Edit;
