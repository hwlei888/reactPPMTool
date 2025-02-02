import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getBacklog } from '../../actions/backlogActions';

class ProjectBoard extends Component {

    //constructor to handle errors

    componentDidMount(){
        const {id} = this.props;
        this.props.getBacklog(id);
    }

    render() {
        const {id} = this.props;
        const {project_tasks} = this.props.backlog;

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                <Backlog project_tasks = {project_tasks}/>
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
};

const mapStateToProps = state => ({
    backlog: state.backlog,
})

export default connect(
    mapStateToProps,
    {getBacklog}
)(ProjectBoardWrapper);


