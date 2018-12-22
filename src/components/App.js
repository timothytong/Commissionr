import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavigationContainer from './NavigationContainer';
import React from 'react';

export default class App extends React.Component {

	render() {
		return (
            <BrowserRouter>
		    	<Switch>
		            <Route path='/' component={NavigationContainer} />
		        </Switch>
            </BrowserRouter>
		);
	}

}

