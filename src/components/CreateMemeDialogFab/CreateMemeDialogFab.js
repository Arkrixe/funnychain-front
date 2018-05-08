import React, {Component} from 'react'
import {Dialog, FlatButton, FloatingActionButton, TextField} from "material-ui";
import ImageUploaderDropZone from "../ImageUploaderDropZone/ImageUploaderDropZone";
import ContentAdd from 'material-ui/svg-icons/content/add';
import {memeService} from "../../service/MemeService";
import {userNotificationService} from "../../service/UserNotificationService";
import {authService} from "../../service/AuthService";


export class CreateMemeDialog extends Component {

    state = {
        title: "",
        iid: null
    };

    titleValid = false;
    imageValid = false;

    componentDidMount() {
        console.log("create meme did mount");
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    post = () => { //use this form to have acces to this
        if (this.state.imageURL === null || this.state.imageURL === "") {
            userNotificationService.notifyUser("A image is required");
        }
        if (this.state.title === null || this.state.title.replace(" ", "") === "") {
            userNotificationService.notifyUser("A title is required");
        }
        var memeToCreate = {
            iid: this.state.iid,
            uid: null,//will be filled later
            title: this.state.title,
            created: null //will be filled later
        };
        memeService.createMeme(memeToCreate);
        this.props.handleClose();
    }

    handleChange = (event) => {
        var newTitle = event.target.value;
        this.setState({
            title: newTitle,
        });
        if (newTitle === null || newTitle.replace(" ", "") === "") {
            this.titleValid = false;
        } else {
            this.titleValid = true;
        }
        this.props.onChange(this);
    };

    onImageLoaded = (image) => {
        this.setState({iid: image.iid});
        if (this.state.imageURL === null || this.state.imageURL === "") {
            this.imageValid = false;
        } else {
            this.imageValid = true;
        }
        this.props.onChange(this);
    };

    render() {
        return (
            <div>
                <TextField
                    id="text-field-controlled"
                    value={this.state.title}
                    hintText="Title"
                    onChange={this.handleChange}
                    fullWidth={true}
                />
                <ImageUploaderDropZone onImageLoaded={this.onImageLoaded}/>
            </div>
        )
    }
}

export default class CreateMemeDialogFab extends Component {
    state = {
        open: false,
        logged: false,
        valid: false
    }

    memeCreateRer = null;

    componentDidMount() {
        this.removeListener = authService.onAuthStateChanged((user) => {
            this.setState({
                logged: user ? true : false
            });
        })
    }

    componentWillUnmount() {
        this.removeListener();
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = (ref) => {
        this.setState({valid: ref.imageValid && ref.titleValid});
    };

    popupCreateMeme = () => {
        this.setState({open: true});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={() => {
                    this.memeCreateRer.post();
                }}
                disabled={!this.state.valid}
            />,
        ];
        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };
        return (
            <div>
                <Dialog
                    title="Post"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <CreateMemeDialog onRef={(ref) => this.memeCreateRer = ref} handleClose={this.handleClose}
                                      onChange={this.handleChange}/>
                </Dialog>

                {this.state.logged &&
                <FloatingActionButton
                    onClick={this.popupCreateMeme}
                    style={style}>
                    <ContentAdd/>
                </FloatingActionButton>
                }
            </div>
        )
    }
}