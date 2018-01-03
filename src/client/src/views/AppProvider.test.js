import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './AppProvider';

import App from './App';

describe('<AppProvider/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<AppProvider {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a browser router', () => {
        expect(component.type()).toEqual(BrowserRouter);
    });

    it('should have the application as its children', () => {
        expect(component.childAt(0).type()).toEqual(App);
    });
});

