import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
  UPDATE_LIKES,
  CREATE_COMMENT,
  COMMENT_FAIL,
  GET_POST_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../actions/types';

const initialState = [
  {
    text: null,
    user: {},
    comments: [],
    likes: {
      users: [],
      count: 0,
    },
  },
];

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return payload;
    case GET_POST:
      return [payload];
    case CREATE_POST:
      return [payload, ...state];
    case DELETE_POST:
      return state.filter(post => post._id !== payload);
    case UPDATE_LIKES:
      const { postId, userId, isLikedByUser } = payload;

      const posts = state.map(post => {
        if (post._id !== postId) return post;

        const count = post.likes.count;
        const users = [...post.likes.users];
        let likes = { count, users };

        if (isLikedByUser === -1) {
          likes.count++;
          likes.users.push(userId);
        } else {
          likes.count--;
          likes.users = likes.users.filter(like => userId !== like.user);
        }
        return { ...post, likes };
      });
      return posts;
    case CREATE_COMMENT:
      return [
        {
          ...state[0],
          comments: [payload, ...state[0].comments],
        },
      ];
    case COMMENT_FAIL:
      return state;
    case GET_POST_COMMENTS:
      return [
        {
          ...state[0],
          comments: payload,
        },
      ];
    case EDIT_COMMENT:
      return [
        {
          ...state[0],
          comments: state[0].comments.map(comment => {
            if (comment._id === payload._id) {
              return { ...comment, text: payload.text };
            } else {
              return comment;
            }
          }),
        },
      ];
    case DELETE_COMMENT:
      return [
        {
          ...state[0],
          comments: state[0].comments.filter(comment => comment._id !== payload),
        },
      ];
    case POST_ERROR:
    default:
      return state;
  }
}
