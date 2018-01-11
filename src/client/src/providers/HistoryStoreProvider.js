import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('uiStore')
@observer
class HistoryStoreProvider extends Component {
    componentWillMount() {
        this.props.uiStore.appHistory = this.props.history;
    }

    render() {
        return this.props.children;
    }
}

HistoryStoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
    uiStore: PropTypes.shape({
        appHistory: PropTypes.object
    })
};

export const HistoryStoreProviderWithRouter = withRouter(HistoryStoreProvider);
