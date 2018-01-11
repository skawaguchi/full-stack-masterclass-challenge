import {
    action,
    observable
} from 'mobx';

class UIStore {
    @observable appHistory = null;

    @action
    pushLocation(location) {
        this.appHistory.push(location);
    }
}

export default UIStore;
