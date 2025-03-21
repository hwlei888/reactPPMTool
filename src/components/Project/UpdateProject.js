import React, { Component } from 'react'
import { getProject, createProject } from '../../actions/projectActions';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { useParams, useNavigate } from 'react-router-dom';

class UpdateProject extends Component {

    constructor(){
        super(); //use super here because extending from Component

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }

        const {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        } = nextProps.project;

        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        })
    }

    componentDidMount(){
        const { id } = this.props;
        this.props.getProject(id, this.props.navigate);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault(); //it will not refresh the page

        const updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
        };

        this.props.createProject(updateProject, this.props.navigate);
    }

    render(){
        const {errors} = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectName
                                        })} 
                                        placeholder="Project Name"
                                        name='projectName'
                                        value={this.state.projectName}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.projectName && (
                                            <div className="invalid-feedback">{errors.projectName}</div>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Unique Project ID"
                                        name='projectIdentifier'
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChange}
                                        disabled 
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })} 
                                        placeholder="Project Description" 
                                        name='description'
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )
                                    }
                                </div>

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="start_date"
                                        value={this.state.start_date}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="end_date" 
                                        value={this.state.end_date}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UpdateProjectWrapper = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <UpdateProject {...props} id={id} navigate={ navigate } />;
};

// using PropTypes for type-checking props
UpdateProjectWrapper.propTypes = {
    getProject: PropTypes.func.isRequired, // Must be a function and is required
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {getProject, createProject}
)(UpdateProjectWrapper);

