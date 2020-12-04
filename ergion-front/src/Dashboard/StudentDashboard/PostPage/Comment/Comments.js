import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Comment from './Comment';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import './Comments.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import axios from 'axios';

class Comments extends Component {
	state = {
		comments: [],
		replies: {},
		isFetching: true,
		nCommentString: '',
		newComment: {}
	};

	async fetchData(url) {
		const response = await fetch(url);
		let data = await response.json();
		return data;
	}

	componentDidMount() {
		const config = {
			headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
		};
		const update_id = window.location.href.split('/')[5];
		axios.get(`http://127.0.0.1:8000/api/update-comments/?update_id=${update_id}`, config).then((res) => {
			res.data.map((comment) => {
				const newComment = {
					postId: update_id,
					id: comment.id,
					name: `${comment.user_firstname} ${comment.user_lastname}`,
					picture: comment.profile_picture,
					body: comment.comment_text,
					liked: comment.liked,
					replies: comment.replies
				};
				this.setState({
					comments: [ ...this.state.comments, newComment ],
					isFetching: false,
					replies: {
						...this.state.replies,
						[comment.id]: comment.replies
					}
				});
				this.props.onAddComment(newComment);
				this.props.onLikeComment(comment.id, comment.liked);
				this.props.onReply(comment.id, comment.replies);
				this.props.onOpenReply(comment.id, false);
			});
		});
	}

	onChangeHandler = (event) => {
		this.setState({
			nCommentString: event.target.value
		});
	};

	onSubmit = () => {
		const update_id = window.location.href.split('/')[5];
		const config = {
			headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
		};
		if (this.state.nCommentString.length !== 0) {
			axios
				.post(
					'http://127.0.0.1:8000/api/update-comments/',
					{
						update_id: update_id,
						comment_text: this.state.nCommentString
					},
					config
				)
				.then((res) => {
					const newComment = {
						postId: update_id,
						id: res.data.id,
						name: `${res.data.user_firstname} ${res.data.user_lastname}`,
						picture: res.data.profile_picture,
						body: res.data.comment_text,
						liked: false,
						replies: []
					};
					this.props.onLikeComment(res.data.id, false);
					this.props.onOpenReply(res.data.id, false);
					this.setState({
						comments: [ ...this.state.comments, newComment ],
						isFetching: false,
						nCommentString: ''
					});
				});
		}
	};

	render() {
		const classes = this.props;
		const formData = this.state;
		const { comments, isFetching } = this.state;
		return isFetching ? (
			<Grid container direction="row" spacing={2} dir="rtl">
				<Grid container wrap="nowrap" alignItems="center" style={{ minHeight: '5rem' }}>
					<Grid item xs zeroMinWidth>
						<InputBase
							style={{ padding: '8px' , backgroundColor: "gainsboro" , marginRight: "7px"}}
							value={formData.nCommentString}
							onChange={this.onChangeHandler}
							rowsMax={2}
							multiline
							fullWidth
							className="input"
							placeholder="متن پیام"
						/>
					</Grid>
					<Grid item>
						<IconButton color="primary" onClick={this.onSubmit}>
							<SendIcon className="icon" />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		) : (
			<Grid container direction="row" spacing={2} dir="rtl">
				<Grid container wrap="nowrap" alignItems="center" style={{ minHeight: '5rem' }}>
					<Grid item xs zeroMinWidth>
						<InputBase
							style={{ padding: '8px', backgroundColor: "gainsboro" , marginRight: "7px"}}
							value={formData.nCommentString}
							onChange={this.onChangeHandler}
							rowsMax={2}
							multiline
							fullWidth
							className="input"
							placeholder="متن پیام"
						/>
					</Grid>
					<Grid item>
						<IconButton color="primary" onClick={this.onSubmit}>
							<SendIcon className="icon" />
						</IconButton>
					</Grid>
				</Grid>
				<Grid item style={{ padding: '0px' }} dir="rtl" xs={12}>
					<Comment comments={comments} replies={this.state.replies} />
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reduxReply: state.replies,
		reduxComments: state.comments
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onReply: (id, reply) => dispatch({ type: actionTypes.REPLY, payload: reply, id: id }),
		onAddComment: (comment) => dispatch({ type: actionTypes.ADD_COMMENT, payload: comment }),
		onLikeComment: (id, like) => dispatch({ type: actionTypes.LIKE_COMMENT, id: id, like: like }),
		onOpenReply: (id, open) => dispatch({ type: actionTypes.OPEN_REPLAY, id: id, open: open })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
