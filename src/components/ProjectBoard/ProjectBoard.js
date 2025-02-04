import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getBacklog } from '../../actions/backlogActions';

class ProjectBoard extends Component {

    //constructor to handle errors
    constructor(){
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount(){
        const {id} = this.props;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {id} = this.props;
        const {project_tasks} = this.props.backlog;
        const {errors} = this.state;

        const boardAlgorithm = (errors, project_tasks) => {
            if(project_tasks.length < 1){
                if(errors.projectNotFound){
                    return(
                        <div className='alert alert-danger text-center' role='alert'>
                            {errors.projectNotFound}
                        </div>
                    );
                } else{
                    return(
                        <div className='alert alert-info text-center' role='alert'>
                            No Project Tasks on this board
                        </div>
                    );
                }
            } else{
                return <Backlog project_tasks = {project_tasks}/>
            }
        }

        const BoardContent = boardAlgorithm(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        )
    }
}

const ProjectBoardWrapper = (props) => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // return <ProjectBoard {...props} id={id} navigate={ navigate } />;
    return <ProjectBoard {...props} id={id} />;
};

ProjectBoardWrapper.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors,
})

export default connect(
    mapStateToProps,
    {getBacklog}
)(ProjectBoardWrapper);


