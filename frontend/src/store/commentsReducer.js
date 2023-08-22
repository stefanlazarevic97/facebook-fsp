import csrfFetch from "./csrf";
import { RECEIVE_POST } from "./postsReducer";

// CONSTANTS

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'comments/RECEIVE_COMMENT_ERRORS';
// export const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS';

// ACTION CREATORS

export const receiveComments = (comments) => ({ type: RECEIVE_COMMENTS, comments });
export const receiveComment = (comment) => ({ type: RECEIVE_COMMENT, comment });
export const removeComment = (commentId) => ({ type: REMOVE_COMMENT, commentId });
export const receiveCommentErrors = (errors) => ({ type: RECEIVE_COMMENT_ERRORS, errors });

// THUNK ACTION CREATORS

export const fetchCommentsByPostId = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } else {
        const errors = await res.json();
        dispatch(receiveCommentErrors(errors));
    }
}

export const createComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(receiveComment(newComment));
        return newComment;
    } else {
        const errors = await res.json();
        dispatch(receiveCommentErrors(errors));
    }
}

export const updateComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
    });

    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(receiveComment(updatedComment));
        return updatedComment;
    } else {
        const errors = await res.json();
        dispatch(receiveCommentErrors(errors));
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeComment(commentId));
    } else {
        const errors = await res.json();
        dispatch(receiveCommentErrors(errors));
    }
}

const commentsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...state, ...action.comments };
        case RECEIVE_COMMENT:
            nextState[action.comment.id] = action.comment;
            return nextState;
        case REMOVE_COMMENT:
            delete nextState[action.commentId];
            return nextState;
        case RECEIVE_POST:
            return { ...state, ...action.post.comments };
        default:
            return state;
    }
}

export default commentsReducer;