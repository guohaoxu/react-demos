var React = require("react"),
    ReactDOM = require("react-dom"),
    CommentBox = require("./CommentBox");

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
