import React, { useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import {
  Done,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
} from "@material-ui/icons";
import Redirect from "react-router-dom/es/Redirect";
import { useHistory } from "react-router-dom";
import axios from "axios";
import translate from "../../translate";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const useStyles = makeStyles((theme) => ({
  textField: { minWidth: 240, width: "80%" },
  top: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  containter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
  },
}));
const NewPost = ({ isAuthenticated, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [requestSent, setRequestSent] = useState(false);
  const [checkJob, setCheckJob] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onSubmit = () => {
    checkJob ? new_job() : new_post();
    setRequestSent(true);
  };
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };
  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  if (isAuthenticated === false) return <Redirect to="/login" />;

  return (
    <div className={classes.containter}>
      <div className={classes.top}>
        <div>
          {user && user.is_entity && (
            <FormControlLabel
              label={translate("job")}
              control={
                <Checkbox
                  checked={checkJob}
                  onChange={() => setCheckJob(!checkJob)}
                />
              }
            />
          )}
        </div>
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onSubmit}
          startIcon={
            requestSent ? (
              <CircularProgress
                size={20}
                style={{ marginLeft: "10px" }}
                color="inherit"
              />
            ) : (
              <Done style={{ marginLeft: "10px" }} />
            )
          }
        >
          {translate("send")}
        </Button>
      </div>
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className="RichEditor-editor">
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            spellCheck={true}
          />
        </div>
      </div>
    </div>
  );

  async function new_job() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({
        user,
        content: stateToHTML(editorState.getCurrentContent()),
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/jobs/job-create/`,
          body,
          config
        );
        setRequestSent(false);
        history.push("/jobs");
      } catch (err) {
        setRequestSent(false);
      }
    }
  }
  async function new_post() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({
        user,
        content: stateToHTML(editorState.getCurrentContent()),
      });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/post-create/`,
          body,
          config
        );
        setRequestSent(false);
        history.push("/");
      } catch (err) {
        setRequestSent(false);
      }
    }
  }
};
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    switch (this.props.label) {
      case "Bold":
        return <FormatBold className={className} onMouseDown={this.onToggle} />;
      case "Italic":
        return (
          <FormatItalic className={className} onMouseDown={this.onToggle} />
        );
      case "Underline":
        return (
          <FormatUnderlined className={className} onMouseDown={this.onToggle} />
        );
      case "Monospace":
        return <Code className={className} onMouseDown={this.onToggle} />;
      case "Blockquote":
        return (
          <FormatQuote className={className} onMouseDown={this.onToggle} />
        );
      case "UL":
        return (
          <FormatListBulleted
            className={className}
            onMouseDown={this.onToggle}
          />
        );
      case "OL":
        return (
          <FormatListNumbered
            className={className}
            onMouseDown={this.onToggle}
          />
        );

      default:
        return (
          <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
          </span>
        );
    }
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(NewPost);
