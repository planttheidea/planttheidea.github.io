// external dependencies
import React, {
  Component
} from 'react';

// external styles
import 'bulma/css/bulma.css';
import 'typopro-web/web/TypoPRO-Aleo/TypoPRO-Aleo-Bold.css';
import 'font-awesome/css/font-awesome.css';

// local styles
import './styles/global/bulma-overrides.scss';

// components
import Logo from './components/Logo';
import Menu from './components/Menu';

class App extends Component {
  render() {
    const {
      children
    } = this.props;

    return (
      <div>
        <Menu/>

        {children}

        <Logo/>
      </div>
    );
  }
}

export default App;
