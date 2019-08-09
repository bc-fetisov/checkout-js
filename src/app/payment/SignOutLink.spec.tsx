import { mount } from 'enzyme';
import { noop } from 'lodash';
import React from 'react';

import { getStoreConfig } from '../config/config.mock';
import { createLocaleContext, LocaleContext, LocaleContextType } from '../locale';

import { getPaymentMethod } from './payment-methods.mock';
import SignOutLink from './SignOutLink';

describe('SignOutLink', () => {
    let localeContext: LocaleContextType;

    beforeEach(() => {
        localeContext = createLocaleContext(getStoreConfig());
    });

    it('renders output that matches snapshot', () => {
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <SignOutLink
                    onSignOut={ noop }
                    method={ getPaymentMethod() }
                />
            </LocaleContext.Provider>
        );

        expect(component.find(SignOutLink).getDOMNode())
            .toMatchSnapshot();
    });

    it('triggers callback when it is clicked', () => {
        const handleSignOut = jest.fn();
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <SignOutLink
                    onSignOut={ handleSignOut }
                    method={ getPaymentMethod() }
                />
            </LocaleContext.Provider>
        );

        component.find('a')
            .simulate('click');

        expect(handleSignOut)
            .toHaveBeenCalled();
    });
});